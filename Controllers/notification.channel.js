const jwt = require('jsonwebtoken')
const pusher = require("../notifications/pusher")

// Notification channel Logic 
const notify = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    //else
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    await pusher.trigger("notification-channel", "notification-event", {
      message: `👽 ${username} logged in`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Notification failed" });
  }
}

module.exports = notify;