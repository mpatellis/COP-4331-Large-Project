var mongoose = require('mongoose')
var location = require('../location')

const Schema = mongoose.Schema

const postSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  // zone_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'zone',
  //   required: true
  // },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  // img_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'img'
  // },
  // location: {
  //   type: location.pointSchema,
  //   required: true
  // },
  open: {
    type: Boolean,
    default: true
  },
  up_votes: {
    type: Number,
    default: 0
  },
  down_votes: {
    type: Number,
    default: 0
  },
    date_created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('post', postSchema, 'post')
