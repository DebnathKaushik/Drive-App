const express = require('express')
const router = express.Router()
const ImageModel = require("../models/image.model")
const authMiddleware = require('../middlewares/admin.auth')
const uploadImage = require("../middlewares/multer.config")

router.post("/user/:username", authMiddleware("user"),uploadImage.single("file"),async(req,res)=>{
  try{
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        await ImageModel.create({
            filePath:`/uploads/${req.file.filename}`,
            uploadTime:new Date(),
            UserId:req.user.userId,  // from admin.auth.js (decoded = req.user)[all value when jwt sign(login) ]
        })
        return res.redirect(`/user/${req.params.username}`)
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error " });
  } 
})

module.exports = router