var mongoose = require('mongoose')

const Schema = mongoose.Schema

const superAdminSchema = new Schema({
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

module.exports = mongoose.model('super_admin', superAdminSchema, 'super_admin')
