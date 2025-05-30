const Pusher = require('pusher');

const pusher = new Pusher({
  appId: "2000756",
  key: "f29922464eb3c0945eb6",
  secret: "7924841f3aff08bc0cb5",
  cluster: "ap1",
  useTLS: true
});

module.exports = pusher;
