const express = require('express')
const authMiddleware = require('../middlewares/admin.auth')
const router = express.Router()


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
   
    res.render("user_index",{       
        username:req.user.username,
        email:req.user.email,
        role:req.user.role,
    })
})


module.exports = router