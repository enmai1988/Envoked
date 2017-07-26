'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedinStrategy = require('passport-linkedin').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('config')['passport'];
const { User } = require('../../db/');

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { id: id }, attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatar'] })
    .then(user => {
      if (!user) { throw user; }
      done(null, user.dataValues);
    })
    .catch(err => {
      console.log('passport.deserializeUser: ', err);
      done(null, false, { messages: 'user not found' });
    });
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  // check to see if there is any account with this email address

}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  // fetch any profiles that have a local auth account with this email address

}));

passport.use('google', new GoogleStrategy({
  clientID: config.Google.clientID,
  clientSecret: config.Google.clientSecret,
  callbackURL: config.Google.callbackURL
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOrCreate({
    where: { email: profile.emails[0].value },
    defaults: {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatar: profile.photos[0].value,
      email: profile.emails[0].value
    }
  }).spread(user => {
    if (!user) { throw user; }
    done(null, user);
  }).catch(err => {
    console.log('passport google: ', err);
    done(null, false, { message: 'user not found' });
  });
}));

passport.use('facebook', new FacebookStrategy({
  clientID: config.Facebook.clientID,
  clientSecret: config.Facebook.clientSecret,
  callbackURL: config.Facebook.callbackURL,
  profileFields: ['id', 'emails', 'name', 'picture']
}, (accessToken, refreshToken, profile, done) => {
  console.log('facebook profile: ', profile);
  User.findOrCreate({
    where: { email: profile.emails[0].value },
    defaults: {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatar: profile.photos[0].value,
      email: profile.emails[0].value
    }
  }).spread(user => {
    if (!user) { throw user; }
    done(null, user);
  }).catch(err => {
    console.log('passport google: ', err);
    done(null, false, { message: 'user not found' });
  });
}));

module.exports = passport;
