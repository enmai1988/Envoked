const config = require('config')['stripe'];
const stripe = require('stripe')(config.secret_key);
const Sequelize = require('sequelize');
const { Project, User, Funding } = require('../db');

module.exports.charge = (req, res) => {
  //console.log('incoming payment request: ', req.body);
  //let temp = req.headers.referer.split('http://localhost:3000/projects/');
  //let temp2 = temp[1].split('/');

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
      console.log(charge);
    });
};
