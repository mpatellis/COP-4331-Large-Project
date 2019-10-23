var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var config = require('../../../config')

var User = require('../../models/user')

exports.register = (req, res) => { // :)
  var newUser = new User(req.body)
  newUser.hash_password = bcrypt.hashSync(req.body.password, config.hashlength)
  newUser.save((err, user) => {
    if (err) {
      return res.send(err)
    } else {
      user.hashPassword = undefined
      return res.json(user)
    }
  })
}

exports.login = (req, res) => { // :)
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err
    if (!user) {
      res.status(401).json({ message: 'Incorect username!' })
    } else if (!user.authPassword(req.body.password, user.hash_password)) {
      res.status(401).json({ message: 'Incorect password' })
    } else {
      return res.json({ token: jwt.sign({ username: user.username, _id: user.id }, config.secrets.jwt) })
    }
  })
}

exports.loginRequired = (req, res, next) => { // :)
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

exports.getAll = (req, res) => {
  if (process.env.NODE_ENV === config.dev) {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err)
      } else {
        res.json(user)
      }
    })
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

exports.getById = (req, res) => { // :)
  User
    .findById(req.user._id, { _id: 0, hash_password: 0 })
    .exec((err, user) => {
      if (err) {
        res.send(err)
      } else {
        res.json(user)
      }
    })
}

exports.updateById = (req, res) => { // :)
  User.updateOne({ _id: req.user._id }, req.body, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json(user)
    }
  })
}

exports.deleteById = (req, res) => { // :)
  User.deleteOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json(user)
    }
  })
}

exports.getByUsername = (req, res) => { // :)
  User.find({ username: req.params.username })
  .exec((err, user) => {
    var empty = !Object.keys(user).length
    if (err) {
      res.send(err)
    } else if (!empty) {
      res.json({ exists: true })
    } else {
      res.json({ exists: false })
    }
  })
}