const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    filePath:{
        type:String,
        required:true,
    },
    uploadTime:{
        type:Date,
        default:Date.now,
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // This is UserModel i created "user.model.js" file 
        required:true,
    }
})

const ImageModel = mongoose.model("Image",ImageSchema)
module.exports = ImageModel