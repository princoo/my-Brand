const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const imageschema = new Schema({

    url:{
        type:String,
        required:true
    },
})
const img= mongoose.model('images',imageschema)

module.exports=img