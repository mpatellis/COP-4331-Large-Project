var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {

    
    router.route('/')
        /**
         * @swagger
         * /post/:
         *   get:
         *     tags: [post]
         *     summary: Gets all posts (dev mode only)
         *     description: Returns a list containing all posts.
         *     responses:
         *       200:
         *         description: A list of posts
         *         schema:
         *           $ref: "#/definitions/PostArray"
         */
        .get(controller.post.getAll)
        
        /**
         * @swagger
         * /post/:
         *   post:
         *     tags: [post]
         *     summary: creates a post
         *     description: creates a post and returns post
         *     security:
         *       - BearerAuth: []
         *     parameters:
         *       - name: post
         *         in: body
         *         description: the post you want to create
         *         schema:
         *           $ref: "#/definitions/Post"
         *     responses:
         *       204:
         *         description: post succesfully created.
         *       400:
         *         description: post couldn't be created.
         */
        .post(controller.post.addNewPost)

    router.route('/id/:postId')
        /**
        * @swagger
        *
        * /post/id/:
        *   get:
        *     tags: [post]
        *     summary: get post by post id
        *     description: return post
        *     responses:
        *       200:
        *         description: retrieval succesfull.
        *         schema:
        *           properties:
        *             token:
        *               type: string
        *       401:
        *         description: retrieval failed.
        */
        .get(controller.post.getById)
        /**
        * @swagger
        *
        * /post/id/:
        *   delete:
        *     tags: [post]
        *     summary: deletes the post
        *     description: deletes post
        *     responses:
        *       200:
        *         description: delete was succesfull.
        *         schema:
        *           properties:
        *             token:
        *               type: string
        *       401:
        *         description: deletion failed.
        */
        .delete(controller.post.deleteById)
        /**
        * @swagger
        *
        * /user/id/:
        *   put:
        *     tags: [post]
        *     summary: updates post
        *     description: updates post
        *     parameters:
        *       - name: post
        *         in: body
        *         description: the user fields to update
        *         schema:
        *           $ref: "#/definitions/Post"
        *     responses:
        *       200:
        *         description: update succesfull.
        *       401:
        *         description: update failed.
        */
        .put(controller.post.updateById)

    return router
}