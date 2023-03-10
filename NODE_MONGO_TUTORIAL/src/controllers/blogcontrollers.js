const express= require('express')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')
const app= express()
const Blog = require('../models/blogmodule')
const BlogLike = require('../models/blog_likemodule')
const Users = require('../models/usersmodule')
const Message = require('../models/msgmodule')
const cloudinary= require('../configs/cloudinary')
const Comments = require('../models/commentsmodule')
const validateEmail= require('../middlewares/emailvalidation')
const {validateSignup,validateAddblog,validateLogin,validateMessages,validateCommnet, validateReply}= require('../middlewares/formvalidation')
const { findOneAndDelete } = require('../models/blogmodule')
const Replies = require('../models/replies')
const drafts = require('../models/daftmodule')


app.use(express.json())

// view all blogs
const viewBlog= async(req,res)=>{
    await Blog.find({category:"Blog"})
        .then((data)=> res.status(200).json(data))
}
// getting single blog
const singleBlog= async(req,res)=>{
    const id= req.params.id
            let count=0;
            await Blog.findById({_id:id}).populate('comments').populate('likes')
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch((err)=>{
                res.status(404).json({"error":"THE BLOG DOES NOT EXIST"})
            })
}
// updating blog
const updateBlog= async(req,res)=>{
    const id= req.params.id
    if(req.file){
        const image= await cloudinary.uploader.upload(req.file.path)
        req.body.imageUrl= {"id":image.public_id ,"url":image.url}
        
        Blog.findByIdAndUpdate({_id:id},req.body,(err,data)=>{
            if(err){
              res.status(400).json({"error":"CAN NOT FIND THE ID"})
            }
            if(data){
              res.status(200).json(data)
            }
           })
    }
    else{
        Blog.findByIdAndUpdate({_id:id},req.body,(err,data)=>{
            if(err){
              res.status(400).json({"error":"CAN NOT FIND THE ID"})
            }
            if(data){
              res.json(data)
            }
           })

    }

}
// adding new blog
const viewAddblog= (req,res)=>{
    res.render('add')
}

