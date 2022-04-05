const mongooes = require("mongoose");
const questionSchema = require("./schema");
const MODEL_NAME = "questions";
const COLLECTION_NAME = "questions";
const model = mongooes.model(MODEL_NAME, questionSchema, COLLECTION_NAME);

module.exports = model;