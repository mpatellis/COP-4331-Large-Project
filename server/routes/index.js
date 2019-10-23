var router = require('express').Router()
var userRoute = require('./user')
const path = require('path')
var loginRequired = require('../controllers/user').loginRequired

module.exports = () => {
  router.use('/user', userRoute())

  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

  return router
}
