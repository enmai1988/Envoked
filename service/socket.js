const color = require('colors');
const app = require('../server/app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { User, Notification } = require('../db');

io.on('connection', socket => {
  const storage = {};
  const id = socket.handshake.query.id;
  socket.join(id);
  storage[id] ? storage[id].push(socket) : storage[id] = [socket];
  console.log('a user has connected'.blue);

  socket.on('contact request', data => {
    data.originatorId = id;
    data.text = '';
    Notification.create(data)
      .then(result => {
        console.log('contact request: '.yellow, result);
        if (!result) { throw result; }
        io.to(data.recipientId).emit('new notification');
      })
      .catch(err => {
        io.to(id).emit('failed to send request');
      });
  });

  socket.on('disconnect', () => {
    console.log('a user has disconnected'.red);
    if (storage[id] && storage[id].length <= 1) {
      delete storage[id];
    } else {
      storage[id].splice(storage[id].indexOf(socket), 1);
    }
  });
});

module.exports = server;
