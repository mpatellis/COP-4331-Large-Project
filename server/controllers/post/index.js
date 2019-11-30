var Post = require('../../models/post')
var config = require('../../../config')

const fileUpload = require('express-fileupload');

// TODO
// Need to add zones and images
// Need to figure out how to read in form data
// body-parser, multer, body packages to look at
exports.addNewPost = (req, res) => {
  console.log(req.body); 
  // req.body.user_id = req.user._id
  // let imageFile = req.file;

  // const newPost = new Post(req.body)
  // console.log(imageFile);
  // newPost.save((err, post) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.json(post)
  //   }
  // })
 res.json(req.body);
  //}
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

  exports.getById = (req, res) => { // :)
    Post.findById(req.params.postId, (err, post) => {
      if (err) {
        res.send(err)
      } else if (!post){
        res.json({})
      } else if (post.user_id == req.user._id) {
        res.json(post)
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' })
      }
    })
  }

  // TODO
  // ability for admin to delete as well
  exports.deleteById = (req, res) => {
    Post.deleteOne({ user_id: req.user._id, _id: req.params.postId }, (err, post) => {
      if (err) {
        res.send(err)
      } else {
        res.json(post)
      }
    })
  }

  exports.updateById = (req, res) => { // :)
    Post.updateOne({ user_id: req.user._id, _id: req.params.postId }, req.body, (err, post) => {
      if (err) {
        res.send(err)
      } else {
        res.json(post)
      }
    })
  }