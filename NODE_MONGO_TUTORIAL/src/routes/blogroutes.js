const express= require('express')
const controller= require('../controllers/blogcontrollers')
const Router= express.Router()

Router.get('/blogs',controller.viewBlog)
Router.get('/blogs/sort',controller.sortedBlogs)
Router.get('/blogs/:id',controller.singleBlog)
Router.post('/add',controller.addBlog)
Router.patch('/blogs/:id',controller.updateBlog)
Router.delete('/blogs/:id',controller.deleteBlog)

module.exports= Router