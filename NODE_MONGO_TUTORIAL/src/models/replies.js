const { string } = require('joi');
const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const replyschema = new Schema({
    comment_id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    reply:{
        type:String,
        required:true
    },

})
const Replies= mongoose.model('Replies',replyschema)

module.exports=Replies