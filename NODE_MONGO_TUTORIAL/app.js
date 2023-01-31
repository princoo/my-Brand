const express= require('express')
const mongoose= require('mongoose')
const blogRoutes= require('./src/routes/blogroutes')
const app= express()


mongoose.connect('mongodb://127.0.0.1:27017/CHALLENGE')
.then(()=>{
    console.log("database connected")
   app.listen(3000,()=>{
    console.log("server connected")
   })
})
app.use(express.json())
app.use('',blogRoutes)
