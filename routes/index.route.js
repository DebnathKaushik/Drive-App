const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
const UserModel = require("../models/user.model")



// Specific user Authorization 
router.get("/index/:username", authMiddleware, async(req,res)=>{
    const tokenUsername = req.user.username  // from token -> auth middleware
    const paramUsername = req.params.username  // from param ->(login page send) redirect

    if(tokenUsername !== paramUsername){
        return res.status(403).send("User Unauthorized")
    }

    try{
        const user = await UserModel.findOne({ username: paramUsername });
         res.render("index",{
            username:user.username,
            email:user.email
        })
    }catch(error){
        res.status(500).send("Server Error");
    }
    
})


module.exports = router