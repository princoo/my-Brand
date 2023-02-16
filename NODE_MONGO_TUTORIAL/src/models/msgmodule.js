const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const msgschema = new Schema({

    email:{
        type:String,
        required:true
    },
    heading:{
        type: String,
        required: true
    },
    message:{
        type:String,
        required:true
    },
},{timestamps:true});
const messages= mongoose.model('messages',msgschema)

module.exports=messages