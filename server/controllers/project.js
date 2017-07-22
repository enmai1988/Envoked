const { Project, User } = require('../../db/');
const url = require('url');

module.exports.getAll = (req, res) => {
  let option = {};
  let origin = req.query.origin;
  if (origin === '/') {
    option = { limit: 6, order: [['currentFunding', 'DESC']] };
  } else if (origin === 'my projects') {
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
      let id = JSON.stringify(project.dataValues.id);
      res.status(201).send(id);
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
