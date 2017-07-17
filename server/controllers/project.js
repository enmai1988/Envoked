const { Project, Image } = require('../../db/');
const { pageres } = require('../middleware/');
const url = require('url');
const crypto = require('crypto');
const _ = require('underscore');

module.exports.getAll = (req, res) => {
  console.log('getAll: ', req.query);
  let option = _.extend({ include: [ { model: Image } ] }, req.query);
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
  console.log(new Date());
  const screenshotXS = crypto.randomBytes(8).toString('hex');
  const screenshotXL = crypto.randomBytes(8).toString('hex');
  console.log('capturing screenshot for: ', req.body.url);

  pageres.src(req.body.url, ['1366x768'], { filename: screenshotXS, crop: true })
    .dest(__dirname + '/../../public/assets/pageres/').run()
    .then(() => {
      return pageres.src(req.body.url, ['1280x720'], { filename: screenshotXL })
        .dest(__dirname + '/../../public/assets/pageres/').run();
    })
    .then(() => {
      return Project.create(req.body);
    })
    .then(project => {
      if (!project) { throw project; }
      return Image.create({ small: `${screenshotXS}.png`, full: `${screenshotXL}.png`, projectId: project.dataValues.id });
    })
    .then(result => {
      if (!result) { throw result; }
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('failed to create project: ', err);
      res.sendStatus(500);
    });
};

module.exports.getOne = (req, res) => {
  Project.findOne({ where: { id: req.params.id }, include: [ { model: Image } ] })
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
