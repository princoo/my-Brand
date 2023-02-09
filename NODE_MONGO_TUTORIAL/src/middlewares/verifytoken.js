const jwtoken= require('jsonwebtoken')


// jwt verification
const verification= (req,res,next)=>{
    const token = req.cookies.jwt
    
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
        res.status(401).json({"Message":"Please Login First !!!"})
    }
    
     }
     module.exports= {verification}