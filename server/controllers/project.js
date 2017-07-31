const { Project, User } = require('../../db/');

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
  User.findById(req.body.userId)
    .then(user => {
      return user.getProjects({ where: {slug: req.body.slug} });
    })
    .then(projects => {
      if (projects.length) { return res.sendStatus(302); }
      return Project.create(req.body)
        .then(result => {
          if (!result) { throw result; }
          res.sendStatus(201);
        });
    })
    .catch(err => {
      console.log('failed to create project: ', err);
      res.sendStatus(500);
    });
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

module.exports.categoryLeader = (req, res) => {
  Project.max('currentFunding', { where: { category: req.body.category } }).then(max => {
    console.log(max);
  });
};
