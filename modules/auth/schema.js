const mongoose = require("mongoose");

const EMAIL_VALID = function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return EMAIL_VALID(value) || new Error("Email is not valid!");
      },
    },
  },
  userName: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true,
  },
  vocab: {
    type: Array,
  },
  reading: {
    type: Array,
  },
  speaking: {
    type: Array,
  },
  listening: {
    type: Array,
  },
  index: {
    type: Number,
    index: true
  }
})

module.exports = schema