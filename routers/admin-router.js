const express = require("express")
const bcrypt = require("bcrypt")
const {getAudioDurationInSeconds} = require("get-audio-duration")
const path = require("path")
const fs = require("fs")
const adminRotuter = express.Router()

const {adminLogin,adminLogout} = require("../middleware/admin-middle")
const {adminMulter,albumMulter,artistMulter,categoryMulter,uploadMulter,sliderMulter} = require("../multer/multer")
const {adminModel,userModel,uploadModel,artistModel,sliderModel,categoryModel} = require("../models/user-model")

// login page route
adminRotuter.get("/",adminLogin,(req,res)=>{
    res.render("admin")
})

// deshboard route
adminRotuter.get("/admin-deshboard",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        const allUsers = await userModel.find();
        const allSongs = await uploadModel.find().populate("artistid");
        const allArtists = await artistModel.find();
        const allSliders = await sliderModel.find();
        const allCategorys = await categoryModel.find();
        res.render("admin-deshboard",{allUsers,user,allSongs,allArtists,allSliders,allCategorys})
    }
})

// users route
adminRotuter.get("/admin-users",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        const allUsers = await userModel.find();
        res.render("admin-users",{allUsers,user})
    }
})

// artist route
adminRotuter.get("/admin-artist",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        const allUsers = await userModel.find();
        const allSongs = await uploadModel.find().populate("artistid");
        const allArtists = await artistModel.find();
        const allSliders = await sliderModel.find();
        const allCategorys = await categoryModel.find();
        res.render("admin-artist",{allUsers,user,allSongs,allArtists,allSliders,allCategorys})
    }
})
adminRotuter.post("/artist",adminLogout,artistMulter.single("category-url"),async (req,res)=>{
    if(req.session.admin){
        const {name,categoryname} = req.body
        const adminFind = await adminModel.findById(req.session.admin._id)
        const categoryFind = await categoryModel.findById(categoryname)
        const adminData = await artistModel.create({name,adminid:adminFind._id,picture:req.file.filename})
        categoryFind.artistid.push(adminData._id)
        await categoryFind.save()
        res.redirect("/admin/admin-artist")
    }
});

// album route
adminRotuter.get("/admin-album",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        const allUsers = await userModel.find();
        const allSongs = await uploadModel.find().populate("artistid");
        const allArtists = await artistModel.find();
        const allSliders = await sliderModel.find();
        const allCategorys = await categoryModel.find();
        res.render("admin-album",{allUsers,user,allSongs,allArtists,allSliders,allCategorys})
    }
})

// category route
adminRotuter.get("/admin-category",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        const allUsers = await userModel.find();
        const allSongs = await uploadModel.find().populate("artistid");
        const allArtists = await artistModel.find();
        const allSliders = await sliderModel.find();
        const allCategorys = await categoryModel.find();
        res.render("admin-category",{allUsers,user,allSongs,allArtists,allSliders,allCategorys})
    }
})
adminRotuter.post("/category",adminLogout,categoryMulter.single("category"),async (req,res)=>{
    if(req.session.admin){
        const {title} = req.body
        const adminFind = adminModel.findById(req.session.admin._id)
        await categoryModel.create({title,picture:req.file.filename,adminid:adminFind._id})
        res.redirect("/admin/admin-category")

    }
})
adminRotuter.get("/category-delete",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const categoryFind = await categoryModel.findById(req.query.c)
        fs.unlink(`public/admin/category/${categoryFind.picture}`,async (error)=>{
            if(!error){
                await categoryModel.deleteOne({_id:req.query.c})
                res.redirect("/admin/admin-category")
            }
        })
    }
})

// slider route
adminRotuter.get("/admin-sliders",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        const allUsers = await userModel.find();
        const allSongs = await uploadModel.find().populate("artistid");
        const allArtists = await artistModel.find();
        const allSliders = await sliderModel.find();
        const allCategorys = await categoryModel.find();
        res.render("admin-sliders",{allUsers,user,allSongs,allArtists,allSliders,allCategorys})
    }
})
adminRotuter.post("/slider",adminLogout,sliderMulter.single("slider"),async (req,res)=>{
    if(req.session.admin){
        const {name} = req.body
        const adminFind = await adminModel.findById(req.session.admin._id)
        const adminData = await sliderModel.create({name,adminid:adminFind._id,picture:req.file.filename})
        res.redirect("/admin/admin-sliders")
    }
})
adminRotuter.get("/slider-del",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const sliderFind = await sliderModel.findById(req.query.s)
        fs.unlink(`public/admin/slider/${sliderFind.picture}`,async (error)=>{
            if(!error){
                await sliderModel.deleteOne({_id:req.query.s})
                res.redirect("/admin/admin-sliders")
            }
        })
    }
})
adminRotuter.get("/slider",async (req,res)=>{
    const adminData = await sliderModel.find()
    res.json(adminData)
})

