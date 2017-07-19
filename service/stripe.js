const config = require('config')['stripe'];
const stripe = require('stripe')(config.secret_key);

module.exports = stripe;
