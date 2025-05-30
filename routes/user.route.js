const express = require('express')
const router = express.Router()
const UserModel = require("../models/user.model")
const {body,validationResult} = require('express-validator') // 3rd Party middleware
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pusher = require("../notifications/pusher")



//Get/Rsgister Page
router.get("/register",(req,res)=>{
    res.render("register")
})

//3rd Party middleware for register // validation
const body_MW_register =[
    body('username').trim().isLength({min:4}),
    body('email').trim().isEmail().isLength({min:4}),
    body('password').trim().isLength({min:4})
]
//Post/Register Logic
router.post("/register",body_MW_register ,async (req,res)=>{

    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Invalid credentials / username,pass,email are incorrect !"})
        }else{   
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password,10) // for hash the password
        try {
            const [existingemail,existingUser] = await Promise.all([    // Database checking
                UserModel.findOne().where("email").equals(email),
                UserModel.findOne().where("username").equals(username)
            ])
            if(existingemail||existingUser){
                return res.status(400).json({message:"Email or Username already in use"})
            }
             else{
            // Create a newUser if email and username is unique
            const newUser = await UserModel.create({
                username,
                email,
                password:hashPassword
            })
            if(newUser){
               return res.redirect("/login")
            }
             return res.send("user creation unsuccessful!");
        }
        
        } catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
});


// post/trigger-notification
router.post("/trigger-notification", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    await pusher.trigger("notification-channel", "notification-event", {
      message: `${username} logged in`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Notification failed" });
  }
});





// Get/login
router.get("/login",(req,res)=>{
    res.render("login")
})

//3rd Party middleware for login // validation
const body_MW_login =[
    body('username').trim().isLength({min:4}),
    body('password').trim().isLength({min:4})
]
//Login Logic
router.post("/login",body_MW_login, async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
           // errors:errors.array(),
            meassage:"Username or Password must be 4 charecter! / validation error !"
        })
    }else{
        const {username,password} = req.body
        try{
            const existUser = await UserModel.findOne().where("username").equals(username)  
            if(!existUser){
                return res.status(400).json({
                    //errors:errors.array(),
                    meassage:"Username or password is incorrect"
                })
            }else{
                const checkPassword = await bcrypt.compare(password,existUser.password) // here "user found" and check password valid or not
                                                                                        // existUser.password (the hashed password stored in the database)
                if(!checkPassword){
                    return res.status(400).json({
                        //errors:errors.array(),
                        meassage:"Username or password is incorrect"
                    })
                }else{
                    const token = await jwt.sign({      // Create token for valid user(Pass)
                        userId : existUser._id,
                        username : existUser.username,
                        email : existUser.email
                        
                    }, process.env.JWT_SECRET)  // JWT secret
                
                    res.cookie("token",token)    // Save token in Browser Cookie 
                    res.redirect(`/index/${existUser.username}`);                 
                }
            }
 
        }catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error " });
        }
    }
})







module.exports = router