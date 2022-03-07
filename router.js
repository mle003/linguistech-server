const express = require("express");
const router = new express.Router();

const authHandlers = require("./modules/auth")

router.get("/", (req, res) => {
    res.send('Hello dmmm')
})

router.post("/api/auth/sign-up", authHandlers.signUp)
router.post("/api/auth/sign-in", authHandlers.signIn)

module.exports = router