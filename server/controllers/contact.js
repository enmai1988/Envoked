const { User } = require('../../db/');
const Promise = require('bluebird');

module.exports.getAll = (req, res) => {
<<<<<<< HEAD
  let option = { order: [['firstName', 'ASC']] };
  if (req.query.keyword !== '') {
    option = { where: { firstName: { $iLike: `${req.query.keyword}%` } }, order: [['firstName', 'ASC']] };
=======
  let option = {};
  if (req.query.keyword !== '') {
    option = { where: { firstName: { $iLike: `${req.query.keyword}%` } } };
>>>>>>> origin
  }
  console.log('Search contacts with: ', option);
  User.findOne({ where: { id: req.user.id } })
    .then(user => {
      if (!user) { throw user; }
      return user.getContacts(option);
    })
    .then(contacts => {
      if (!contacts) { throw contacts; }
      res.send(contacts);
    })
    .catch(err => {
      console.log('failed to get contacts: ', err);
      res.sendStatus(500);
    });
};

module.exports.create = (req, res) => {
  Promise.all([
<<<<<<< HEAD
    User.findOne({ where: { id: req.body.userId } }),
    User.findOne({ where: { id: req.body.contactId } })
=======
    User.findOne({ where: { id: req.body.requester.id } }),
    User.findOne({ where: { id: req.body.accepter.id } })
>>>>>>> origin
  ]).spread((requester, accepter) => {
    return Promise.all([
      requester.addContacts(accepter),
      accepter.addContacts(requester)
    ]);
  }).spread((result1, result2) => {
    if (!result1) { throw result1; }
    if (!result2) { throw result2; }
    res.sendStatus(201);
  }).catch(err => {
    console.log('failed to create contact: ', err);
    res.sendStatus(500);
  });
};

module.exports.getOne = (req, res) => {

};

module.exports.update = (req, res) => {

};
