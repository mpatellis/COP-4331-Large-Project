var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  full_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
    date_created: {
    type: Date,
    default: Date.now
  }
})

userSchema.methods.authPassword = (password, hash_password) => {
  return bcrypt.compareSync(password, hash_password)
}

module.exports = mongoose.model('user', userSchema, 'user')