const addBlog= async(req,res)=>{
const {error,value} = validateAddblog(req.body)
if(!error){

    const image= await cloudinary.uploader.upload(req.file.path)
    await Blog.create({title:req.body.title , body:req.body.body,imageUrl:{"id":image.public_id,"Url":image.url},category:"Blog"})
    .then((data)=>{
        
        res.status(201).json({"data":data,"message":"BLOG ADDED"})
    })
}else{
    res.status(400).json({"error":error})
} 
        
}
// deleting blog
const deleteBlog= (req,res)=>{
    const id= req.params.id;
    Blog.findOne({_id:id})
    .then(async(blog)=>{
        try {
            if(!blog){
                res.status(400).json({"error":"cant find the blog"})
            }else{
                await Blog.deleteOne({_id:id})
                await Comments.deleteOne({blogid:id})
                await BlogLike.deleteOne({blog_id:id})
                res.status(200).json({"Message":"blog deleted"})
            } 
        } catch (error) {
            res.status(400).json({"Error":error})
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

// generating token
function generateToken(id){
    const maxAge= 3*24*60*60
    return jwt.sign({id},"mavins",{expiresIn:maxAge})
}
// signup
const signUp = async(req,res)=>{
    const{error,value}= validateSignup(req.body)

if(!error){
    const username= req.body.username;
    const email= req.body.email;
    const password= req.body.password
    const auth=await Users.findOne({email:req.body.email})
    if(auth==null){
        const user= await Users.create({username:username,email:email, password:password})
        const token = generateToken(user._id)
        res.cookie('jwt',token,{httpOnly:true})

           res.status(200).json({
               "user":user,
               "token":token
           });
    }
    else{
        res.status(403).json({
            "Error":"The email has been used"
        })
    }
}
else{
    res.status(400).json({"error":error.details})
}
}

// login API
const login= async(req,res)=>{
    const {error,value} = validateLogin(req.body)
    if(!error){
             const email= req.body.email
            const password= req.body.password
        try {
            const user= await Users.findOne({email:email})
            if(user){

                if(user.email=="admin@gmail.com"){
                    const auth= await bcrypt.compare(password,user.password)
                    if(auth){
                        const token= generateToken(user._id)
                        const maxAge= 3*24*60*60;
                        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})

                        res.status(200).json({"Status":200,"Message":"Loged In As Admin","toke":token})

                    }else{
                        res.status(403).json({"Status":403,"Message":"Password is incorrect"})
                    }
                }
                else{
                    const auth= await bcrypt.compare(password,user.password)
                    if(auth){
                        const token= generateToken(user._id)
                        res.cookie('jwt',token,{httpOnly:true})

                        res.status(200).json({"Status":200,"Message":"Loged In As User","toke":token})
                    }else{
                        res.status(403).json({"Status":403,"Message":"Password is incorrect"})
                    }

                }
              
            }else{
                res.status(401).json({
                    "Status":"Error",
                     "Message":"Email does not exist"
            })
            }
          }
           catch (err) {
            res.status(402).json(err)
          }
    }else{
        res.status(400).json({"error":error})
    }
}

// add comments
const comments = async(req,res)=>{
 const{error,value} = validateCommnet(req.body)
 if(!error){
    const id= req.params.id
    const name=  res.locals.user.username
    const comment= req.body.comment

    const result= await Comments.create({blogid:id,name:name,comment:comment})
    await Blog.findById(id)
    .then((post)=>{
     post.comments.unshift(result)
     post.save()
     res.status(200).json({"Message":"comment Added","data":result._id})
    })
 }else{
    res.status(400).json({"error":error})
 }
}
// view comments
const viewComments= async(req,res)=>{
    await Comments.find().populate('replies')
    .then((data)=> {
        
        res.status(200).json({"message":data})})
}

// adding messages
const addMessages= async(req,res)=>{
const {error,value} = validateMessages(req.body)
if(!error){
    person= req.body.email
    subject= req.body.subject
    messageContent= req.body.message
 Message.create({email:person , heading:subject, message:messageContent})
    .then((data)=>{
        res.status(201).json({"message":"message ADDED","data":data})

    })
        // res.status(201).json({"message":"message ADDED"})
    }else{
        res.status(400).json({"error":error})
    }   
}
//deleting a message
const deleteMessage= async(req,res)=>{
    const id = req.params.id
        await Message.deleteOne({_id:id})

        res.status(201).json({"message":"message Deleted"})
    }

// view messages
const viewmessages= async(req,res)=>{
    await Message.find()
        .then((data)=> {
            res.status(200).json({"message":data})})
        // .then((data)=>{
        //     // res.render('home')
        // })
}
// log out API
const logout = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.status(200).json({"message":"Loged Out"})
}
// updating user info
const updateUser=  (req,res)=>{
    const id= req.params.id;
   
     Users.findByIdAndUpdate({_id:id},req.body,(err,data)=>{
      if(err){
        res.status(400).json({"error":"CAN NOT FIND THE USER ID"})
      }
      if(data){
        res.status(200).json({"message":"User Updated","data":data})
      }
     })
}
// toggle likes
const toggleLikes = (req,res)=>{
    const blog_id= req.params.id;
     Blog.findOne({_id:blog_id})
    .then((blog)=>{
        if(!blog){ cxvf 
            res.status(400).json({"message":"Blog not found !!"})
        }else{
            let currentUser= res.locals.user
            BlogLike.findOne({
                blog_id:blog_id,
                user_id:currentUser._id
            }).then(async(blog_like)=>{
                try{
                    if(!blog_like){
                        const result = await BlogLike.create({blog_id:blog_id,user_id:currentUser._id,impression:"Like"})
                        Blog.findOne({_id:blog_id})
                        .then(async(blog)=>{
                            blog.likes.unshift(result);
                            await blog.save()
                            res.status(200).json({"message":"Like Added"})
                        })
                        .catch((err)=>{
                            res.status(400).json({"Error":err})
    
                        })
                    }else{
                        if(blog_like.impression=="Like"){
                            await BlogLike.deleteOne({_id:blog_like._id})
                            await Blog.updateOne({_id:blog_like.blog_id},
                               {
                               $pull:{likes:blog_like._id}
                           })
                           res.status(200).json({"message":"Like Removed"})
                        }else{
                            await BlogLike.updateOne({_id:blog_like._id},
                                {
                                    $set:{impression:"Like"}
                                })
                                res.json("updated")
                        }
                        
                    }
                }catch(err){
                    res.status(400).json({"message":err})
                }
            })
            .catch((err)=>{
                res.status(400).json({"message":err})
            })

        }
    })
    .catch((err)=>{
        res.status(401).json({"message":err})
    }) 
}
const toggleDislike=(req,res)=>{
    const blog_id= req.params.id;
    Blog.findOne({_id:blog_id})
   .then((blog)=>{
       if(!blog){ cxvf 
           res.status(400).json({"message":"Blog not found !!"})
       }else{
           let currentUser= res.locals.user
           BlogLike.findOne({
               blog_id:blog_id,
               user_id:currentUser._id
           }).then(async(blog_like)=>{
               try{
                   if(!blog_like){
                       const result = await BlogLike.create({blog_id:blog_id,user_id:currentUser._id,impression:"Dislike"})
                       Blog.findOne({_id:blog_id})
                       .then(async(blog)=>{
                           blog.likes.unshift(result);
                           await blog.save()
                           res.status(200).json({"message":"Dislike Added"})
                       })
                       .catch((err)=>{
                           res.status(400).json({"Error":err})
   
                       })
                   }else{
                       if(blog_like.impression=="Dislike"){
                           await BlogLike.deleteOne({_id:blog_like._id})
                           await Blog.updateOne({_id:blog_like.blog_id},
                              {
                              $pull:{likes:blog_like._id}
                          })
                          res.status(200).json({"message":"Dislike Removed"})
                       }else{
                           await BlogLike.updateOne({_id:blog_like._id},
                               {
                                   $set:{impression:"Dislike"}
                               })
                               res.json("updated")
                       }
                   }
               }catch(err){
                   res.status(400).json({"message":err})
               }
           })
           .catch((err)=>{
               res.status(400).json({"message":err})
           })

       }
   })
   .catch((err)=>{
       res.status(401).json({"message":err})
   }) 
}
// deleting comment
const deleteComment = (req,res)=>{
    const comment_id= req.params.commentID
    const blog_id= req.params.blogID
    Comments.findOne({_id:comment_id})
    .then(async(comment)=>{
        try{
            if(!comment){
                res.status(400).json({"message":"Can not find the comment with this ID"})
            }
            else{
                await Comments.deleteOne({_id:comment_id})
                await Blog.updateOne({_id:blog_id},
                    {
                        $pull:{comments:comment_id}
                })
                    res.status(200).json({"Message":"Comment Deleted"})
            }
            }catch(err){
                    res.status(400).json({"message":err})
            }
     
    })  
}
//delete user
const deleteUser =async(req,res)=>{
    const id= req.params.id
        const result= await Users.findOne({_id:id})
        if(result){
            await Users.deleteOne({_id:id})
            res.status(200).json({"message":"user deleted"})
        }
        else{
            res.status(400).json({"error":"cant find the user"})
        }
}
// getting all users
const getUsers= async(req,res)=>{
        await Users.find()
            .then((data)=> res.status(200).json(data))
          
}
// reply on a comment
const reply= async(req,res)=>{
    const{error,value} = validateReply(req.body)
 if(!error){
    const id= req.params.id
    const name=  res.locals.user.username
    const reply= req.body.reply

    const result= await Replies.create({comment_id:id,name:name,reply:reply})
    await Comments.findById(id)
    .then((data)=>{
     data.replies.unshift(result)
     data.save()
     res.status(200).json({"Message":"Reply Added","data":result._id})
    })
 }else{
    res.status(400).json({"error":error})
 }
}
// saving a draft
const addDraft= async(req,res)=>{
const {error,value} = validateAddblog(req.body)
if(!error){

    const image= await cloudinary.uploader.upload(req.file.path)
    await Blog.create({title:req.body.title , body:req.body.body,imageUrl:{"id":image.public_id,"Url":image.url},category:"Draft"})
    .then((data)=>{
        res.status(201).json({"data":data,"message":"DRAFT ADDED"})
    })
}else{
    res.status(400).json({"error":error})
}        
}
// view all drafts
const viewDrafts= async(req,res)=>{
    await Blog.find({category:"Draft"})
        .then((data)=> res.status(200).json(data))
}
// deleting draft
const deleteDraft= (req,res)=>{
    const id= req.params.id;
    Blog.findOne({_id:id})
    .then(async(draft)=>{
        try {
            if(!draft){
                res.status(400).json({"error":"cant find the blog"})
            }else{
                await Blog.deleteOne({_id:id})
                res.status(200).json({"Message":"draft deleted"})
            } 
        } catch (error) {
            res.status(400).json({"Error":error})
        }

    })
}
// verifying admin
const viewAdmin=(req,res)=>{
    const name=res.locals.user
    res.json({name}) 
}

module.exports={
    viewBlog,
    singleBlog,
    updateBlog,
    addBlog,
    deleteBlog,
    sortedBlogs,
    viewAddblog,
    signUp,
    login,
    comments,
    addMessages,
    viewmessages,
    logout,
    updateUser,
    toggleLikes,
    deleteComment,
    deleteUser,
    deleteMessage,
    toggleDislike,
    getUsers,
    reply,
    viewComments,
    addDraft,
    viewDrafts,
    deleteDraft,
    viewAdmin,
}