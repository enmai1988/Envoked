'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('config')['passport'];
const models = require('../../db/models');

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => {

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

}));

passport.use('facebook', new FacebookStrategy({
  clientID: config.Facebook.clientID,
  clientSecret: config.Facebook.clientSecret,
  callbackURL: config.Facebook.callbackURL,
  profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, done) => {

}));

// REQUIRES PERMISSIONS FROM TWITTER TO OBTAIN USER EMAIL ADDRESSES
// passport.use('twitter', new TwitterStrategy({
//   consumerKey: config.Twitter.consumerKey,
//   consumerSecret: config.Twitter.consumerSecret,
//   callbackURL: config.Twitter.callbackURL,
//   userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
// },
//   (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('twitter', profile, done))
// );



module.exports = passport;
