var mongoose = require('mongoose')
var location = require('../location')

const Schema = mongoose.Schema

const userSchema = new Schema({
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'zone',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: location.polygonSchema
  },
    date_created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', userSchema, 'user')
