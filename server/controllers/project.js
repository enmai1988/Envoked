const Project = require('../../db/').Project;
const request = require('request-promise');
const config = require('config')['screenshotlayer'];

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
  let project = req.body;
  let imageURL = `
    http://api.screenshotlayer.com/api/capture?access_key=${config.access_key}&url=${req.body.url}
  `;

  request(imageURL)
    .then(response => {
      if (!response) { throw response; }
      console.log('got the image');
      project.imageURL = imageURL;
      return Project.create(project);
    })
    .then(created => {
      console.log('trying to create project: ', created);
      if (!created) { throw created; }
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
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
