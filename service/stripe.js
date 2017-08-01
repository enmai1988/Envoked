const config = require('config')['stripe'];
const stripe = require('stripe')(config.secret_key);

module.exports.charge = (req, res) => {
  console.log('incoming payment request: ', req.body);
  let temp = req.headers.referer.split('http://localhost:3000/projects/');
  let temp2 = temp[1].split('/');
  projectId = temp2[0];

  let userId = req.user.id;
  let amount = parseFloat(req.body.amount) || 1000;
  let source = req.body.source;
  let description = req.body.description || 'test';
  let currency = req.body.currency || 'usd';

  console.log('PORJECTID: ', projectId);
  console.log('USERID: ', userId);
  console.log('AMOUNT: ', amount);

  stripe.customers.create({ email, source })
    .then(customer => {
      console.log('stripe: ', customer);
      return stripe.charges.create({
        amount,
        currency,
        description,
        customer: customer.id
      });
    })
    .then(charge => {
      console.log('charge: ', charge);
      res.sendStatus(200);
    });
};
