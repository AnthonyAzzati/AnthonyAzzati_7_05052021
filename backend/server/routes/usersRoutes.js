"use strict"

const express = require("express")
const router = express.Router()

const auth = require("../middleware/authentification")

const userCtrl = require("../controllers/userCtrl")

// Routes liées à l'utilisateur
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.put("/update", auth, userCtrl.updateAccount)
router.delete("/delete", auth, userCtrl.deleteUser)

module.exports = router
