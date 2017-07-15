'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('index.ejs');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/session')
  .get((req, res) => {
    res.send(req.session.passport.user);
  });

module.exports = router;
