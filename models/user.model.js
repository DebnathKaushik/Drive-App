const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
    },email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
    },password:{
        type:String,
        required:true,
        trim:true,
    }

})
   

const UserModel = mongoose.model("User",UserSchema)
   
module.exports = UserModel