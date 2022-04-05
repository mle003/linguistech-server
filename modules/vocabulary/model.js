const mongooes = require("mongoose");
const vocabSchema = require("./schema");
const MODEL_NAME = "vocabulary";
const COLLECTION_NAME = "vocabulary";
const model = mongooes.model(MODEL_NAME, vocabSchema, COLLECTION_NAME);

module.exports = model;