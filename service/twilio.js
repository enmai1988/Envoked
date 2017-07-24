const config = require('config');

const client = require('twilio')(config.twilio.account_sid, config.twilio.authtoken);


/* SMS example: 
client.messages.create({
    to: "+15558675309",
    from: "+15017250604",
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
}, function(err, message) {
    console.log(message.sid);
});
*/
