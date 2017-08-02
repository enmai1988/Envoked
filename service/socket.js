const color = require('colors');
const app = require('../server/app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Promise = require('bluebird');
const { User, Notification, Contact } = require('../db');

io.on('connection', socket => {
  const storage = {};
  const id = socket.handshake.query.id;
  socket.join(id);
  storage[id] ? storage[id].push(socket) : storage[id] = [socket];
  console.log('a user has connected'.blue);

  socket.on('contact request', data => {
    let notificationObj = {
      originatorId: id,
      recipientId: data.recipientId,
      type: 'contact request'
    };

    Notification.create(notificationObj)
      .then(() => {
        return Promise.all([
          Contact.create({
            userId: id,
            contactsId: data.recipientId,
            status: 'pending'
          }),
          Contact.create({
            userId: data.recipientId,
            contactsId: id,
            status: 'pending'
          })
        ]);
      })
      .then(() => {
        io.to(data.recipientId).emit('new notification');
      })
      .catch(err => {
        console.log('error creating notification', err);
        io.to(id).emit('failed to fulfill contact requset');
      });
  });

  socket.on('mark notifications as read', notifications => {
    console.log('updating notifications to read'.yellow);
    Promise.each(notifications, notification => {
      Notification.findById(notification.id)
        .then(result => {
          result.update({status: 'read'});
        });
    }).then(() => {
      io.to(id).emit('marked notifications as read');
    }).catch(err => {
      console.log('err when updating notifications'.red, err);
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
