const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        minlength:[3,"Username must be at least 3 charecters"]
    },email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        minlength:[3,"email must be at least 3 charecters"]
    },password:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"password must be at least 3 charecters"]
    }

})
   

const UserModel = mongoose.model("User",UserSchema)
   
module.exports = UserModel