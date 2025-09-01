const UserModel = require("../models/user.model")
const {validationResult} = require('express-validator') // external library
const bcrypt = require('bcrypt')

// Register logic
const UserRegister = async (req,res)=>{

    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render("user_register",{errorMessage:"Username,email,password and role required!"})
        }else{   
        const { username, email, password ,role} = req.body;
        const hashPassword = await bcrypt.hash(password,10) // for hash the password
        try {
            const [existingemail,existingUser] = await Promise.all([    // Database checking
                UserModel.findOne().where("email").equals(email),
                UserModel.findOne().where("username").equals(username)
            ])
            if(existingemail||existingUser){
                return res.render("user_register",{errorMessage:"Email or Username already in use"})
            }else{
            // Create a newUser if email and username is unique / not store in db
            const newUser = await UserModel.create({
                username,
                email,
                password:hashPassword,
                role:role,
            })
            if(newUser){
               return res.redirect("/user-login")
            }
            return res.render("user_register",{errorMessage:"user creation unsuccessful!"})
        }
        
        } catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
};

module.exports= UserRegister;