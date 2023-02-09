const express= require('express')
const{connect,close} = require('./src/configs/database')
// const mongoose= require('mongoose')
const cookieparser= require('cookie-parser')
const upload= require('./src/configs/multer')
const blogRoutes= require('./src/routes/blogroutes')
const Image= require('../NODE_MONGO_TUTORIAL/src/models/imagemodel')
const cloudinary= require('./src/configs/cloudinary')
const verifyUser = require('./src/middlewares/verifyuser')
const passportSetup= require('./src/configs/passport')

const app= express()
connect("CHALLENGE")
const server= app.listen(3000,()=>{
    console.log("server connected")
   })

app.use( express.static( "public" ) );
app.set('view engine','ejs')
app.use(express.json())
app.use(cookieparser())

app.all('*',verifyUser)
app.use('',blogRoutes)
module.exports= server

