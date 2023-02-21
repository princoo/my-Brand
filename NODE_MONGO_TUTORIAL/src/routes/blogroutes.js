const express= require('express')
// const passport= require('passport')
const controller= require('../controllers/blogcontrollers')
const {verification} = require('../middlewares/verifytoken')
const verifyUser = require('../middlewares/verifyuser')
const adminAction= require('../middlewares/adminActions')
const upload= require('../configs/multer')
// const upload= require('../middlewares/multer')
const Router= express.Router()

// Router.get('/auth/google',passport.authenticate('google',{
//     scope:['profile']
// }))
// Router.get('/auth/google/redirect',passport.authenticate('google'),controller.callback)

/**
 * @swagger
 * components:
 *  schemas:
 *      blog:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: blog id
 *              title:
 *                  type: string
 *                  description: blog title
 *              body:
 *                  type: string
 *                  description: blog body
 *              imageUrl:
 *                  type: object
 *                  description: blog image
 *              comments:
 *                  type: array
 *                  description: blog comments
 *              likes:
 *                  type: array
 *                  description: blog likes
 *          required:
 *              - title
 *              - body
 *              - imageUrl
 * 
 */

/**
 * @swagger
 * tags:
 *      name: Blogs
 *      name: Login/Signup
 *      name: Messages
 *      name: Likes
 *      name: Comments
 *      name: User
 *  
 */

/**
 * @swagger
 * /blogs:
 *  get:
 *      summary: this API should return all blogs
 *      tags: [Blogs]
 *      description: all blogs are retrieved
 *      responses:
 *          200:
 *              description: GET all blogs
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/blog'
 * 
 * /blogs/{id}:
 *  get:
 *      summary: get blog by id
 *      tags: [Blogs]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the blog id
 *      responses:
 *          200:
 *              description: blog by id 
 *              content:
 *                  application/json: 
 *                        schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/blog'
 * 
 *          404:
 *              description: the blog does not exist
 */

/** 
 * @swagger 
 * /blogs/{id}:
 *  delete:
 *      summary: Deleting a blog
 *      tags: [Blogs]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the blog id
 *      responses:
 *          200:
 *              description: Successfully deleted the blog
 *          400:
 *              description: Action not made
 */


/** 
 * @swagger 
 * securityDefinitions:
 *      bearerAuth:
 *          type: "apiKey"
 *          name: "Authorization"
 *          in: "header"
 * /add:
 *  post:
 *      summary: adding new blog
 *      tags: [Blogs]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: add blog title
 *                          body:
 *                              type: string
 *                              description: add blog body
 *                          image:
 *                              type: string
 *                              format: binary
 *                              description: blog image
 *      
 *      responses:
 *          200:
 *              description: adding new blog
 */

/** 
 * @swagger 
 * /login:
 *  post:
 *      summary: Log in a user
 *      tags: [Login/Signup]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: your email
 *                          password:
 *                              type: string
 *                              description: your password
 *      
 *      responses:
 *          200:
 *              description: Loged in
 *              headers:
 *                  set-cookie:
 *                      type: string
 *                      example: jwc= oooooooo999999
 */

/** 
 * @swagger 
 * /signup:
 *  post:
 *      summary: Creating a new user
 *      tags: [Login/Signup]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: your name
 *                          email:
 *                              type: string
 *                              description: your email
 *                          password:
 *                              type: string
 *                              description: your password
 *      
 *      responses:
 *          200:
 *              description: Successfully created account
 *          403:
 *              description: email used
 *              headers:
 *                  set-cookie:
 *                      type: string
 *                      example: jwt=proccess.env.ADMIN_TOKEN; path=/; httpOnly
 */

/**
 * @swagger
 * /logout:
 *  get:
 *      summary: loging out
 *      tags: [Login/Signup]
 *      responses:
 *          200:
 *              description: successfully loged out
 * 
 */

/** 
 * @swagger 
 * /messages:
 *  post:
 *      summary: sending messages
 *      tags: [Messages]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: your email
 *                          message:
 *                              type: string
 *                              description: your message
 *      
 *      responses:
 *          201:
 *              description: Successfully send a message
 *          400:
 *              description: Message not sent
 */

/** 
 * @swagger 
 * /blogs/like/{id}:
 *  post:
 *      summary: sending messages
 *      tags: [Likes]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the blog id
 *      responses:
 *          200:
 *              description: Successfully made action
 *          400:
 *              description: Action not made
 */

/** 
 * @swagger 
 * /blogs/comment/{id}:
 *  post:
 *      summary: sending messages
 *      tags: [Comments]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the blog id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          comment:
 *                              type: string
 *                              description: your comment
 *      
 *      responses:
 *          201:
 *              description: Successfully added a comment
 *          400:
 *              description: comment not added
 */

/**
 * @swagger
 * /users/update/{id}:
 *  patch:
 *      summary: Update user info
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            shema:
 *              type: string
 *            required: true
 *            description: user ID
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: your username
 *                          email:
 *                              type: string
 *                              description: your email
 *      responses:
 *          200: 
 *              description: User info updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          400:
 *              description: Failed to update User info
 *      
 */

/**
 * @swagger
 * /blogs/{id}:
 *  patch:
 *      summary: this API updates a blog
 *      tags: [Blogs]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: blog title
 *                          body:
 *                              type: string
 *                              description: blog body
 *                          image:
 *                              type: string
 *                              format: binary
 *                              description: blog image
 *      responses:
 *          200:
 *              description: Blog updated successfully 
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          400:
 *              description: Unable to update blog
 */

/**
 * @swagger
 * /messages:
 *  get:
 *      summary: this API gets all the messages
 *      tags: [Messages]
 *      
 *      responses:
 *          200:
 *              description: Retrieved all blogs
 */

/**
 * @swagger
 * /blogs/{blogID}/{commentID}:
 *  delete:
 *      summary: this API will delete a comment
 *      tags: [Comments]
 *      parameters:
 *          - in: path
 *            name: blogID
 *            required: true
 *          - in: path
 *            name: commentID
 *            required: true
 *      responses:
 *          200:
 *              description: Comment deleted successfully 
 *          400:
 *              description: oops Comment not deleted
 */



Router.get('/blogs',controller.viewBlog)
Router.get('/blogs/sort',controller.sortedBlogs)
Router.get('/blogs/add',controller.viewAddblog)
Router.post('/blogs/comment/:id',verification,controller.comments)
Router.post('/blogs/like/:id',verification,controller.toggleLikes)
Router.post('/blogs/dislike/:id',verification,controller.toggleDislike)
Router.get('/blogs/:id',controller.singleBlog)
// Router.get('/blogs/:id',controller.singleBlog)
Router.post('/add',verification,adminAction,upload.single('image'),controller.addBlog)
Router.patch('/blogs/:id',upload.single('image'),controller.updateBlog)
Router.patch('/users/update/:id',verification,adminAction,controller.updateUser)
Router.delete('/blogs/:id',verification,adminAction,controller.deleteBlog)
Router.delete('/blogs/:blogID/:commentID',verification,adminAction,controller.deleteComment)
Router.post('/signup',controller.signUp)
Router.post('/login',controller.login)
Router.get('/logout',controller.logout)
Router.post('/messages',controller.addMessages)
Router.delete('/messages/:id',verification,adminAction,controller.deleteMessage)
Router.get('/messages',verification,adminAction,controller.viewmessages)
Router.get('/users',verification,adminAction,controller.getUsers)
Router.delete('/users/:id',verification,adminAction,controller.deleteUser)
Router.post('/comment/reply/:id',verification,controller.reply)

module.exports= Router