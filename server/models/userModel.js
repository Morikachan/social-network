const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  activationSecret: {
    type: String,
    required: true,
  },
});

module.exports = model("user", userSchema);
