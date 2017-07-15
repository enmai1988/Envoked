const Project = require('../../db/').Project;

module.exports.getAll = (req, res) => {
  Project.findAll()
    .then(projects => {
      if (!projects) { throw projects; }
      res.send(projects);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports.create = (req, res) => {
  Project.create(req.body)
    .then(created => {
      if (!created) { throw created; }
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports.getOne = (req, res) => {
  Project.findOne({ where: { id: req.params.id } })
    .then(project => {
      if (!project) { throw project; }
      res.send(project);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {

};

module.exports.deleteOne = (req, res) => {

};
