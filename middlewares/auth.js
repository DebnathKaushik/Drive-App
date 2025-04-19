const jwt = require("jsonwebtoken")

//Auth logic        
function auth(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // else // This is convention or tradition
    try{
        const compareToken = jwt.verify(token,process.env.JWT_SECRET)
        req.user = compareToken   // here store user info for access in routes
        next()
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    
}

module.exports = auth