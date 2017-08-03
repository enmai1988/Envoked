'use strict';
const express = require('express');
const router = express.Router();
const Twilio = require('../../service').twilio;

router.route('/')
  .get()
  .post()
  .put(Twilio.updateRoom)
;

router.route('/token')
  .get(Twilio.getVideoToken)
;

module.exports = router;
