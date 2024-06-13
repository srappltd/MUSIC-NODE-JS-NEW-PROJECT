const multer = require("multer")
const path = require("path")
const {v4:uuid} = require("uuid")

// user multer
const userMulter = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/profile-img')
        },
        filename:(req,file,cb)=>{
            cb(null,uuid()+path.extname(file.originalname))
        }
    }),
    fileFilter:(req,file,cb)=>{
        const types = path.extname(file.originalname).toLowerCase();
        if(types == ".jpg" || types == ".png" || types == ".gif",types == ".jpeg"){
            return cb(null,true)
        }else{
            return cb(new Error("Invalid file type",false))
        }
    },
    limits:{fileSize:3*1024*1024}
})
// admin multer
const adminMulter = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/admin/admin-img')
        },
        filename:(req,file,cb)=>{
            cb(null,uuid()+path.extname(file.originalname))
        }
    }),
    fileFilter:(req,file,cb)=>{
        const types = path.extname(file.originalname).toLowerCase();
        if(types == ".jpg" || types == ".png" || types == ".gif",types == ".jpeg"){
            return cb(null,true)
        }else{
            return cb(new Error("Invalid file type",false))
        }
    },
    limits:{fileSize:3*1024*1024}
})
// artist multer
const artistMulter = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/admin/artists')
        },
        filename:(req,file,cb)=>{
            cb(null,uuid()+path.extname(file.originalname))
        }
    }),
    fileFilter:(req,file,cb)=>{
        const types = path.extname(file.originalname).toLowerCase();
        if(types == ".jpg" || types == ".png" || types == ".gif" || types == ".jpeg"){
            return cb(null,true)
        }else{
            return cb(new Error("Invalid file type",false))
        }
    },
    limits:{fileSize:3*1024*1024}
})
// album multer
const albumMulter = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/admin/album')
        },
        filename:(req,file,cb)=>{
            cb(null,uuid()+path.extname(file.originalname))
        }
    }),
    fileFilter:(req,file,cb)=>{
        const types = path.extname(file.originalname).toLowerCase();
        if(types == ".jpg" || types == ".png" || types == ".gif",types == ".jpeg"){
            return cb(null,true)
        }else{
            return cb(new Error("Invalid file type",false))
        }
    },
    limits:{fileSize:3*1024*1024}
})
// category multer
const categoryMulter = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/admin/category')
        },
        filename:(req,file,cb)=>{
            cb(null,uuid()+path.extname(file.originalname))
        }
    }),
    fileFilter:(req,file,cb)=>{
        const types = path.extname(file.originalname).toLowerCase();
        if(types == ".jpg" || types == ".png" || types == ".gif" || types == ".jpeg" || types == ".webp"){
            return cb(null,true)
        }else{
            return cb(new Error("Invalid file type",false))
        }
    },
    limits:{fileSize:3*1024*1024}
})
// slider multer
const sliderMulter = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            return cb(null,'public/admin/slider')
        },
        filename:(req,file,cb)=>{
            return cb(null,uuid()+path.extname(file.originalname))
        }
    }),
    fileFilter:(req,file,cb)=>{
        const types = path.extname(file.originalname).toLowerCase();
        if(types == ".jpg" || types == ".png" || types == ".gif",types == ".jpeg" || types == ".webp"){
            return cb(null,true)
        }else{
            return cb(new Error("Invalid file type",false))
        }
    },
    limits:{fileSize:3*1024*1024}
})
// upload multer
const uploadMulter = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/uploads')
        },
        filename:(req,file,cb)=>{
            cb(null,uuid()+path.extname(file.originalname))
        }
    }),
    fileFilter:(req,file,cb)=>{
        const types = path.extname(file.originalname).toLowerCase();
        if(types == ".mp3" || types ==".png" || types == ".jpg"){
            return cb(null,true)
        }else{
            return cb(new Error("Invalid file type",false))
        }
    },
    limits:{fileSize:20*1024*1024}
})

module.exports = {adminMulter,userMulter,albumMulter,artistMulter,categoryMulter,uploadMulter,sliderMulter}