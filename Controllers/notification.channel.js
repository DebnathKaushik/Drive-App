const jwt = require('jsonwebtoken')
const pusher = require("../notifications/pusher")

// Notification channel Logic 
const notify = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token){ 
      return res.status(401).json({ message: "Unauthorized" });
    }

    //else
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // repeted / multiple refresh
    if(!decoded.IsloggedIn){
      console.log("Already notified")
      return res.json({message:"Already notified"})
    }      

    if(decoded.role === "admin"){
        await pusher.trigger("notification-channel", "notification-event", {
        message: `👨‍💼 '${decoded.username}' logged in`
      });
    }else{
      await pusher.trigger("notification-channel", "notification-event", {
      message: `👽 '${decoded.username}' logged in`
    });
  }

    const newToken = jwt.sign({
      ...decoded,IsloggedIn:false,
    },process.env.JWT_SECRET)

    res.cookie("token",newToken)   // After first notification,issue a new JWT with justLoggedIn: false.
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Notification failed" });
  }
}

module.exports = notify;