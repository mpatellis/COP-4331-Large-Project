var Vote = require('../../models/vote')
var config = require('../../../config')
var Post = require('../../models/post')

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

exports.newVote = (req, res) => {
  console.log(req.params)
  // check if user has voted on this post before TODO
  

  // if not create new vote model
  const vote = {
    user_id: req.user.id,
    post_id: req.params.postId,
    up_vote: true
  }
  var newVote = new Vote(vote)
  
Post.findOne({_id: req.params.postId}, function(err, post) {
  if (err || !post) {
    return res.send(err)
  } else {
    var update = {
      up_votes: 0
    }
    update.up_votes = post.up_votes + 1

    // Update up_vote on proper post
    Post.updateOne({_id: req.params.postId}, update, (err, post) => {
      if (err) {
        return res.send(err)
      }
      newVote.save((err, vote) => {
        if (err) {
          return res.send(err)
        } else {
          return res.json(vote)
        }
      })
    })
  }
})
  
  // update var for updating the post
  // var update = {
  //   up_vote: 0
  // }

  // Finds post that is being upvoted to find current vote count
  // Post.findOne({_id: '5def309c97b80852ed91c3d7'}, function(err, post) {
  //   console.log(post)
  //   if (err || !post) {
  //     throw err
  //   } else {
  //     update.up_vote = post.up_votes + 1

  //     // Update up_vote on proper post
  //     Post.updateOne({_id: req.params.postId}, update, (err, post) => {
  //       if (err) {
  //         throw err
  //       }
  //     })
  //   }
  // })

  // Save vote so you can't vote more thna once
  // newVote.save((err, vote) => {
  //   if (err) {
  //     return res.send(err)
  //   } else {
  //     return res.json(vote)
  //   }
  // })
}
