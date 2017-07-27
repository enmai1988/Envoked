'use strict';
const express = require('express');
const router = express.Router();
const ContactController = require('../controllers').Contact;

router.route('/')
  .get(ContactController.getAll)
  .post(ContactController.create)
;

router.route('/:id')
  .get(ContactController.getOne)
  .put(ContactController.update)
;

module.exports = router;
