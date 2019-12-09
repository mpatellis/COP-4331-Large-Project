var Post = require('../../models/post')
var config = require('../../../config')

const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config()


const id =     process.env.AWS_ID;
const secret = process.env.AWS_SECRET;

const s3 = new AWS.S3({
  accessKeyId: id,
  secretAccessKey: secret,
  signatureVersion: 'v4'
})

// TODO
// Need to add zones

// Images are saved in s3 by the post _id
exports.addNewPost = (req, res) => {
  req.body.user_id = req.user._id
  let imageFile = req.files.file;
  const newPost = new Post(req.body)
  
  // Saving the file in the pictures directory
  imageFile.mv(`${__dirname}/${newPost._id}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      // Have to ensure that the picture has been saved before taking it and uploading it to s3
      // This took me too long to figure out
      let filename = newPost._id + '.jpg';
      const fileContent = fs.readFileSync(__dirname + '/' + filename);
      const params = {
        Bucket: 'fix-this',
        Key: filename,
        Body: fileContent
      };
      
      s3.upload(params, function(err, data) {
        if (err) {
          throw err;
        }
      });
    }
  });

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

  exports.getById = (req, res) => { // :)
    Post.findById(req.params.postId, (err, post) => {
      if (err) {
        res.send(err)
      } else if (!post){
        res.json({})
      } else if (post.user_id == req.user._id) {
        // Defining what we need from S3
        let filename = req.params.postId + '.jpg';
        const params = {
          Bucket: 'fix-this',
          Key: filename,
        };

        s3.getObject(params, function(err, data) {
          if (err) {
            throw err;
          } else {
            // What next for file?
          }
        })
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
        // Define the thing to be deleted from S3
        let filename = req.params.postId + '.jpg';
        const params = {
          Bucket: 'fix-this',
          Key: filename,
        };
        // Deletes the picture of S3
        s3.deleteObject(params, function(err, data) {
          if (err) {
            throw err;
          }
        })
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