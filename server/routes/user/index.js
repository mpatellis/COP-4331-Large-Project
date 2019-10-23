var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router.route('/allusers')
    .get(controller.user.getAll)

  router.route('/register')// :)
    .post(controller.user.register)

  router.route('/login')// :)
    .post(controller.user.login)

  router.route('/')
    .get(loginRequired, controller.user.getById)
    .put(loginRequired, controller.user.updateById)
    .delete(loginRequired, controller.user.deleteById)

  router.route('/username/:username')// returns true if username exists
    .get(controller.user.getByUsername)

  return router
}

