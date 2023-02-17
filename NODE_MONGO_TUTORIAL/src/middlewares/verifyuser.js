const jwtoken= require('jsonwebtoken')
const User= require('../models/usersmodule')


// jwt verification
const verifyUser= (req,res,next)=>{
    // const token = req.cookies.jwt
    const authHeader = req.headers.authentication;
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwtoken.verify(token,'mavins',async(err,decodedtoken)=>{
            if(err){

    next()
            }
            if(decodedtoken){
                const data= await User.findById(decodedtoken.id)
                if(data){
                    res.locals.user= data
                    next()

                }else{
                    next()
                    // res.json({"message":"user not found"})

                }
            }
        })
    
    }else{
        next() 
 }
    
     }
     module.exports= verifyUser