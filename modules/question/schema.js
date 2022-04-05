const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: {
    type: String
  },
  skill: {
    type: String
  },
  content: {
    type: String
  }
})

module.exports = schema