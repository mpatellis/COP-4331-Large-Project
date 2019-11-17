var Post = require('../../models/post')
var config = require('../../../config')

exports.addNewPost = (req, res) => {
  req.body.user_id = req.user._id
  console.log("do we even get here")

  newPost.save((err, post) => {
    if (err) {
      res.send(err)
    } else {
      res.json(post)
    }
  })
}

exports.getAll = (req, res) => {
    if (process.env.NODE_ENV === config.dev) {
      Post.find({}, (err, post) => {
        if (err) {
          res.send(err)
        } else {
          res.json(post)
        }
      })
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' })
    }
  }