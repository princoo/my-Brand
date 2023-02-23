const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const blogschema = new Schema({

    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    imageUrl:{
        type:Object,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Bloglikes"
    }],
    category:{
        type:String,
        required:true,
    }
},{timestamps:true});
const blogs= mongoose.model('Blogs',blogschema)

module.exports=blogs