const express = require('express')
const authMiddleware = require('../middlewares/admin.auth')
const router = express.Router()
const ImageModel = require("../models/image.model")


// Specific user Authorization (Admin)
router.get("/admin/:username", authMiddleware("admin"), async(req,res)=>{
   
    res.render("admin_index",{       
        username:req.user.username,
        email:req.user.email,
        role:req.user.role,
    })
})
// Specific user Authorization (User)
router.get("/user/:username", authMiddleware("user"), async(req,res)=>{

    const allimages = await ImageModel.find({UserId:req.user.userId}).sort({uploadTime:-1})
   
    res.render("user_index",{       
        username:req.user.username, // these from authMiddleware
        email:req.user.email,       //  ''
        role:req.user.role,         //  ''
        allimages,
    })
})


module.exports = router