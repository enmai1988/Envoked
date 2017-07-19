const ProjectController = require('../server/controllers').Project;
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const config = require('config')['watson'];

const discovery = new DiscoveryV1({
  username: config.username,
  password: config.password,
  version_date: '2017-06-25'
});


module.exports = discovery;
