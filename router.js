const express = require("express");
const router = new express.Router();

const authHandlers = require("./modules/auth")
const vocabHandlers = require("./modules/vocabulary")
const questionHanlders = require("./modules/question")

router.get("/", (req, res) => {
    res.send('Hello dmsm')
})

//Auth handler
router.post("/api/auth/sign-up", authHandlers.signUp)
router.post("/api/auth/sign-in", authHandlers.signIn)
router.post("/api/auth/forgot-password", authHandlers.forgotPassword)
router.post("/api/auth/reset-password", authHandlers.resetPassword)

//Vocab handler
router.get("/api/vocab/get-vocab-by-topic", vocabHandlers.getVocabByTopic)

//Question handler
router.get("/api/question/get-question-by-type", questionHanlders.getQuestionsByType)

module.exports = router