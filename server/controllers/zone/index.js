var Zone = require('../../models/zone')
var Super_admin = require('../../models/super_admin')
var config = require('../../../config')

function convertZoneIN(zone) {
    zone.location = {coordinates: []}
    zone._id = undefined
    var temp = []
    for (var e in zone.coords) {
        temp[e] = [zone.coords[e].lat, zone.coords[e].lng]
    }
    zone.location.coordinates = [temp]
    return new Zone(zone)
}

function convertZoneOUT(zone) {
    var zones = []
    if (zone) {
        for (var z in zone) {
            var newZone = {
                name: zone[z].name,
                _id: zone[z]._id,
                parent_zone_id: zone[z].parent_zone_id,
                master_zone_id: zone[z].master_zone_id,
                date_created: zone[z].date_created,
                public: zone[z].public,
                color: zone[z].color,
                coords: [],
                childern: []
            }
            for (var e in zone[z].location.coordinates[0]) {
                newZone.coords[e] = {lat: zone[z].location.coordinates[0][e][0], lng: zone[z].location.coordinates[0][e][1]  }
            }
            zones[z] = newZone   
        }
        return zones
    }
}

exports.test = (req,res) => {
    convertZoneIN(req.body[0])
    console.log(convertZoneIN(req.body[0]))
    return res.status(200).json({ message: 'Success!' })
}

exports.getAll = (req, res) => {
    if (process.env.NODE_ENV === config.dev) {
      Zone.find({}, (err, zone) => {
        if (err) {
          res.send(err)
        } else {
          res.json(convertZoneOUT(zone))
        }
      })
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' })
    }
  }

/**
 * get zone from req.body
 * check if parent_zone_id is null (is master zone)
 * if null, create zone and add user to super_admin
 * if not null, look for parent_zone_id
 *              if parent is null, parent zone does not exist
 *              if parent.master_zone_id is null, set newZone.master_zone_id to newZone.parent_zone_id (parent is master)
 *                  else set newZone.master_zone_id to parent.master_zone_id
 *              look for user_id and master_zone_id in superAdmins
 *                  if superAdmin is, null user does not own parent
 *                      else create zone
 */
exports.createZone = (req, res) => {
    newZone = convertZoneIN(req.body)
    if (newZone.parent_zone_id == null) {
        newZone.save((err, resZone) => {
            if (err) {
                return res.status(400).json({ message: 'Zone could not be created' })
              } else {
                  newSuper = new Super_admin({user_id: req.user._id, zone_id: resZone._id})
                  newSuper.save((err, resSuper) => {
                      if (err) {
                        return res.status(400).json({ message: 'Super_admin could not be created' })
                      }
                  })
                return res.status(200).json({ message: 'Zone succesfully created', _id: resZone._id })
              } 
        }) 
    } else  {
        Zone.findOne({_id: newZone.parent_zone_id},'master_zone_id', (err, parentZone) => {
            if (err || parentZone == null) {
                return res.status(400).json({ message: 'Parent zone does not exist' })
            } else if (parentZone.master_zone_id == null) {
                newZone.master_zone_id = newZone.parent_zone_id
            } else {
                newZone.master_zone_id = parentZone.master_zone_id
            }
            Super_admin.findOne({user_id: req.user._id, zone_id: newZone.master_zone_id}, (err, success) => {
                if (err || success == null) {
                    return res.status(400).json({ message: 'User does not own the parent zone!' })
                } else {
                    newZone.save((err, resZone) => {
                        if (err) {
                            return res.status(400).json({ message: 'Zone could not be created' })
                        } else {
                            return res.status(200).json({ message: 'Zone succesfully created', _id: resZone._id })
                        }
                    })
                }
            })
        })
    }
}

/**
 * get _id from req.body
 * deleate zone
 */
exports.deleateZone = (req, res) => {
    Zone.findById(req.body.zone_id, (err, zone) => {
        if (err || zone == null) {
            return res.status(400).json({ message: 'zone does not exist' })
        } else if (zone.master_zone_id == null) {
            req.body.master_zone_id = req.body.zone_id
        } else {
            req.body.master_zone_id = zone.master_zone_id
        }
        Super_admin.findOne({user_id: req.user._id, zone_id: req.body.master_zone_id}, (err, success) => {
            if (err || success == null) {
                return res.status(400).json({ message: 'User does not own the zone!' })
            } else {
                Zone.exists({parent_zone_id: req.body.zone_id}, (err, exists) => {
                    if (err) return res.send(err)
                    if (exists) return res.send({message: 'zone has children, please delete children first'})
                    Zone.deleteOne({_id: req.body.zone_id}, (err,   success) => {
                        if (err) {
                            return res.status(400).json({ message: 'could not delete zone' })
                        } else {
                            return res.send(success)  
                        }
                    })
                })
                
            }   
        })
    })
}

