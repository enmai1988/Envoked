const { Project, User } = require('../../db/');
const url = require('url');

module.exports.getAll = (req, res) => {
  let option = { include: [ { model: User } ]};
  let origin = req.query.origin;
  if (origin === 'landing page') {
    option = { limit: 6, order: [['currentFunding', 'DESC']], include: [ { model: User } ] };
  } else if (origin === 'my projects') {
    option = { where: { userId: req.user.id }, include: [ { model: User } ] };
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
  Project.findOrCreate({
    where: { userId: req.body.userId, slug: req.body.slug },
    defaults: req.body
  }).spread((project, created) => {
    if (!project) { throw project; }
    res.sendStatus(created ? 201 : 200);
  }).catch(err => {
    console.log('project creation:', err);
    res.sendStatus(500);
  });
  // Project.create(projectInfo)

};

module.exports.getOne = (req, res) => {
  Project.findOne({ where: { userId: req.params.userId, slug: req.params.project }, include: [ { model: User } ] })
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
