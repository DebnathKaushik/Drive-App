const UserModel = require("../models/user.model")
const {validationResult} = require('express-validator') // external libary
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Login Logic
const UserLogin = async (req,res)=>{
const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            //errors:errors.array(),
            meassage:"Username, Password and role required(validation)"
        })
    }

const {username,password,role} = req.body
try{
    const existUser = await UserModel.findOne().where("username").equals(username)  
    if(!existUser){
        return res.status(400).send("Username or password is invalid")
    }

    const checkPassword = await bcrypt.compare(password,existUser.password) // here "user found" and check password valid or not                                                                     // existUser.password (the hashed password stored in the database)
    if(!checkPassword){
        return res.status(400).send("Username or password is invalid")
    }

    if(existUser.role != role){
         return res.status(403).send("Role Mismatch")
    }

    const token = await jwt.sign({      // Create token for valid user(Pass)
    userId : existUser._id,
    username : existUser.username,
    email : existUser.email,
    role:existUser.role,
    }, process.env.JWT_SECRET)  // JWT secret

    res.cookie("token",token)    // Save token in Browser Cookie

    if(role === "admin"){
        return res.redirect(`/admin/${existUser.username}`)
    }else{
         return res.redirect(`/user/${existUser.username}`)
    }

}catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error " });
}

}


module.exports = UserLogin