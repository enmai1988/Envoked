const { User, Notification } = require('../../db/');
const Promise = require('bluebird');

module.exports.getAll = (req, res) => {
  Notification.findAll({ where: { recipientId: req.user.id }, include: [{ model: User, as: 'originator' }] })
    .then(results => {
      if (!results) { throw results; }
      res.send(results);
    })
    .catch(err => {
      console.log('get all notifications: ', err);
      res.sendStatus(404);
    });
};

module.exports.create = (req, res) => {
  Notification.create({
    originatorId: req.user.id,
    recipientId: req.body.id
  })
    .then(result => {
      if (!result) { throw result; }
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('create notifiction: ', err);
      res.sendStatus(500);
    });
};

module.exports.getUnread = (req, res) => {

};

module.exports.update = (req, res) => {

};
