const mongoose= require('mongoose')
const Schema= mongoose.Schema;
const bcrypt= require('bcrypt')

const userschema = new Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
// hashing password
userschema.pre('save', async function(next){
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password, salt)
    next()
})
// checking credentials


const Users= mongoose.model('Users',userschema)

module.exports=Users