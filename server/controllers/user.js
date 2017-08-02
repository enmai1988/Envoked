const { User, Contact } = require('../../db/');

module.exports.getAll = (req, res) => {

};

module.exports.create = (req, res) => {
  let userInfo = req.body;
  User.findOrCreate({ where: { email: req.body.email }, default: userInfo })
    .spread((user, created) => {
      res.sendStatus(created ? 201 : 200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports.getOne = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (!user) { throw user; }
      res.send(user);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports.update = (req, res) => {
  User.findOne({ where: req.params.id })
    .then(user => {
      if (!user) { throw user; }
      return user.update(req.body);
    })
    .then(updated => {
      if (!updated) { throw updated; }
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
