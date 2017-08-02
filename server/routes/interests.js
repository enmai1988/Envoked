'use strict';
const express = require('express');
const router = express.Router();
const InterestController = require('../controllers').Interest;

router.route('/')
  .get(InterestController.getAll)
;

module.exports = router;
