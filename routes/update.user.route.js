const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/admin.auth")
const UserModel = require("../models/user.model")

// user update by the admin --> ( update-user/:id) This from admin_index.ejs
router.patch("/update-user/:id", authMiddleware("admin") ,async(req,res)=>{
    try{
        const userId = req.params.id
        const {username,email} = req.body
        const existUser = await UserModel.findById(userId)
        if(!existUser){
            return res.status(404).json({ error: "User not found" });
        }

        if(username) existUser.username = username
        if(email) existUser.email = email

        await existUser.save()
        return res.redirect(`/admin/${req.user.username}`)
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"})
    }

} )

module.exports = router