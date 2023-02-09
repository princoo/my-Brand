const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const blog_likes_schema = new Schema({

    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blogs"

    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
},{timestamps:true});
const blog_likes= mongoose.model('Bloglikes',blog_likes_schema)

module.exports=blog_likes