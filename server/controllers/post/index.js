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

function convertPostIN(post) {
  post.location = {coordinates: []}
  post._id = undefined
  var temp = [post.coordinates[0].latitude, post.coordinates[0].longitude]
  post.location.coordinates = [temp]
  return new Post(post)
}

// TODO
// Need to add zones

  // Images are saved in s3 by the post _id
  exports.addNewPost = (req, res) => {
    console.log(req)
    if (req.files === null || req.files.file === null) {
      return res.status(400).json({ message: 'A file was not sent' })
    }
    req.body.user_id = req.user._id
    let imageFile = req.files.file;
    const newPost = convertPostIN(req.body)
    
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
          Body: fileContent,
          ContentType: 'image/jpeg',
          ContentDisposition: 'inline'
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
    Post.find({}, (err, posts) => {
      if (err) {
        res.send(err)
      } else if (!posts[0]){
        res.json({})
      } else /*if (post.user_id == req.user._id)*/ {
        // Defining what we need from S3
        var reply = []
        for (var p in posts) {
          let filename = posts[p]._id + '.jpg';
          const signedUrlExpireSeconds = 60 * 5
          const url = s3.getSignedUrl('getObject', {
            Bucket: 'fix-this',
            Key: filename,
            Expires: signedUrlExpireSeconds
          })
          console.log(posts[p])
          reply[p] = {
            url: url,
            body: posts[p]
          };
        }
        

        res.json(reply);
      } /*else {
        return res.status(401).json({ message: 'Unauthorized user!' })
      }*/
    })
  }



  // returns json reply
  // reply.body will have all teh post text data
  // reply.url will have the url to download the picture
  exports.getById = (req, res) => { // :)
    Post.findById(req.params.postId, (err, post) => {
      if (err) {
        res.send(err)
      } else if (!post){
        res.json({})
      } else /*if (post.user_id == req.user._id)*/ {
        // Defining what we need from S3
        let filename = req.params.postId + '.jpg';
        const signedUrlExpireSeconds = 60 * 5
        const url = s3.getSignedUrl('getObject', {
          Bucket: 'fix-this',
          Key: filename,
          Expires: signedUrlExpireSeconds
        })
        console.log(post)
        const reply = {
          url: url,
          body: post
        };

        res.json(reply);
      } /*else {
        return res.status(401).json({ message: 'Unauthorized user!' })
      }*/
    })
  }

  exports.getByZoneId = (req, res) => { // :)
    Post.find({zone_id: req.params.zone_id}, (err, posts) => {
      if (err) {
        res.send(err)
      } else if (!posts[0]){
        res.json({})
      } else /*if (post.user_id == req.user._id)*/ {
        // Defining what we need from S3
        var reply = []
        for (var p in posts) {
          let filename = posts[p]._id + '.jpg';
          const signedUrlExpireSeconds = 60 * 5
          const url = s3.getSignedUrl('getObject', {
            Bucket: 'fix-this',
            Key: filename,
            Expires: signedUrlExpireSeconds
          })
          console.log(posts[p])
          reply[p] = {
            url: url,
            body: posts[p]
          };
        }
        

        res.json(reply);
      } /*else {
        return res.status(401).json({ message: 'Unauthorized user!' })
      }*/
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

  exports.search = (req, res) => { // :)
    var searchParams = req.body.search.split(' ')
    searchParams[0] = searchParams[0] || ''

    Post.find({
      $and: [
        {
          $or: [
            {
              $and: [
                { title: { $regex: searchParams[0], $options: 'i' } }
              ]
            }
          ]
        }
      ]
    }, {  },
    (err, post) => {
      if (err) {
        res.send(err)
      } else {
        res.json(post)
      }
    })
  }