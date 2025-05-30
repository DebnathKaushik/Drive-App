const Pusher = require('pusher');

const pusher = new Pusher({
  appId: "2000938",
  key: "62ee3b1c9692423af804",
  secret: "66c64e270c653b7ae55d",
  cluster: "ap1",
  useTLS: true
});

module.exports = pusher;
