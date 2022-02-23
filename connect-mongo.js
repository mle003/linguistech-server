const mongoose = require("mongoose")
require('dotenv').config();

const uri = `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.ccow1.mongodb.net/Linguistech?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect success to MongoDB")
  })
  .catch((err) => {
    console.error("Connect failed to MongoDB")
    console.error(err)
  });

