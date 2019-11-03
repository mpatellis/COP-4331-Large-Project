var Super_admin = require('../../models/super_admin')
var config = require('../../../config')



exports.getAll = (req, res) => {
    if (process.env.NODE_ENV === config.dev) {
      Super_admin.find({}, (err, superAdmin) => {
        if (err) {
          res.send(err)
        } else {
          res.json(superAdmin)
        }
      })
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' })
    }
  }



