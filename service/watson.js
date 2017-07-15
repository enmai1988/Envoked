const ProjectController = require('../server/controllers').Project;
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const config = require('config')['watson'];

module.exports.discovery = new DiscoveryV1({
  username: config.username,
  password: config.password,
  version_date: '2017-06-25'
});
