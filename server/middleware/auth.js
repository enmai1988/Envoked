const session = require('express-session');
const url = require('url');
const RedisStore = require('connect-redis')(session);
const config = require('config')['redis'];
const redis = require('redis');

let client, options;
if (process.env.REDISTOGO_URL) {
  let rtg = url.parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient(6379, config.host);
}




module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

module.exports.session = session({
  store: new RedisStore({ client }),
  secret: '55iW',
  resave: false,
  saveUninitialized: false
});
