var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {

    router.route('/')
        .get(controller.post.getAll)
        .post(controller.post.addNewPost)

    router.route('/id/:postId')
        .get(controller.post.getById)
        .delete(controller.post.deleteById)
        .put(controller.post.updateById)

    return router
}