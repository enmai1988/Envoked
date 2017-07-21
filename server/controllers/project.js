const { Project, User } = require('../../db/');

module.exports.getAll = (req, res) => {
  let option = {};
  let origin = req.query.origin;
  if (origin === '/') {
    option = { limit: 6, order: [['fundedAmount', 'DESC']] };
  } else if (origin === '/myprofile' || origin === 'my projects') {
    option = { where: { userId: req.user.id } };
  } else if (origin === 'projects you may like') {
    // get projects matching interest
  }
  console.log('findAll, querying db with: ', option);
  Project.findAll(option)
    .then(projects => {
      if (!projects) { throw projects; }
      res.send(projects);
    })
    .catch(err => {
      console.log('Project.getAll: ', err);
      res.sendStatus(500);
    });
};

module.exports.create = (req, res) => {
  Project.create(req.body)
    .then(project => {
      if (!project) { throw project; }
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('project creation:', err);
      res.sendStatus(500);
    });
};

module.exports.getOne = (req, res) => {
  Project.findOne({ where: { id: req.params.id }, include: [ { model: User } ] })
    .then(project => {
      if (!project) { throw project; }
      res.send(project);
    })
    .catch(err => {
      console.log('Project.getOne: ', err);
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {

};

module.exports.deleteOne = (req, res) => {

};
