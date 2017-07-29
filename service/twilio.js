const accountSid = require('config').twilio['account_sid'];
const apiKeySid = 'SK28afbcbe8f06a8473f58cce833e3f3d9';
const apiKeySecret = 'RkrqJqXZNrVPJmPneHtLK7zMACAOBGsx';
const Twilio = require('twilio');
const client = new Twilio(apiKeySid, apiKeySecret, { accountSid });
// const client = require('twilio')(config.twilio.account_sid, config.twilio.authtoken);
const ACCOUNT_SID = accountSid;
const API_KEY_SID = apiKeySid;
const API_KEY_SECRET = apiKeySecret;
const AccessToken = Twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

module.exports.createVideoRoom = (req, res) => {
  console.log('reqesting to video call');
  client.video.rooms.create({ uniqueName: `${req.user.id}` })
    .then(room => {
      const accessToken = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);
      const grant = new VideoGrant();
      accessToken.identity = room.sid;

      grant.room = room.sid;
      accessToken.addGrant(grant);

      const jwt = accessToken.toJwt();
      console.log(jwt);
      res.send({
        identity: room.sid,
        token: jwt
      });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
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
