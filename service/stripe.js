const config = require('config')['stripe'];
const stripe = require('stripe')(config.secret_key);
const Sequelize = require('sequelize');
const { Project, User, Funding } = require('../db');

module.exports.charge = (req, res) => {
  let projectId = req.body.projectId;
  let projectFunded = req.body.projectFunded;

  let userId = req.user.id;
  let amount = parseFloat(req.body.amount) || 1000;
  let stripeAmount = amount*100;
  let source = req.body.source;
  let description = req.body.description || 'test';
  let currency = req.body.currency || 'usd';

  stripe.charges.create({
    amount: stripeAmount,
    currency,
    description,
    source,
    capture: true
  })
    .then(charge => {
      let status = charge.status;
      let chargeAmount = charge.amount;
      console.log('projectId: ', projectId);
      console.log('PROJECTFunded: ', projectFunded);
      console.log('USERID: ', userId);
      console.log('STATUS: ', status);
      console.log('AMOUNT: ', chargeAmount);

      // Send back success startus if charge is successful
      if (status === 'succeeded') {
        let projectTotal = parseFloat(projectFunded) + amount;
        console.log('TOTAL: ', projectTotal);
        res.status(200).send('Charge Successful!');

        // Update currentFunding for projectId in Projects Table
        Project.update({
          currentFunding: projectTotal
        },
        {
          where: { id: projectId }
        })
          .then(function () {
            console.log("Project updated successfully!");
          })
          .catch(function (err) {
            console.log("Project update failed!");
          });

        // Send back error startus if charge is fails
      } else {
        res.status(201).send('Charge Failed!');
      }
    });
};
