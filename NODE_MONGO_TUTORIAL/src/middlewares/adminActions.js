const jwtoken= require('jsonwebtoken')
const User= require('../models/usersmodule')


// jwt verification
const adminAction= (req,res,next)=>{
    const authHeader = req.headers.authentication;
    const token = authHeader && authHeader.split(' ')[1];    
    if(token){
        jwtoken.verify(token,'mavins',async(err,decodedtoken)=>{
            if(err){
                res.status(400).json({"message":err})

    // next()
            }
            if(decodedtoken){
                const data= await User.findById(decodedtoken.id)
                if(data){
                   if(data.email=="admin@gmail.com"){
                    next()
                   }
                   else{
                    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    res.status(400).json({"message":"Only Admin can perform this action"})
                   }

                }else{
                    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    res.status(400).json({"message":"user not found"})

                }
            }
        })
    }
    else{
        const cookieToken=req.cookies.jwt
        if(cookieToken){
            jwtoken.verify(cookieToken,'mavins',async(err,decodedtoken)=>{
                if(err){
                    res.status(400).json({"message":err})
        // next()
                }
                if(decodedtoken){
                    const data= await User.findById(decodedtoken.id)
                    if(data){
                       if(data.email=="admin@gmail.com"){
                        next()
                       }
                       else{
                        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        res.status(400).json({"message":"Only Admin can perform this action"})
                       }
    
                    }else{
                        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        res.status(400).json({"message":"user not found"})
    
                    }
                }
            })
        }else{
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(401).json({"message":"Log In first !!"})   
        }
 }
    
     }
     module.exports= adminAction