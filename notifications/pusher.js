const dotenv = require('dotenv')
dotenv.config()
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: "ap1",
  useTLS: true
});

module.exports = pusher;
