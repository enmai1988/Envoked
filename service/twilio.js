const color = require('colors');
const config = require('config')['twilio'];
const Twilio = require('twilio');
const client = new Twilio(config.apiKeySid, config.apiKeySecret, { accountSid: config.accountSid });
const ACCOUNT_SID = config.accountSid;
const API_KEY_SID = config.apiKeySid;
const API_KEY_SECRET = config.apiKeySecret;
const AccessToken = Twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ConversationsGrant = AccessToken.ConversationsGrant;

module.exports.getVideoToken = (inviter) => {
  const token = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);
  const grant = new VideoGrant();
  token.identity = inviter.firstName;
  token.addGrant(grant);

  const jwt = token.toJwt();
  return {
    identity: token.identity,
    token: jwt
  };
};

module.exports.updateRoom = (req, res) => {
  console.log('update room req.body'.yellow, req.body);
  client.video.rooms(req.body.sid)
    .update({
      status: 'completed'
    })
    .then(room => {
      console.log('update room to completed'.green, room.status);
      res.sendStatus(200);
    });
};

/* SMS example:
client.messages.create({
    to: "+15558675309",
    from: "+15017250604",
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
}, function(err, message) {
    console.log(message.sid);
});
*/
