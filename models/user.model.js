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
    },role:{
        type:String,
        trim:true,
        required:true,
        enum:["admin","user"],
        default:"user",
    }

})
   
// "User" is Model name
// UserModel is obj of "User" Model
const UserModel = mongoose.model("User",UserSchema)
   
module.exports = UserModel