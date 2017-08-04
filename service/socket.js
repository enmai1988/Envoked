const color = require('colors');
const app = require('../server/app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Promise = require('bluebird');
const Twilio = require('./twilio');
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
        io.to(data.recipientId).emit('update notification');
      })
      .catch(err => {
        console.log('error creating notification', err);
        io.to(id).emit('request failed');
      });
  });

  socket.on('contact request decision', data => {
    Promise.all([
      Contact.findOne({ where: { status: 'pending', userId: data.userId, contactsId: data.contactsId } }),
      Contact.findOne({ where: { status: 'pending', userId: data.contactsId, contactsId: data.userId } })
    ]).spread((contact1, contact2) => {
      return Promise.all([
        contact1.update({ status: data.status }),
        contact2.update({ status: data.status })
      ]);
    }).then(() => {
      io.to(id).emit('update contact');
      io.to(data.contactsId).emit('update contact');
    }).catch(err => {
      console.log('err creating contact'.red, err);
    });
  });

  socket.on('mark notifications as read', notification => {
    console.log('updating notifications to read'.yellow);
    Notification.findById(notification.id)
      .then(result => result.update({ status: 'read' }))
      .then(() => io.to(id).emit('update notification'))
      .catch(err => {
        console.log('update notification: '.red, err);
        io.to(id).emit('error updating notification');
      });
  });

  socket.on('start video chat', data => {
    console.log('start video chat'.yellow, data);
    let notificationObj = {
      originatorId: id,
      recipientId: data.invitee.id,
      type: 'video chat request'
    };

    Promise.all([
      Notification.create(notificationObj),
      Twilio.getVideoToken(data.inviter)
    ]).spread((notification, videoChatInfo) => {
      io.to(data.invitee.id).emit('update notification');
      io.to(data.invitee.id).emit('video chat request', { inviter: data.inviter, invitee: data.invitee });
      io.to(id).emit('video chat token', videoChatInfo);
    }).catch(err => {
      console.log('failed to create notification'.red, err);
      io.to(id).emit('request failed');
    });
  });

  socket.on('accept video chat request', user => {
    Promise.resolve(Twilio.getVideoToken(user))
      .then(videoChatInfo => {
        io.to(id).emit('join video chat', videoChatInfo);
      })
      .catch(err => {

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
