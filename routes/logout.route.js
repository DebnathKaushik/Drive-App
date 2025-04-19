const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth")
const jwt = require("jsonwebtoken")


//logout logic
router.get("/Sign-out",authMiddleware,(req,res)=>{
    const tokenUser = req.cookies.token     // from token
    if(!tokenUser){
        return res.status(401).res.send("User Unauthorized")
    }
    const deleteUser = jwt.verify(tokenUser,process.env.JWT_SECRET)  // means (secret and cookies token data) are matched
    if(deleteUser){
        res.clearCookie("token")
        return res.redirect("/login") 
    }
    return res.redirect("/")
    
})




module.exports = router