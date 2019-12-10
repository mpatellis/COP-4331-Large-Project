var mongoose = require('mongoose')

const Schema = mongoose.Schema

const voteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    required: true
  },
  up_vote: {
    type: Boolean,
    default: true
  }
})

//voteSchema.index({ user_id: 1, post_id: 1 }, { unique: true })

module.exports = mongoose.model('vote', voteSchema, 'vote')
