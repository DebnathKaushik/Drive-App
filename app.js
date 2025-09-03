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
const uploadImageUser = require('./routes/uploadImage.route')
const deleteuserbyAdmin = require('./routes/delete.user.route')
const updateuserbyAdmin = require("./routes/update.user.route")
const adduserbyAdmin = require('./routes/admin.add.user.route')
const app = express()

const methodOverrride = require("method-override")





// ejs setting
app.set("view engine","ejs") 
//json middleware
app.use(cookieParser())
app.use(express.json())   // for use req.body
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static("uploads"))

// method override for patch and delete cause in html only supports post and get 
app.use(methodOverrride('_method'))





// route set for User
app.use("/",userRouter)

//route set for Indexpage
app.use("/",indexRouter)

//route set for Homepage
app.use("/",homeRouter)

//route set for logout
app.use("/",LogoutRouter)

//route set for ImageUpload(admin)
app.use("/",uploadImageUser)

//route set for admin -> delete User
app.use("/",deleteuserbyAdmin)

//route set for admin -> Update User
app.use("/",updateuserbyAdmin)

//route set for admin -> Add User
app.use("/",adduserbyAdmin)





// Server listen
app.listen(7000,()=>{
    console.log(`Server listen on port: ${7000}`);
})

