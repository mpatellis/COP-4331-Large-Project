var Zone = require('../../models/zone')
var Super_admin = require('../../models/super_admin')
var config = require('../../../config')



exports.getAll = (req, res) => {
    if (process.env.NODE_ENV === config.dev) {
      Zone.find({}, (err, zone) => {
        if (err) {
          res.send(err)
        } else {
          res.json(zone)
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
exports.creatZone = (req, res) => {
    newZone = new Zone(req.body)
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
                return res.status(204).json({ message: 'Zone succesfully created' })
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
                            return res.status(204).json({ message: 'Zone succesfully created' })
                        }
                    })
                }
            })
        })
    }
}

/**
 * get zone_id from req.body
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
                Zone.deleteOne({_id: req.body.zone_id}, (err,   sucsess) => {
                    if (err) {
                        return res.status(400).json({ message: 'could not delete zone' })
                    } else {
                        return res.json(deleteAllSubZones(req.body.zone_id))
                        
                    }
                })
            }   
        })
    })
}

deleteAllSubZones = (zone_id) => {
    Zone.deleteMany({parent_zone_id: zone_id}, (err, children) => {
        if (err) {
            return err
        } else if (children == null) {
            return "success"
        } else {
            // for (c of children) {
            //     deleteZoneAndAllSubZones(c._id)
            // }'
            console.log(children)
            return "success"
        }
    })
}