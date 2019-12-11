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
        .get(loginRequired, controller.post.getAll)
        
        /**
         * @swagger
         * /post/:
         *   post:
         *     tags: [post]
         *     summary: creates a post
         *     description: creates a post and returns post
         *     security:
         *       - BearerAuth: []
         *     consumes:
         *       - multipart/form-data
         *     parameters:
         *       - in: formData
         *         name: file
         *         type: file
         *       - in: formData
         *         name: title
         *         type: string
         *         required: true
         *       - in: formData
         *         name: text
         *         type: string
         *         required: true
         *         description: the post you want to create
         *         schema:
         *           $ref: "#/definitions/Post"
         *     responses:
         *       204:
         *         description: post succesfully created.
         *       400:
         *         description: post couldn't be created.
         */
        .post(loginRequired, controller.post.addNewPost)

    router.route('/id/:postId')
        /**
        * @swagger
        *
        * /post/id/{postId}:
        *   get:
        *     tags: [post]
        *     summary: get post by post id
        *     description: return post
        *     parameters:
        *       - in: path
        *         name: postId
        *         schema:
        *           type: string
        *         required: true
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
        * /post/id/:
        *   put:
        *     tags: [post]
        *     summary: updates post
        *     description: updates post
        *     parameters:
        *       - name: post
        *         in: body
        *         description: the post fields to update
        *         schema:
        *           $ref: "#/definitions/Post"
        *     responses:
        *       200:
        *         description: update succesfull.
        *       401:
        *         description: update failed.
        */
        .put(controller.post.updateById)
    router.route('/zoneid/:zone_Id')
        /**
        * @swagger
        *
        * /post/zoneid/:
        *   get:
        *     tags: [post]
        *     summary: get posts by zone id
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
        .get(controller.post.getByZoneId)

    router.route('/search')
        /**
        * @swagger
        *
        * /post/search/:
        *   post:
        *     tags: [post]
        *     summary: searches posts by search params
        *     description: searches posts by search params
        *     security:
        *       - BearerAuth: []
        *     parameters:
        *       - name: post
        *         in: body
        *         description: searches the posts
        *         schema:
        *           $ref: "#/definitions/Search"
        *     responses:
        *       200:
        *         description: update succesfull.
        *       401:
        *         description: update failed.
        */
        .post(controller.post.search)

    return router
}