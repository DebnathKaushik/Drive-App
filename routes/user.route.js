const express = require('express')
const router = express.Router()
const UserModel = require("../models/user.model")
const {body,validationResult} = require('express-validator') // 3rd Party middleware


// User Routes 
router.get("/register",(req,res)=>{
    res.render("register")
})

//3rd Party middleware
const bodyMiddleware =[
    body('username').trim().isLength({min:4}),
    body('email').trim().isEmail().isLength({min:4}),
    body('password').trim().isLength({min:4})
]

router.post("/register",bodyMiddleware ,async (req,res)=>{

    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array(),message:"Invalid"})
        }else{   
        const { username, email, password } = req.body;
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
            const newUser = await UserModel.create({username,email,password});
                return res.status(201).json(newUser);
            }
        
        } catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
});







module.exports = router