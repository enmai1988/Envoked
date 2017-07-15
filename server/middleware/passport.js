'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedinStrategy = require('passport-linkedin').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('config')['passport'];
const models = require('../../db/models');

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
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
  done(null, profile);
}));

passport.use('facebook', new FacebookStrategy({
  clientID: config.Facebook.clientID,
  clientSecret: config.Facebook.clientSecret,
  callbackURL: config.Facebook.callbackURL,
  profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, done) => {
  console.log('facebook profile: ', profile);
  done(null, profile);
}));

// passport.use('linkedin', new LinkedinStrategy({
//   consumerKey: config.Linkedin.clientID,
//   consumerSecret: config.Linkedin.clientSecret,
//   callbackURL: config.Linkedin.callbackURL
// }, (accessToken, refreshToken, profile, done) => {
//
// }));

module.exports = passport;
