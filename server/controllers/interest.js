const Interest = require('../../db/').Interest;
const discovery = require('../../service/').discovery;
const config = require('config')['watson'];

// use getInterest if Watson 

// module.exports.getInterest = (req, res) => {
//   Interest.findOne({ where: { id: req.params.id } })
//     .then(project => {
//       discovery.addDocument((config.environment_id, cofig.collection_id, project), (err, data) => {
//         if (err) { return res.sendStatus(500); }
//         res.send(data);
//       });
//     })
//     .catch(err => {
//       console.log('Interest.getInterest: ', err);
//       res.sendStatus(500);
//     });;
// };

module.exports.getAll = (req, res) => {
  Interest.findAll()
    .then(interests => {
      if (!interests) { throw interests; }
      res.send(interests);
    })
    .catch(err => {
      console.log('Interest.getAll: ', err);
      res.sendStatus(500);
    });
};
