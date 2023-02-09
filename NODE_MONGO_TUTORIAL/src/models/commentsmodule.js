const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const commentschema = new Schema({

    blogid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})
const Comment= mongoose.model('Comments',commentschema)

module.exports=Comment