const express = require('express')
const userRouter = require('./routes/user.route')
const dotenv = require('dotenv')
dotenv.config()
const dbconnection = require('./config/db')
dbconnection()
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.route')
const homeRouter = require('./routes/home.route')
const LogoutRouter = require('./routes/logout.route')

const app = express()





// ejs setting
app.set("view engine","ejs") 
//json middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))





// route set for User
app.use("/",userRouter)

//route set for Indexpage
app.use("/",indexRouter)

//route set for Homepage
app.use("/",homeRouter)

//route set for logout
app.use("/",LogoutRouter)















// Server listen
app.listen(3000,()=>{
    console.log(`Server listen on port: ${3000}`);
})