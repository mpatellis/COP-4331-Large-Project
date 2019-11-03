var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {

    router.route('/')
        .get(controller.zone.getAll)
        /**
        * @swagger
        * /zone:
        *   post:
        *     tags: [zone]
        *     summary: create new zone
        *     description: TODO - fix swagger
        *     responses:
        *       200:
        *         description: succesfull.
        *       401:
        *         description: failed.
        */
      .post(loginRequired,controller.zone.creatZone)
      .delete(loginRequired,controller.zone.deleateZone)

    return router
}