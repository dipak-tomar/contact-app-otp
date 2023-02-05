const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

messageSchema.pre("save", function (next) {
  const message = this;
  if (message.isNew) {
    console.log(" its new message", message);
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
