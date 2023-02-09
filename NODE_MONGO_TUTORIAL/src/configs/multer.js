const { error } = require('console');
const multer= require('multer')
const path= require('path')

const uploadfile= multer.diskStorage({})
const push= 
    multer({
        storage:uploadfile,
        fileFilter:(req,file,cb)=>{
            let ext= path.extname(file.originalname);
            if(ext !=".jpg" && ext !=".jpeg" && ext !="png"){
                cb(new Error("PLEASE ONLY CHOOSE IMAGE"),false)
                return;
            }
            cb(null,true)
        }
    })
   

   

      
     
      
      
      
module.exports= push;
