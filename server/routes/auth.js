const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send(req.user ? {
      isLoggedIn: true,
      user: req.user
    } : { isLoggedIn: false, user: {} });
  });

router.route('/login')
  .get((req, res) => {
    // res.render('login.ejs', { message: req.flash('loginMessage') });
    res.render('index.ejs');
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    // res.render('signup.ejs', { message: req.flash('signupMessage') });
    res.render('index.ejs');
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/google/callback', middleware.passport.authenticate('google', {
  failureRedirect: '/auth/login'
}), (req, res) => {
  console.log('google auth: ', req.url);
  res.redirect('/');
});

router.get('/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', middleware.passport.authenticate('facebook', {
  failureRedirect: '/auth/login'
}), (req, res) => {
  console.log('facebook auth: ', req.url);
  res.redirect('/');
});

module.exports = router;
