const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);

const smsTwillio = (req, res, next) => {
  const msg = req.body;
  console.log("Message", msg);
  client.messages
    .create({
      from: "+19255155823",
      to: `+91${msg.mobile}`,
      body: msg.message,
    })
    .then((message) =>
      console.log(
        `Message Sucessfully Send to ${message.to} The message is => ${message.body}. form number ${message.from} and message sent id is => ${message.sid} . Thank You..!!`
      )
    )
    .catch((err) => console.log("Eroor", err));
  next();
};

module.exports = smsTwillio;
