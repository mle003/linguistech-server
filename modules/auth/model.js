const mongooes = require("mongoose");
const userSchema = require("./schema");
const MODEL_NAME = "user";
const COLLECTION_NAME = "user";
const model = mongooes.model(MODEL_NAME, userSchema, COLLECTION_NAME);

module.exports = model;
