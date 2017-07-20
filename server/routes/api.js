'use strict';
const express = require('express');
const middleware = require('../middleware');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('index.ejs');
  });

router.route('/create')
  .get(middleware.auth.verify, (req, res) => res.render('index.ejs'));

router.route('/project/:id')
  .get((req, res) => res.render('index.ejs'));

router.route('/myprofile')
  .get((req, res) => res.render('index.ejs'));

module.exports = router;
