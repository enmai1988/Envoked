'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config')['passport'];
const color = require('colors');
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

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENTID || config.Google.clientID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET || config.Google.clientSecret,
  callbackURL: process.env.GOOGLE_CALLBACKURL || config.Google.callbackURL
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ where: { email: profile.emails[0].value } })
    .then(result => {
      if (result) { return done(null, result); }
      return User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatar: profile.photos[0].value,
        email: profile.emails[0].value
      }).then(user => {
        console.log('google auth: '.yellow, user);
        if (!user) { throw user; }
        done(null, user);
      });
    })
    .catch(err => {
      console.log('passport google: ', err);
      done(null, false);
    });
}));

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.FB_CLIENTID || config.Facebook.clientID,
  clientSecret: process.env.FB_CLIENTSECRET || config.Facebook.clientSecret,
  callbackURL: process.env.FB_CALLBACKURL || config.Facebook.callbackURL,
  profileFields: ['id', 'emails', 'name', 'picture']
}, (accessToken, refreshToken, profile, done) => {
  console.log('fb profile: '.blue, profile);
  User.findOne({ where: { email: profile.emails[0].value } })
    .then(result => {
      if (result) { return done(null, result); }
      return User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatar: profile.photos[0].value,
        email: profile.emails[0].value
      }).then(user => {
        console.log('facebook auth: '.yellow, user);
        if (!user) { throw user; }
        done(null, user);
      });
    })
    .catch(err => {
      console.log('passport facebook: ', err);
      done(null, false);
    });
}));

module.exports = passport;
