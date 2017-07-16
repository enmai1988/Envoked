const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .get((req, res) => {
<<<<<<< HEAD
=======
    console.log('getSession: ', req.user);
>>>>>>> create user with social network login
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
}), (req, res) => {
  res.redirect('/');
});

router.get('/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

router.get('/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/linkedin', middleware.passport.authenticate('linkedin', {
  scope: ['profile']
}), (req, res) => {
  res.redirect('/');
});

router.get('/linkedin/callback', middleware.passport.authenticate('linkedin', {
  successRedirect: '/profile',
  failureRedirect: '/auth/login'
}));

module.exports = router;