/**
 * get zone_id from req.body
 * get child zones
 */
exports.getChildren = (req, res) => {
    Zone.find({parent_zone_id: req.body.zone_id}, (err, childern) => {
        if (err) return res.send(err)
        return res.send(convertZoneOUT(childern))
    })
}

const isOwner = async (user_id, zone_id, master_id = null) => {
    var Res = {}
    var done = false
    if (master_id == null ) {
        await Zone.findById(zone_id, async(err,zone) => {
            if (err || zone == null) return Res = {Error: err}
            if (zone.master_zone_id == null){
                var m_id = zone._id
            } else {
                var m_id = zone.master_zone_id
            }
            await Super_admin.findOne({user_id: user_id, zone_id: m_id}, (err, success) => {
                if (err || success == null) {
                    Res = { isOwner: false }
                    done = true
                    return Res
                } else {
                    Res = { isOwner: true }
                    done = true
                    return Res
                }
            })
        })
    } else {
        await Super_admin.findOne({user_id: user_id, zone_id: master_id}, (err, success) => {
            if (err || success == null) {
                Res = { isOwner: false }
                done = true
                return Res
            } else {
                Res = { isOwner: true }
                done = true
                return Res
            }
        }).then((res) => {Res = res}).catch()

    }
    while(true) {
        if (done) return Res
    }  
}


exports.updateById = (req, res) => { // :)
    isOwner(req.user._id, req.body.zone_id).then((owner) => {
        if (owner.isOwner){
            Zone.findById(req.body._id, (err, zone) => {
                if (err || zone == null) return res.status(400).json({ message: 'Could not get zone!' })
                // change all that are needed
                if (req.body.name && req.body.name != zone.name) {
                    zone.name = req.body.name
                }
                if (req.body.color && req.body.color != zone.color) {
                    zone.color = req.body.color
                }
                // if parent is changing
                if (req.body.parent_zone_id && req.body.parent_zone_id != zone.parent_zone_id) {
                    
                }
                console.log(zone)
                return res.send(zone)
            })
        }else {
            return res.status(400).json({ message: 'User does not own the zone!' })
        }
    }).catch()
    // Zone.findById(req.body._id, (err, zone) => {
    //     if (err || zone == null) {
    //         return res.status(400).json({ message: 'zone does not exist' })
    //     } else if (zone.master_zone_id == null) {
    //         var master_id = req.body._id
    //     } else {
    //         var master_id = zone.master_zone_id
    //     }
    //     Super_admin.findOne({user_id: req.user._id, zone_id: master_id}, (err, success) => {
    //         if (err || success == null) {
    //             return res.status(400).json({ message: 'User does not own the zone!' })
    //         } else {
    //             // change all that are needed
    //             if (req.body.name && req.body.name != zone.name) {
    //                 zone.name = req.body.name
    //             }
    //             if (req.body.color && req.body.color != zone.color) {
    //                 zone.color = req.body.color
    //             }
    //             // if parent is changing
    //             if (req.body.parent_zone_id && req.body.parent_zone_id != zone.parent_zone_id) {
    //                 Zone.findOne({_id: req.body.parent_zone_id}, (err, success) => {
    //                     if (err || success == null) {
    //                         return res.status(400).json({ message: 'User does not own the zone!' })
    //                     }
    //                 // has children?
    //                 Zone.exists({parent_zone_id: req.body.zone_id}, (err, exists) => {
    //                     if (err) return res.send(err)
    //                     if (!exists) {
    //                         zone.save((err, success) => {
    //                             console.log(success)
    //                             return res.send(success)
    //                         })
    //                     }

    //                 }) 
    //             })
    //             } else {
    //                 zone.save((err, success) => {
    //                     console.log(success)
    //                     return res.send(success)
    //                 })
    //             }
    //             if (req.body.parent_zone_id && !zone.master_zone_id && req.body.parent_zone_id != zone.parent_zone_id) {
    //             }
    //         }
    //     })
    // })
}
        

exports.isWithin = (req, res) => {
    
}