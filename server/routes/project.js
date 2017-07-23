'use strict';
const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers').Project;

router.route('/')
  .get(ProjectController.getAll)
  .post(ProjectController.create)
;

router.route('/:userId/:project')
  .get(ProjectController.getOne)
  .put(ProjectController.update)
  // .delete(ProjectController.deleteOne)
;

module.exports = router;
