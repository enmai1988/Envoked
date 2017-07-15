'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').User;

router.route('/')
  .get(UserController.getAll)
  .post(UserController.create)
;

router.route('/:id')
  .get(UserController.getOne)
  .put(UserController.update)
;

module.exports = router;
