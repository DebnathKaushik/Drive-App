const UserModel = require("../models/user.model")
const {validationResult} = require('express-validator') // external library
const bcrypt = require('bcrypt')

// Register logic
const UserRegister = async (req,res)=>{

    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Invalid credentials / username,pass,email and role are required !"})
        }else{   
        const { username, email, password ,role} = req.body;
        const hashPassword = await bcrypt.hash(password,10) // for hash the password
        try {
            const [existingemail,existingUser] = await Promise.all([    // Database checking
                UserModel.findOne().where("email").equals(email),
                UserModel.findOne().where("username").equals(username)
            ])
            if(existingemail||existingUser){
                return res.status(400).send("Email or Username already in use")
            }else{
            // Create a newUser if email and username is unique
            const newUser = await UserModel.create({
                username,
                email,
                password:hashPassword,
                role:role,
            })
            if(newUser){
               return res.redirect("/user-login")
            }
             return res.send("user creation unsuccessful!");
        }
        
        } catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
};

module.exports= UserRegister;