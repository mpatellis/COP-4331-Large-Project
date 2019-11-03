var router = require('express').Router()
var userRoute = require('./user')
var zoneRoute = require('./zone')
var superAdminRoute = require('./super_admin')
const path = require('path')
var loginRequired = require('../controllers/user').loginRequired

module.exports = () => {
  router.use('/user', userRoute())
  router.use('/zone', zoneRoute())
  router.use('/superAdmin', superAdminRoute())

  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

  return router
}
