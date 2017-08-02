'use strict';
const express = require('express');
const middleware = require('../middleware');
const router = express.Router();
const service = require('../../service');

router.route('/')
  .get((req, res) => {
    res.render('index.ejs');
  });

router.route('/create')
  .get(middleware.auth.verify, (req, res) => res.render('index.ejs'));

router.route('/projects/:userId/:project')
  .get((req, res) => res.render('index.ejs'));

router.route('/myprofile')
  .get(middleware.auth.verify, (req, res) => res.render('index.ejs'));

module.exports = router;
