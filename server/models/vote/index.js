var mongoose = require('mongoose')

const Schema = mongoose.Schema

const voteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  up_vote: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('vote', voteSchema, 'vote')
