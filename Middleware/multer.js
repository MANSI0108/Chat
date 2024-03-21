const multer = require('multer')
const path = require("path")

const pathname = path.join(__dirname,'../Public/images')
const storage =  multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,pathname)
    },
    filename:function(req,file,cb){

        return cb(null,`${Date.now()}-${file.originalname}`);
    }

})

const upload= multer({storage})

module.exports = upload    