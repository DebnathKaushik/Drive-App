const express = require('express')
const router = express.Router()
const UserModel = require("../models/user.model")
const {body,validationResult} = require('express-validator') // 3rd Party middleware


// User Routes 
router.get("/register",(req,res)=>{
    res.render("register")
})
router.post("/register", async (req,res,next)=>{
    body('email').trim().isEmail().isLength({min:4}),
    body('username').trim().isLength({min:4}),
    body('password').trim().isLength({min:4})

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.send(errors)
    }
        
    const {username,email,password} = req.body

        const newuser = await UserModel.create({
            "username":username,
            "email":email,
            "password":password
        })
        
    next(newuser)
},(req,res)=>{
    res.json(newuser)
})






module.exports = router