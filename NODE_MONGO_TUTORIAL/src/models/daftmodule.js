const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const draftschema = new Schema({

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

},{timestamps:true});
const drafts= mongoose.model('Drafts',draftschema)

module.exports=drafts