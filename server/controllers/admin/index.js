var Follow = require('../../models/follow')
var config = require('../../../config')



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