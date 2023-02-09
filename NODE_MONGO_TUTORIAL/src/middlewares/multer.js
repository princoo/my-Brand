const multer = require('multer');
const path = require('path');
const uploadFile = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== 'png') {
    cb(new Error('File not supported'), false);
    return;
  }
  cb(null, true);
};

const uploadMiddleware =
    multer({
        storage: uploadFile,
        fileFilter:fileFilter
      });


module.exports= uploadMiddleware