const Interest = require('../../db/').Interest;
const discovery = require('../../service/').discovery;
const config = require('config')['watson'];

module.exports.getInterest = (req, res) => {
  Interest.findOne({ where: { id: req.params.id } })
    .then(project => {
      discovery.addDocument((config.environment_id, cofig.collection_id, project), (err, data) => {
        if (err) { return res.sendStatus(500); }
        res.send(data);
      });
    });
};
