const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const router = express.Router()

// const title = "abhay.png"
// let ext = path.extname(title)
// let bas = path.basename(title,ext)
// console.log(bas)


const {Login,Logout} = require("../middleware/user-middle")
const {adminLogin,adminLogout} = require("../middleware/admin-middle")
const {userModel,artistModel,uploadModel,sliderModel,categoryModel} = require("../models/user-model")
const {userMulter} = require("../multer/multer")

router.get("/likes",Logout,async (req,res)=>{
    if(req.session.user){
        const userFind = await userModel.findById(req.session.user._id)
        const songFind = await uploadModel.findById(req.query.like)
        if(songFind.likes.indexOf(userFind._id) == -1){
            songFind.likes.push(userFind._id)
        }else{
            songFind.likes.splice(userFind._id,1)
        }
        await songFind.save()
        res.redirect(`/play?v=${req.query.like}`)
    }
})

router.get("/",Login,(req,res)=>{
    res.render("login")
})
router.get("/deshboard",Logout,async (req,res)=>{
    if(req.session.user){
        const user = await userModel.findById(req.session.user._id);
        const songs = await uploadModel.find();
        const allSliders = await sliderModel.find();
        const allCategory = await categoryModel.find().populate("songid").populate("artistid");
        res.render("index",{songs,user,allSliders,allCategory})
    }
})
router.get("/play",Logout,async (req,res)=>{
    if(req.session.user){
        const user = await userModel.findById(req.session.user._id);
        const songFind = await uploadModel.findById(req.query.v).populate("artistid")
        const songs = await uploadModel.find();
        const allCategory = await categoryModel.find().populate("songid").populate("artistid");
        res.render("play",{songFind,user,songs,allCategory})
    }
})

router.post("/signup",Login,async (req,res)=>{
    const {name,username,email,password} = req.body
    const userFind = await userModel.findOne({email})
    if(!userFind){
        if(username && email && password){
            const passHash = await bcrypt.hash(password,10);
            const userData = await userModel.create({name,username,email,password:passHash})
            req.session.user = userData
            res.redirect("/deshboard")
        }else{
            res.send({error:"all feild required"})
        }
    }else{
        res.send({error:"user allready! register"})
    }
})

router.post("/signin",Login,async (req,res)=>{
    const {email,password} = req.body
    const userFind = await userModel.findOne({email})
    if(userFind != null){
        if(email && password){
            const passHash = await bcrypt.compare(password,userFind.password)
            if(userFind.email == email && passHash){
                req.session.user = userFind
                res.redirect("/deshboard")
            }else{
                res.send({error:"email & password mismatch"})
            }
        }else{
            res.send({error:"all feild required"})
        }
    }else{
        res.send({error:"user not register"})
    }
})


router.get("/logout",adminLogout,async (req,res)=>{
    if(req.session.user){
        req.session.destroy((error)=>{
            if(!error){
                res.redirect("/")
            }else{
                res.redirect("/")
            }
        })
    }
})


module.exports = router