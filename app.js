require("dotenv").config()
const express = require('express')
const bodyParser = require("body-parser")
const session = require("express-session")
const adminSession = require("express-session")
const path = require("path")

const app = express()

const router = require("./routers/user-router")
const adminRouter = require("./routers/admin-router")
const Mongoose = require("./config/db")
Mongoose(process.env.DATABASE_URL)

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(session({name:"userSession",secret:process.env.SESSION_NAME,resave:false,saveUninitialized:false,cookie:{maxAge:1000*60*60*24}}))
app.use(adminSession({name:"adminSession",secret:process.env.SESSION_ADMIN_NAME,resave:false,saveUninitialized:false,cookie:{maxAge:1000*60*60*24,httpOnly:true}}))



app.use("",router)
app.use("/admin",adminRouter)
app.use("",(req,res)=>{
    res.send("Page not found")
})


app.listen(process.env.PORT,()=>{
    console.log("listening on port http://localhost:"+process.env.PORT)
})