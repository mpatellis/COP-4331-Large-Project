var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {

    router.route('/')
      /**
      * @swagger
      * /zone:
      *   get:
      *     tags: [zone]
      *     summary: Gets all zones (dev mode only)
      *     description: Returns a list containing all zones.
      *     responses:
      *       200:
      *         description: A list of  all zones
      */
      .get(controller.zone.getAll)

      /**
      * @swagger
      * /zone:
      *   post:
      *     tags: [zone]
      *     summary: create new zone
      *     description: TODO - fix swagger
      *     security:
      *       - BearerAuth: []
      *     parameters:
      *       - name: zone
      *         in: body
      *         description: the user to create
      *         schema:
      *           $ref: "#/definitions/Zone"
      *     responses:
      *       200:
      *         description: succesfull.
      *       401:
      *         description: failed.
      */
      .post(loginRequired,controller.zone.createZone)

      /**
      * @swagger
      * /zone:
      *   delete:
      *     tags: [zone]
      *     summary: delete zone
      *     description: deletes zone if it has no children
      *     security:
      *       - BearerAuth: []
      *     parameters:
      *       - name: zone_id
      *         in: body
      *         description: the zone to delete
      *         schema:
      *           required:
      *           - zone_id
      *           properties:
      *             zone_id:
      *               type: string
      *     responses:
      *       200:
      *         description: succesfull.
      *       401:
      *         description: failed.
      */
      .delete(loginRequired,controller.zone.deleateZone)

      .patch(loginRequired, controller.zone.updateById)
    router.route('/children')
      /**
      * @swagger
      * /zone/children:
      *   get:
      *     tags: [zone]
      *     summary: get child zonns
      *     description: gets all immediate children
      *     security:
      *       - BearerAuth: []
      *     parameters:
      *       - name: zone_id
      *         in: body
      *         description: the zone to delete
      *         schema:
      *           required:
      *           - zone_id
      *           properties:
      *             zone_id:
      *               type: string
      *     responses:
      *       200:
      *         description: succesfull.
      *       401:
      *         description: failed.
      */
      .get(loginRequired, controller.zone.getChildren)

    router.route('/owned')
      .get(loginRequired, controller.zone.getAllOwned)
    
    router.route('/test')
      .post(controller.zone.test)

    return router
}