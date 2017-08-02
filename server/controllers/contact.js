const { User, Contact } = require('../../db');
const Promise = require('bluebird');
const color = require('colors');

module.exports.getAll = (req, res) => {
  let option = {
    where: { userId: req.user.id, status: 'contact' },
    include: [{
      model: User,
      as: 'contacts',
      order: [['firstName', 'ASC']]
    }],
  };
  if (req.query.keyword !== '') {
    option = {
      where: { status: 'contact' },
      include: [{
        model: User,
        as: 'contacts',
        where: { firstName: { $iLike: `${req.query.keyword}%` } },
        order: [['firstName', 'ASC']]
      }]
    };
  }
  console.log('Search contacts with: '.yellow, option);
  Contact.findAll(option)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log('error getting all contacts: '.red, err);
      res.sendStatus(500);
    });
};

module.exports.create = (req, res) => {
  Promise.all([
    User.findOne({ where: { id: req.body.userId } }),
    User.findOne({ where: { id: req.body.contactId } })
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
  if (req.user.id === Number(req.params.id)) {
    return res.send('self');
  }

  Contact.findOne({ where: { userId: req.user.id, contactsId: req.params.id } })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log('error getting one contact: '.red, err);
      res.sendStatus(500);
    });
};

module.exports.update = (req, res) => {
  console.log('contact update: '.yellow, req.body);
  Promise.all([
    Contact.findOne({ where: { userId: req.params.id } }),
    Contact.findOne({ where: { userId: req.user.id } })
  ]).spread((result1, result2) => {
    return Promise.all([
      result1.update(req.body),
      result2.update(req.body)
    ]);
  }).then(() => {
    res.sendStatus(200);
  }).catch(err => {
    console.log('error when updating contacts: '.red, err);
    res.sendStatus(500);
  });
};
