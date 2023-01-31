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
    }
})
const blogs= mongoose.model('Blogs',blogschema)

module.exports=blogs