// notification route
adminRotuter.get("/admin-notification",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        res.render("admin-notification",{user})
    }
})
// setting route
adminRotuter.get("/admin-setting",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        res.render("admin-setting",{user})
    }
})
// songs route
adminRotuter.get("/admin-songs",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        const allUsers = await userModel.find();
        const allSongs = await uploadModel.find().populate("artistid");
        const allArtists = await artistModel.find();
        const allSliders = await sliderModel.find();
        const allCategorys = await categoryModel.find();
        res.render("admin-songs",{allUsers,user,allSongs,allArtists,allSliders,allCategorys})
    }
})
adminRotuter.post("/song",adminLogout,uploadMulter.fields([{name:"url"},{name:"poster"}]),async (req,res)=>{
    if(req.session.admin){
        const {title,artistname,categoryname} = req.body
        const adminFind = await adminModel.findById(req.session.admin._id)
        const categoryFind = await categoryModel.findById(categoryname)
        if(title && artistname){
            let ext = path.extname(title)
            let bas = path.basename(title,ext)
            const post = await uploadModel.create({title:bas,url:req.files["url"][0].filename,poster:req.files["poster"][0].filename,size:req.files["url"][0].size,adminid:adminFind._id,artistid:artistname,categoryid:categoryname})
            const Duration = await getAudioDurationInSeconds(`public/uploads/${post.url}`)
            post.duration = Duration.toPrecision(2)
            adminFind.posts.push(post)
            categoryFind.songid.push(post)
            await post.save()
            await adminFind.save()
            await categoryFind.save()
            res.redirect("/admin/admin-songs")
        }else{
            res.send({error:"all feild required"})
        }
    }
})
adminRotuter.get("/songdelete/:songid",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const adminFind = await adminModel.findById(req.session.admin._id)
        const songFind = await uploadModel.findById(req.params.songid).populate("categoryid")
        const categoryFind = await categoryModel.findById(songFind.categoryid._id)
        fs.unlink(`public/uploads/${songFind.url}`,async (error)=>{
            if(!error){
                fs.unlink(`public/uploads/${songFind.poster}`,async (error)=>{
                    if(!error){
                        await uploadModel.deleteOne({_id:req.params.songid})
                        adminFind.posts.splice(req.params.songid,1)
                        categoryFind.songid.splice(req.params.songid,1)
                        await adminFind.save()
                        await categoryFind.save()
                        res.redirect("/admin/admin-songs")
                    }
                })
            }
        })
        
    }
})

// comments route
adminRotuter.get("/admin-comments",adminLogout,async (req,res)=>{
    if(req.session.admin){
        const user = await adminModel.findById(req.session.admin._id);
        res.render("admin-comments",{user})
    }
})


// login, signup,logout routes
adminRotuter.post("/admin-signup",adminLogin,async (req,res)=>{
    const {username,email,password} = req.body
    const adminFind = await adminModel.findOne({email})
    if(!adminFind){
        if(username && email && password){
            const passHash = await bcrypt.hash(password,10);
            const adminData = await adminModel.create({username,email,password:passHash})
            req.session.admin = adminData
            res.redirect("/admin/admin-deshboard")
        }else{
            res.send({error:"all feild required"})
        }
    }else{
        res.send({error:"admin allready! register"})
    }
})
adminRotuter.post("/admin-signin",adminLogin,async (req,res)=>{
    const {email,password} = req.body
    const adminFind = await adminModel.findOne({email})
    if(adminFind != null){
        if(email && password){
            const passHash = await bcrypt.compare(password,adminFind.password)
            if(adminFind.email == email && passHash){
                req.session.admin = adminFind
                res.redirect("/admin/admin-deshboard")
            }else{
                res.send({error:"email & password mismatch"})
            }
        }else{
            res.send({error:"all feild required"})
        }
    }else{
        res.send({error:"Admin not register"})
    }
})
adminRotuter.get("/admin-logout",adminLogout,async (req,res)=>{
    if(req.session.admin){
        req.session.destroy((error)=>{
            if(!error){
                res.redirect("/admin")
            }else{
                res.redirect("/admin")
            }
        })
    }
})

module.exports = adminRotuter