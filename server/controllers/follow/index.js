var config = require('../../../config')
var Follow = require('../../models/follow')


exports.getAll = (req, res) => {
    if (process.env.NODE_ENV === config.dev) {
      Follow.find({}, (err, follow) => {
        if (err) {
          res.send(err)
        } else {
          res.json(follow)
        }
      })
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' })
    }
  }

  exports.followZone = (req, res) => {
    newFollow = new Follow({user_id: req.user.id, zone_id: req.body.zone_id})  
    newFollow.save((err,follow) => {
      if (err) res.send(err)
      res.send(follow)
    })
  }