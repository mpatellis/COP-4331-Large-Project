/**
 * @swagger
 *  definitions:
 *      Post:
 *          required:
 *              - title
 *              - text
 *          properties:
 *              title:
 *                  type: string
 *              text:
 *                  type: string
 *      Search:
 *          required:
 *              -search
 *          properties:
 *              search:
 *                  type: string
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
 *      Zone:
 *          required:
 *              - name
 *              - location
 *          properties:
 *              parent_zone_id:
 *                  type: string
 *              owner_id:
 *                  type: string
 *              name:
 *                  type: string
 *              coords:
 *                  $ref: "#/definitions/Coords"
 *                  
 *      Coords:
 *          type: array
 *          items:
 *              required:
 *                  - lat
 *                  - lng
 *              properties:
 *                  lat:
 *                      type: number
 *                  lng:
 *                      type: number
 *          
 *      Polygon:
 *          required:
 *              - coordinates
 *          properties:
 *              coordinates:
 *                  type: array
 *                  items: 
 *                      type: array
 *                      items:
 *                          type: array
 *                          items:
 *                              type: number
 *                              minItems: 2
 *                              maxItems: 2
 *                      
 *      PostArray:
 *          type: array
 *          items:
 *              required:
 *                  - title
 *              properties:
 *                  open:
 *                      type: Boolean
 *                  up_votes:
 *                      type: int
 *                  down_votes:
 *                      type: int
 *                  _id:
 *                      type: string
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *                  user_id:
 *                      type: string
 */
