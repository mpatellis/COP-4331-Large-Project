var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {

    router.route('/')
        .get(controller.vote.getAll)

    router.route('/:postId/:userId')
        .post(controller.vote.newVote)

    return router
}