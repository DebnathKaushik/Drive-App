const express = require('express')
const router = express.Router()
const UserModel = require("../models/user.model")
const {body,validationResult} = require('express-validator') // 3rd Party middleware
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// User Routes rsgister
router.get("/register",(req,res)=>{
    res.render("register")
})

//3rd Party middleware for register
const body_MW_register =[
    body('username').trim().isLength({min:4}),
    body('email').trim().isEmail().isLength({min:4}),
    body('password').trim().isLength({min:4})
]

router.post("/register",body_MW_register ,async (req,res)=>{

    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array(),message:"Invalid"})
        }else{   
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password,10) // for hash the password
        try {
            // Check if the email and username already exists in the database
            const[existingemail,existingUser] = await Promise.all([
                UserModel.findOne({email}),
                UserModel.findOne({username})
            ])
            if (existingUser || existingemail) {
                return res.status(400).json({ message: "Email  Or Username already in use" });
            }else{
            // Create a new user if email is unique
            const newUser = await UserModel.create({
                username,
                email,
                password:hashPassword
            })
             return res.status(201).json(newUser);
            }
        
        } catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
});


// Login here
router.get("/login",(req,res)=>{
    res.render("login")
})

//3rd Party middleware for login
const body_MW_login =[
    body('username').trim().isLength({min:4}),
    body('password').trim().isLength({min:4})
]
router.post("/login",body_MW_login, async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            meassage:"Username or Password must be 4 charecter!"
        })
    }else{
        const {username,password} = req.body
        try{
            const existUser = await UserModel.findOne({
                username:username
            })
            if(!existUser){
                return res.status(400).json({
                    errors:errors.array(),
                    meassage:"Username or password is incorrect"
                })
            }else{
                const checkPassword = await bcrypt.compare(password,existUser.password) // here "user found" and check password valid or not

                if(!checkPassword){
                    return res.status(400).json({
                        errors:errors.array(),
                        meassage:"Username or password is incorrect"
                    })
                }else{
                    const token = await jwt.sign({      // Create token for valid user(Pass)
                        userId : existUser._id,
                        username : existUser.username,
                        email : existUser.email
                        
                    }, process.env.JWT_SECRET)  // JWT secret
                
                    res.cookie("token",token)    // Save token in Browser Cookie 
                    res.send("User Logged in!")
                }
                
            }
 
        }catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
})







module.exports = router