const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()




router.get("/index", authMiddleware, (req,res)=>{
    res.render("index")
})


module.exports = router