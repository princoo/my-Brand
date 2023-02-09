const express= require('express')
const passport= require('passport')
const controller= require('../controllers/blogcontrollers')
const {verification} = require('../middlewares/verifytoken')
const verifyUser = require('../middlewares/verifyuser')
const adminAction= require('../middlewares/adminActions')
const upload= require('../configs/multer')
// const upload= require('../middlewares/multer')
const Router= express.Router()

Router.get('/auth/google',passport.authenticate('google',{
    scope:['profile']
}))
Router.get('/auth/google/redirect',passport.authenticate('google'),controller.callback)

Router.get('/blogs',controller.viewBlog)
Router.get('/blogs/sort',controller.sortedBlogs)
Router.get('/blogs/add',controller.viewAddblog)
Router.post('/blogs/comment/:id',verification,controller.comments)
Router.post('/blogs/like/:id',verification,controller.toggleLikes)
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
Router.get('/messages',verification,adminAction,controller.viewmessages)

module.exports= Router