const config = require('config')['stripe'];
const stripe = require('stripe')(config.secret_key);
const Sequelize = require('sequelize');
const { Project, User, Funding } = require('../db');

module.exports.charge = (req, res) => {
  let projectId = req.body.projectId;
  let projectFunded = req.body.projectFunded;

  if (!req.user) {
    // if there is no user, return error to front end
    res.status(200).send('Please log in to fund this project');
  } else {

    let userId = req.user.id;

    if (isNaN(parseInt(req.body.amount))) {
      res.status(200).send('Please enter a valid amount');
    } else {
      let amount = parseFloat(req.body.amount) || 1000;
      let stripeAmount = amount * 100;
      let source = req.body.source;
      let description = req.body.description || 'test';
      let currency = req.body.currency || 'usd';
      let result = '';

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

          // Send back success startus if charge is successful
          if (status === 'succeeded') {

            let projectTotal = parseFloat(projectFunded) + amount;

            // Update currentFunding for projectId in Projects Table
            Project.update({
              currentFunding: projectTotal
            }, { where: { id: projectId } })
              .then(function () {
                console.log('Project updated successfully!');
              })
              .then(function () {
                Funding.create({
                  projectId: projectId,
                  userId: userId,
                  amount: projectTotal
                })
                  .then(function () {
                    console.log('Funding updated successfully!');
                    result = 'Charge Successful!';
                    return;
                  })
                  .then(() => {
                    res.status(200).send(result);
                  });
                return;
              });
          } else {
            // Send back error startus if charge is fails
            result = 'Charge Failed!';
            return Promise.resolve(result);
            return;
          }
          return;
        })
        .catch(err => {
          res.status(200).send('Charge Failed!');
        });

    }
  }
};
