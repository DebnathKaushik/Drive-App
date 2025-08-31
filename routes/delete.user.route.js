const express = require("express")
const router = express.Router()
const UserModel = require('../models/user.model')
const ImageModel = require('../models/image.model')
const authMiddleware = require('../middlewares/admin.auth')

// delete User and image from admin
router.post("/delete-user/:id",authMiddleware("admin"),async(req,res)=>{
    try{
        const userId = req.params.id 
        const existUser = await UserModel.findById(userId)
        if(!existUser){
            return res.status(404).json({ error: "User not found" });
        }
        // Delete user's images first cause there is relation between them
        await ImageModel.deleteMany({ UserId: userId });
        // then Delete that user 
        await UserModel.findByIdAndDelete(userId);

        return res.redirect(`/admin/${req.user.username}`)
    }catch (error) {
    console.error(error);
    return res.status(500).json({message:"Error deleting user"});
  }
})


// Delete image from User
router.post("/delete-image/:id",authMiddleware("user"),async(req,res)=>{
    try{
        const imageId = req.params.id 
        const existImage = await ImageModel.findById(imageId)
        if(!existImage){
            return res.status(404).json({ error: "Image not found" });
        }
        // Delete user's images 
        await ImageModel.findByIdAndDelete({ _id: imageId });

        return res.redirect(`/user/${req.user.username}`)
    }catch (error) {
    console.error(error);
    return res.status(500).json({message:"Error deleting user"});
  }
})


module.exports = router