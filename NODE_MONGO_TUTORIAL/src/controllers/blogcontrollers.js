const express= require('express')
const app= express()
const Blog = require('../models/blogmodule')

app.use(express.json())


// view all blogs
const viewBlog= async(req,res)=>{
    await Blog.find()
        .then((data)=> res.status(200).json(data))
}
// getting single blog
const singleBlog= async(req,res)=>{
    const id= req.params.id
            let count=0;
            await Blog.find()
            .then((data)=>{
                data.forEach(blog => {
                    if(blog._id==id){
                        res.json(blog)
                        count+=1
                    }
                    
                })
                if(count==0){
                    res.status(404).json("THE BLOG DOES NOT EXIST")
                }
            })
}
// updating blog
const updateBlog= (req,res)=>{
    const id= req.params.id
    Blog.findByIdAndUpdate({_id:id},req.body,(err,data)=>{
      if(err){
        res.status(400).json("CAN NOT FIND THE ID")
      }
      if(data){
        res.json(data)
      }
     })
}
// adding new blog
const addBlog= async(req,res)=>{
    await Blog.create({title:req.body.title , body:req.body.body})
    res.status(201).json("BLOG ADDED")
}
// deleting blog
const deleteBlog= (req,res)=>{
    const id= req.params.id;
    Blog.findByIdAndRemove({_id:id},(err,data)=>{
      if(err){
          res.json(err)
      }
      if(data){
          res.json(data)
      }
    })
}
// geting limited amount of blogs
const sortedBlogs= async(req,res)=>{
    await Blog.find()
    .then((data)=>{
        const size= req.query.size *1
            const sorted = data.slice(0,size)
            res.status(200).json(sorted)
    })
}

module.exports={
    viewBlog,
    singleBlog,
    updateBlog,
    addBlog,
    deleteBlog,
    sortedBlogs,
}