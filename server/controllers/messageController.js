const Message = require("../models/message");

module.exports.create = (req, res) => {
  const body = req.body;
  const message = new Message(body);
  message
    .save()
    .then((message) => {
      res.json(message);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.list = (req, res) => {
  Message.find()
    .then((message) => {
      res.json(message);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Message.findById(id)
    .then((message) => {
      if (message) {
        res.json(message);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Message.findByIdAndDelete(id).then((message) => {
    if (message) {
      res.json(message);
    } else {
      res.json({});
    }
  });
};
