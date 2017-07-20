const express = require('express');
const middleware = require('../middleware');
const service = require('../../service');

const router = express.Router();

router.route('/')
  .get()
  .post(service.stripe.charge);

module.exports = router;
