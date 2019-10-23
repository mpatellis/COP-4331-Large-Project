/**
 * @swagger
 *  definitions:
 *      User:
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *              full_name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *      Login:
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *
 *      UserArray:
 *          type: array
 *          items:
 *              required:
 *                  - username
 *              properties:
 *                  _id:
 *                      type: string
 *                  username:
 *                      type: string
 *                  full_name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  date_created:
 *                      type: string
 *                  hash_password:
 *                      type: string
 */
