const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('config')['redis'];
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: config.host,
    port: 6379
  }),
  secret: '55iW',
  resave: false,
  saveUninitialized: false
});
