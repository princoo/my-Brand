const jwtoken= require('jsonwebtoken')


// jwt verification
const verification= (req,res,next)=>{
    const authHeader = req.headers.authentication;
    const token = authHeader && authHeader.split(' ')[1];
    if(token){
        jwtoken.verify(token,'mavins',(err,decodedtoken)=>{
            if(err){
                res.status(401).json({"Error":"Please Login First !!!"})
            }
            if(decodedtoken){
                 next()
            }
        })
    
    }else{
        const cookieToken=req.cookies.jwt
        if(cookieToken){
            jwtoken.verify(cookieToken,'mavins',(err,decodedtoken)=>{
                if(err){
                    res.status(401).json({"Error":"Please Login First !!!"})
                }
                if(decodedtoken){
                     next()
                }
            })
        }else{
        res.status(401).json({"Message":"Please Login Firstii !!!"})
        }
    }
    
     }
     module.exports= {verification}