const express = require("express")
const router =  express.Router()
const authMiddleware = require('../middlewares/admin.auth')
const {body} = require('express-validator')
const UserRegisterbyAdmin = require("../Controllers/user.register.byAdmin") 

//(GET) This is from admin_index.ejs
router.get("/admin/:username/add-user",authMiddleware("admin"),(req,res)=>{
    res.render("admin_add_user",{
        username:req.user.username,
    })
})


// validation
const body_MW_register =[
    body('username').trim().isLength({min:4}),
    body('email').trim().isEmail().isLength({min:4}),
    body('password').trim().isLength({min:4}),
    body('role').trim().notEmpty().withMessage("Role is Required"),
]
//(Post) This is from admin_add_user.ejs
router.post("/admin/:username/add-user",authMiddleware("admin"),body_MW_register,UserRegisterbyAdmin)



module.exports = router