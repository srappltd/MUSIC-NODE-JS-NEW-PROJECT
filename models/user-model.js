const mongoose = require("mongoose")

const date = new Date().toLocaleDateString()
const time = new Date().toLocaleTimeString()


// user models
const userSchema = new mongoose.Schema({
    picture:{type:String,default:""},
    name:{type:String,default:""},
    username:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,default:""},
    password:{type:String,required:true},
    join:{type:String,default:date},
    time:{type:String,default:time},
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
    playlist:[{type:mongoose.Schema.Types.ObjectId,ref:"uploads"}],
},{timestamps:true})
const userModel = mongoose.model("users",userSchema)

// admin models
const adminSchema = new mongoose.Schema({
    picture:{type:String,default:""},
    name:{type:String,default:""},
    username:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,default:""},
    password:{type:String,required:true},
    join:{type:String,default:date},
    time:{type:String,default:time},
    playlist:[{type:mongoose.Schema.Types.ObjectId,ref:"uploads"}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"uploads"}],
},{timestamps:true})
const adminModel = mongoose.model("admin",adminSchema)


// upload models
const uploadSchema = new mongoose.Schema({
    url:{type:String,required:true},
    poster:{type:String,required:true},
    title:{type:String,required:true},
    des:{type:String,default:""},
    date:{type:String,default:date},
    time:{type:String,default:time},
    size:{type:String,required:true},
    views:{type:Number,default:0},
    duration:{type:Number,default:0},
    types:{type:String,default:"song"},
    categoryid:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    artistid:{type:mongoose.Schema.Types.ObjectId,ref:"artists"},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
    adminid:{type:mongoose.Schema.Types.ObjectId,ref:"admin"},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
},{timestamps:true})
const uploadModel = mongoose.model("uploads",uploadSchema)

// artist models
const artistSchema = new mongoose.Schema({
    picture:{type:String,required:true},
    name:{type:String,required:true},
    date:{type:String,default:date},
    time:{type:String,default:time},
    types:{type:String,default:"artist"},
    adminid:{type:mongoose.Schema.Types.ObjectId,ref:"admin"},
    playlist:[{type:mongoose.Schema.Types.ObjectId,ref:"uploads"}],
    follower:[{type:mongoose.Schema.Types.ObjectId,ref:"uploads"}],
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
},{timestamps:true})
const artistModel = mongoose.model("artists",artistSchema)// artist models

// slider
const sliderSchema = new mongoose.Schema({
    picture:{type:String,required:true},
    name:{type:String,required:true},
    date:{type:String,default:date},
    time:{type:String,default:time},
    adminid:{type:mongoose.Schema.Types.ObjectId,ref:"admin"}
},{timestamps:true})
const sliderModel = mongoose.model("sliders",sliderSchema)

// category model
const categorySchema = new mongoose.Schema({
    title:{type:String,required:true},
    picture:{type:String,required:true},
    date:{type:String,default:date},
    time:{type:String,default:time},
    adminid:{type:mongoose.Schema.Types.ObjectId,ref:"admin"},
    songid:[{type:mongoose.Schema.Types.ObjectId,ref:"uploads"}],
    artistid:[{type:mongoose.Schema.Types.ObjectId,ref:"artists"}],
},{timestamps:true})
const categoryModel = mongoose.model("category",categorySchema)

module.exports = {userModel,uploadModel,artistModel,adminModel,sliderModel,categoryModel}