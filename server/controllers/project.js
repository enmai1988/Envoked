const { Project, User } = require('../../db/');
const path = require('path');
const fs = require('fs');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const discovery = new DiscoveryV1({
  username: '0228a918-c532-46e4-aff1-0e44b47ecb04',
  password: 'M3f66vdjClUu',
  version: 'v1',
  version_date: '2017-07-19'
});

var file = path.join(__dirname, '/test-doc2.html'); 
file = fs.readFileSync(file);

discovery.addDocument(('9f85920a-44e6-4591-a34e-2bcf260e7b9e', '00c84fed-2bf8-4fc8-a616-fd607caae686', file),
function(error, data) {
  console.log('WATSON DATA: ', data);
});
  
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

module.exports.categoryLeader = (req, res) => {
  Project.max('currentFunding', { where: { category: req.body.category } }).then(max => {
    console.log(max);
  });
};

// curl -X POST -u "0228a918-c532-46e4-aff1-0e44b47ecb04":"M3f66vdjClUu" -H "Content-Type: application/json" -d '{ "name":"my-first-environment", "description":"exploring environments", "size":0}' "https://gateway.watsonplatform.net/discovery/api/v1/environments?version=2017-07-19"

// {
//   "environment_id" : "9f85920a-44e6-4591-a34e-2bcf260e7b9e",
//   "name" : "my-first-environment",
//   "description" : "exploring environments",
//   "created" : "2017-07-19T17:34:47.753Z",
//   "updated" : "2017-07-19T17:34:47.753Z",
//   "status" : "pending",
//   "read_only" : false,
//   "size" : 0,
//   "index_capacity" : {
//     "disk_usage" : {
//       "used_bytes" : 0,
//       "total_bytes" : 4294967296,
//       "used" : "0 KB",
//       "total" : "4 GB",
//       "percent_used" : 0.00
//     },
//     "memory_usage" : {
//       "used_bytes" : 0,
//       "total_bytes" : 0,
//       "used" : "0 KB",
//       "total" : "0 KB",
//       "percent_used" : 0.00
//     }
//   }
// }

// curl -u "0228a918-c532-46e4-aff1-0e44b47ecb04":"M3f66vdjClUu" https://gateway.watsonplatform.net/discovery/api/v1/environments/{9f85920a-44e6-4591-a34e-2bcf260e7b9e}/configurations?version=2017-07-19

// {
//   "configurations": [
//     {
//       "configuration_id": "05f9483b-b31b-4dad-b7fb-51a93978fdeb",
//       "name": "Default Configuration",
//       "description": "The configuration used by default when creating a new collection without specifying a configuration_id.",
//       "created": "2017-07-19T17:34:47.789Z",
//       "updated": "2017-07-19T17:34:47.789Z"
//     }
//   ]
// }

// curl -X POST -u "0228a918-c532-46e4-aff1-0e44b47ecb04":"M3f66vdjClUu" -H "Content-Type: application/json" -d '{"name": "*my-first-collection*", "description": "exploring collections", "configuration_id":"05f9483b-b31b-4dad-b7fb-51a93978fdeb" , "language": "en_us"}' https://gateway.watsonplatform.net/discovery/api/v1/environments/{9f85920a-44e6-4591-a34e-2bcf260e7b9e}/collections?version=2017-07-19

// {
//   "name" : "*my-first-collection*",
//   "collection_id" : "00c84fed-2bf8-4fc8-a616-fd607caae686",
//   "description" : "exploring collections",
//   "created" : "2017-07-19T17:41:55.844Z",
//   "updated" : "2017-07-19T17:41:55.844Z",
//   "configuration_id" : "05f9483b-b31b-4dad-b7fb-51a93978fdeb",
//   "language" : "en",
//   "status" : "active"
// }

// curl -X POST -u "0228a918-c532-46e4-aff1-0e44b47ecb04":"M3f66vdjClUu" -F "file=@test-doc2.html" https://gateway.watsonplatform.net/discovery/api/v1/environments/{9f85920a-44e6-4591-a34e-2bcf260e7b9e}/collections/{00c84fed-2bf8-4fc8-a616-fd607caae686}/documents?version=2017-07-19

// curl -u "0228a918-c532-46e4-aff1-0e44b47ecb04":"M3f66vdjClUu" 'https://gateway.watsonplatform.net/discovery/api/v1/environments/{9f85920a-44e6-4591-a34e-2bcf260e7b9e}/collections/{00c84fed-2bf8-4fc8-a616-fd607caae686}*/query?version=2017-07-19&query=enriched_text.entities.text:IBM'

//Doc 4
// {
//   "document_id": "85c5668e-d047-4839-ab78-a288a026a73a",
//   "status": "processing"
// }

// Doc 2
// {
//   "document_id": "207c426c-5b00-4f88-8edd-712f935e5b0e",
//   "status": "processing"
// }
