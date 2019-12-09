var mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  zone_id: {
    type: Schema.Types.ObjectId,
    ref: 'zone',
    required: true
  }
})

module.exports = mongoose.model('admin', adminSchema, 'admin')
