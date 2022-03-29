const express = require("express");
const router = new express.Router();

const authHandlers = require("./modules/auth")

router.get("/", (req, res) => {
    res.send('Hello dmsm')
})

router.post("/api/auth/sign-up", authHandlers.signUp)
router.post("/api/auth/sign-in", authHandlers.signIn)
router.post("/api/auth/forgot-password", authHandlers.forgotPassword)
router.post("/api/auth/reset-password", authHandlers.resetPassword)

module.exports = router