var mongoose = require('mongoose')
var location = require('../location')

const Schema = mongoose.Schema

const zoneSchema = new Schema({
  parent_zone_id: {
    type: Schema.Types.ObjectId,
    ref: 'zone',
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  location: {
    type: location.polygonSchema,
    required: true
  },
  public: {
    type: Boolean,
    default: false
  },
  date_created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('zone', zoneSchema, 'zone')
