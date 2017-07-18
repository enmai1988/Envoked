const { Project, Image, User } = require('../../db/');
const url = require('url');
const crypto = require('crypto');
const _ = require('underscore');

module.exports.getAll = (req, res) => {
  let option = {};
  if (req.query.origin === 'home page') {
    option = {
      where: { status: 'ready' },
      include: [ { model: Image } ],
      limit: 6
    };
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
  // ensure unique filename
  const smallScreenshot = crypto.randomBytes(8).toString('hex');
  const fullScreenshot = crypto.randomBytes(8).toString('hex');

  Project.create(req.body)
    .then(project => {
      if (!project) { throw project; }
      return Image.create({ small: `${smallScreenshot}.png`, full: `${fullScreenshot}.png`, projectId: project.dataValues.id });
    })
    .then(result => {
      if (!result) { throw result; }
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('project creation:', err);
      res.sendStatus(500);
    });
};

module.exports.getOne = (req, res) => {
  Project.findOne({ where: { id: req.params.id }, include: [ { model: Image }, { model: User } ] })
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
