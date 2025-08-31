const express = require('express')
const authMiddleware = require('../middlewares/admin.auth')
const router = express.Router()
const ImageModel = require("../models/image.model")
const UserModel = require("../models/user.model")


// Specific user Authorization (Admin)
router.get("/admin/:username", authMiddleware("admin"), async(req,res)=>{

    try{   
        const alluser = await UserModel.find({role:{$ne:"admin"}}) // $ne -> means not equal (admin)  
        res.render("admin_index",{       
            username:req.user.username,
            email:req.user.email,
            role:req.user.role,
            alluser,
        })
    
    }catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
})


// Specific user Authorization (User)
router.get("/user/:username", authMiddleware("user"), async(req,res)=>{

    try{
        const allimages = await ImageModel.find({UserId:req.user.userId}).sort({uploadTime:-1})
        res.render("user_index",{       
            username:req.user.username, // these from authMiddleware
            email:req.user.email,       //  ''
            role:req.user.role,         //  ''
            allimages,                  // Imagemodel gives specific user images(indivisual)
        })
    }catch(error){
        return res.status(500).json({ message: "Internal server error" })
    }
})


module.exports = router