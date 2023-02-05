const Contact = require("../models/contact");

module.exports.create = (req, res) => {
  const body = req.body;
  const contact = new Contact(body);

  contact
    .save()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

module.exports.list = (req, res) => {
  Contact.find()
    .then((contact) => {
      res.json(contact);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Contact.findById(id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
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
  Contact.findByIdAndDelete(id).then((contact) => {
    if (contact) {
      res.json(contact);
    } else {
      res.json({});
    }
  });
};
