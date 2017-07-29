const config = require('config')['stripe'];
const stripe = require('stripe')(config.secret_key);

module.exports.charge = (req, res) => {
  console.log('incoming payment request: ', req.body);
  let amount = req.body.amount || 1000;
  let email = req.body.stripeEmail || 'abc@gmail.com';
  let source = req.body.source;
  let description = req.body.description || 'test';
  let currency = req.body.currency || 'usd';

  stripe.charges.create({
    amount,
    currency,
    description,
    source,
    capture: true,
  })
    .then(charge => {
      //console.log('charge: ', charge);
      res.sendStatus(200);
    });
};
