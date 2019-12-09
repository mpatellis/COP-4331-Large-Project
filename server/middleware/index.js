var config = require('../../config')
var bodyParser = require('body-parser')
var jsonwedtoken = require('jsonwebtoken')
var User = require('../models/user')
const fileUpload = require('express-fileupload')

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(fileUpload())

  app.use(async (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      jsonwedtoken.verify(req.headers.authorization.split(' ')[1], config.secrets.jwt, (err, decode) => {
        req.user = decode
        if (err) req.user = undefined
      })
    } else {
      req.user = undefined
    }
    if (req.user) {
      await User.findById(req.user._id, (err, user) => {
        if (err || !user) req.user = undefined
      })
    }
    next()
  })
}
