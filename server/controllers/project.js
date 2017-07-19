const { Project, User } = require('../../db/');
const url = require('url');
const crypto = require('crypto');
const _ = require('underscore');

module.exports.getAll = (req, res) => {
  let option = {};
  if (req.query.origin === 'home page') {
    option = { limit: 6 };
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
