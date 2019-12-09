var Vote = require('../../models/vote')
var config = require('../../../config')

exports.getAll = (req, res) => {
  if (process.env.NODE_ENV === config.dev) {
    Vote.find({}, (err, vote) => {
      if (err) {
        res.send(err)
      } else {
        res.json(vote)
      }
    })
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

