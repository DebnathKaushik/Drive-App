const express = require('express')
const router = express.Router()
const {body} = require('express-validator') // external libary
const UserRegister = require("../Controllers/user.register")
const UserLogin = require("../Controllers/user.login")
const notify = require("../Controllers/notification.channel")


//Get//User//Register 
router.get("/user-register",(req,res)=>{
     // render user_register.ejs
    res.render("user_register")
})
// validation(express validation library)
const body_MW_register =[
    body('username').trim().isLength({min:4}),
    body('email').trim().isEmail().isLength({min:4}),
    body('password').trim().isLength({min:4}),
    body('role').trim().notEmpty().withMessage("Role is Required"),
]
// Post//User//Register 
router.post("/user-register",body_MW_register,UserRegister);



// Get//User//login
router.get("/user-login",(req,res)=>{
    // render user_login.ejs
    res.render("user_login")  
})
// validation(express validation library)
const body_MW_login =[
    body('username').trim().isLength({min:4}),
    body('password').trim().isLength({min:4}),
    body('role').trim().notEmpty().withMessage("Role is Required"),
]
// Post//User//Login 
router.post("/user-login",body_MW_login,UserLogin)




// post//trigger-notification
router.post("/trigger-notification", notify);


module.exports = router