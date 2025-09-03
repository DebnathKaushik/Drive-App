const UserModel = require("../models/user.model")
const {validationResult} = require('express-validator') // external library
const bcrypt = require('bcrypt')

// Register logic
const UserRegisterbyAdmin = async (req,res)=>{

    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render("admin_add_user",{
                errorMessage:"Username,email,password and role required!",
                username:req.params.username,
            })
        }else{   
        const { username, email, password ,role} = req.body;
        const hashPassword = await bcrypt.hash(password,10) // for hash the password
        try {
            const [existingemail,existingUser] = await Promise.all([    // Database checking
                UserModel.findOne().where("email").equals(email),
                UserModel.findOne().where("username").equals(username)
            ])
            if(existingemail||existingUser){
                return res.render("admin_add_user",{
                    errorMessage:"Email or Username already in use",
                    username:req.params.username,
                })
            }else{

                if(role === "admin"){
                    return res.render("admin_add_user",{
                        errorMessage:`Admin cannot create Admin!`,
                        username:req.params.username,
                    })
                }
            // Create a newUser if email and username is unique / not store in db
            const newUser = await UserModel.create({
                username,
                email,
                password:hashPassword,
                role:role,
            })
            if(newUser){
               return res.redirect(`/admin/${req.params.username}`)
            }
            return res.render("admin_add_user",{
                errorMessage:"user creation unsuccessful!",
                username:req.params.username,
            })
        }
        
        } catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
};

module.exports= UserRegisterbyAdmin;