var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {


  /**
  * @swagger
  * /user/allusers:
  *   get:
  *     tags: [user]
  *     summary: Gets all users (dev mode only)
  *     description: Returns a list containing all users.
  *     responses:
  *       200:
  *         description: A list of users
  *         schema:
  *           $ref: "#/definitions/UserArray"
  */
  router.route('/allusers')
    .get(controller.user.getAll)

  /**
  * @swagger
  * /user/register:
  *   post:
  *     tags: [user]
  *     summary: creates a user
  *     description: creates a user and returns user
  *     parameters:
  *       - name: user
  *         in: body
  *         description: the user to create
  *         schema:
  *           $ref: "#/definitions/User"
  *     responses:
  *       204:
  *         description: user succesfully created.
  *       400: 
  *         description: user couldn't be created.
  */      
  router.route('/register')// :)
    .post(controller.user.register)

  /**
  * @swagger
  * /user/login:
  *   post:
  *     tags: [user]
  *     summary: login
  *     description: login user returns JWT
  *     parameters:
  *       - name: user
  *         in: body
  *         description: the user to login
  *         schema:
  *           $ref: "#/definitions/Login"
  *     responses:
  *       200:
  *         description: login succesfull.
  *         schema:
  *           properties:
  *             token:
  *               type: string   
  *       401: 
  *         description: login failed.
  */      
  router.route('/login')// :)
    .post(controller.user.login)


  

  router.route('/')
    /**
    * @swagger
    * 
    * /user/:
    *   get:
    *     tags: [user]
    *     summary: get logged in user 
    *     description: login user returns JWT
    *     security:
    *       - BearerAuth: []
    *     responses:
    *       200:
    *         description: login succesfull.
    *         schema:
    *           properties:
    *             token:
    *               type: string   
    *       401: 
    *         description: login failed.
    */
    .get(loginRequired, controller.user.getById)

    /**
    * @swagger
    * 
    * /user/:
    *   put:
    *     tags: [user]
    *     summary: update user 
    *     description: update user info
    *     security:
    *       - BearerAuth: []
    *     parameters:
    *       - name: user
    *         in: body
    *         description: the user fields to update
    *         schema:
    *           $ref: "#/definitions/User"
    *     responses:
    *       200:
    *         description: update succesfull.   
    *       401: 
    *         description: ubdate failed.
    */
    .put(loginRequired, controller.user.updateById)

    /**
    * @swagger
    * 
    * /user/:
    *   delete:
    *     tags: [user]
    *     summary: delete user 
    *     description: delete user (does not delete user references)
    *     security:
    *       - BearerAuth: []
    *     responses:
    *       200:
    *         description: succesfull deleted.  
    *       401: 
    *         description: deletion failed.
    */
    .delete(loginRequired, controller.user.deleteById)

      /**
    * @swagger
    * 
    * /user/username/{username}:
    *   get:
    *     tags: [user]
    *     summary: does username exist 
    *     description: returns true if user exists
    *     parameters:
    *       - name: username
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: succesfull lookup.  
    *       401: 
    *         description: lookup failed.
    */
  router.route('/username/:username')// returns true if username exists
    .get(controller.user.getByUsername)

  return router
}

