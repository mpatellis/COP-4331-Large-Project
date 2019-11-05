var Admin = require('../../models/admin')
var config = require('../../../config')



exports.getAll = (req, res) => {
    if (process.env.NODE_ENV === config.dev) {
      Admin.find({}, (err, admin) => {
        if (err) {
          res.send(err)
        } else {
          res.json(admin)
        }
      })
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' })
    }
  }