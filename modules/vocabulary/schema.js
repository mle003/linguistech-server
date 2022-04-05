const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  topic: {
    type: String
  },
  word: {
    type: String
  },
  pronoun: {
    type: String
  },
  synonym: {
    type: String
  },
  type: {
    type: String
  },
  definition: {
    type: String
  },
  example: {
    type: String
  },
  img: {
    type: String
  }
})

module.exports = schema