const express = require('express')
const userRouter = require('./routes/user.route')
const dotenv = require('dotenv')
dotenv.config()
const dbconnection = require('./config/db')
dbconnection()
const cookieParser = require('cookie-parser')
const homeRouter = require('./routes/home.route')

const app = express()

//env file config



// ejs setting
app.set("view engine","ejs") 
//json middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// route set for User
app.use("/",userRouter)

//route set for Homepage
app.use("/",homeRouter)


// Server listen
app.listen(3000,()=>{
    console.log(`Server listen on port: ${3000}`);
})