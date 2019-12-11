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
                owner_id: zone[z].owner_id,
                date_created: zone[z].date_created,
                public: zone[z].public,
                color: zone[z].color,
                coords: [],
                children: []
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
    console.log(req)
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
        console.log("here")
      return res.status(401).json({ message: 'Unauthorized user!' })
    }
  }

exports.getAllOwned = (req, res) => {
    Super_admin.find({user_id: req.user._id}, (err, master) => {
        if (err) return res.send(err)
        if (master == null || master.length == 0) return res.send(master)
        var tmp = master.map((item => {return {_id: item.zone_id}}))
        Zone.find().or(tmp)
        .then((zones) => {
            return res.json(convertZoneOUT(zones))
        }).catch((err)=>{return res.send(err)})
    })
      
  }

  exports.getAllOwnedBy = (req, res) => {
    Super_admin.find({user_id: req.body.user_id}, (err, master) => {
        if (err) return res.send(err)
        if (master == null || master.length == 0) return res.send(master)
        var tmp = master.map((item => {return {_id: item.zone_id}}))
        Zone.find().or(tmp)
        .then((zones) => {
            return res.json(convertZoneOUT(zones))
        }).catch((err)=>{return res.send(err)})
    })
      
  }
  exports.getZoneInfo = (req, res) => {
      console.log(req.query)
    Zone.find({_id: req.query.zone_id}, (err, zone) => {
        if (err) return res.send(err)
        return res.send(convertZoneOUT(zone))
    })
  }

exports.createZone = (req, res) => {
    newZone = convertZoneIN(req.body)
    newZone.owner_id = req.user._id
    console.log(newZone)
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
                    return res.status(200).json({ message: 'Zone succesfully created', _id: resZone._id })
                })
            } 
        })
    } else {
        Zone.findOne({_id: newZone.parent_zone_id},'owner_id', (err, parentZone) => {
            if (err || parentZone == null) {
                return res.status(400).json({ message: 'Parent zone does not exist' })
            } else if (parentZone.owner_id != req.user._id) {
                return res.status(400).json({ message: 'User does not own parent zone' })
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
    }
}

exports.deleateZone = (req, res) => {
    Zone.findById(req.body.zone_id, (err, zone) => {
        if (err || zone == null) {
            return res.status(400).json({ message: 'zone does not exist' })
        } else if (zone.owner_id != req.user._id) {
            return res.status(400).json({ message: 'User does not own the zone!' })
        } else {
            Zone.exists({parent_zone_id: req.body.zone_id}, (err, exists) => {
                if (err) return res.send(err)
                if (exists) return res.send({message: 'zone has children, please delete children first'})
                Zone.deleteOne({_id: req.body.zone_id}, (err,   success) => {
                    if (err) {
                        return res.status(400).json({ message: 'could not delete zone' })
                    } else {
                        if (zone.parent_zone_id == null) {
                            Super_admin.deleteOne({zone_id: zone._id}, (err, back) => {
                                if (err) res.send(err)
                            })
                        }
                        return res.send(success)  
                    }
                })
            })
        }
    })
}

/**
 * get zone_id from req.body
 * get child zones
 */
exports.getChildren = (req, res) => {
    Zone.find({parent_zone_id: req.query.zone_id}, (err, childern) => {
        if (err) return res.send(err)
        return res.send(convertZoneOUT(childern))
    })
}

const getChildren = (req, res) => {
    Zone.find({parent_zone_id: req.body.zone_id}, (err, childern) => {
        if (err) return err
        for (z in childern) {
            console.log(z)
        }
        return childern
    })
}

exports.updateById = (req, res) => { // :)
    console.log(req.body)
    Zone.findById(req.body.zone_id, async(err,zone) => {
        if (err || zone == null) {
            return res.status(400).json({ message: 'zone does not exist' })
        } else if (zone.owner_id != req.user._id) {
            return res.status(400).json({ message: 'User does not own the zone!' })
        } else {
            zone.name = req.body.name || zone.name
            zone.color = req.body.color || zone.color
            if (req.body.parent_zone_id && req.body.parent_zone_id != zone.parent_zone_id && req.body.parent_zone_id != req.body.zone_id) {
                if (zone.parent_zone_id == null) {
                    Zone.findById(req.body.parent_zone_id, (err,parent) => {
                        if (err || parent == null) {
                            return res.status(400).json({ message: 'Parent zone does not exist' })
                        } else if (parent.owner_id != req.user._id) {
                            return res.status(400).json({ message: 'User does not own parent zone' })
                        } else {
                            zone.parent_zone_id = req.body.parent_zone_id
                            zone.save((err,back) => {
                                if (err) res.send(err)
                                Super_admin.deleteOne({zone_id: req.body.zone_id}, (err,success) => {
                                    if (err) { 
                                        return res.send(err)}
                                    return res.send(back)
                                })
                            })
                        }
                    })
                } else {
                    Zone.findById(req.body.parent_zone_id, (err,parent) => {
                        if (err || parent == null) {
                            return res.status(400).json({ message: 'Parent zone does not exist' })
                        } else if (parent.owner_id != req.user._id) {
                            return res.status(400).json({ message: 'User does not own parent zone' })
                        } else {
                            zone.parent_zone_id = req.body.parent_zone_id
                            zone.save((err,back) => {
                                if (err) res.send(err)
                                return res.send(back)
                            })
                        }
                    })
                }     
            } else if (req.body.parent_zone_id == null && req.body.parent_zone_id != zone.parent_zone_id) {
                zone.parent_zone_id = req.body.parent_zone_id
                zone.save((err,back) => {
                    if (err) res.send(err)
                    newSuper = new Super_admin({user_id: req.user._id, zone_id: req.body.zone_id})
                    newSuper.save((err, resSuper) => {
                        if (err) {
                        return res.status(400).json({ message: 'Super_admin could not be created' })
                        }
                        return res.send(back)
                    })
                })                
            } else {
                zone.save((err,back) => {
                    if (err) res.send(err)
                    res.send(back)
                })
            }
        }
    })
}

exports.isWithin = (req, res) => {
    
}