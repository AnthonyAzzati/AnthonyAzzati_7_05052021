"use strict"

// importation des packages
const express = require("express")
const router = express.Router()

// appel du middleware d'authentification
const auth = require("../middleware/authentification")

// appel du user Controller
const userCtrl = require("../controllers/userCtrl")

// Routes liées à l'utilisateur
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.delete("/delete", auth, userCtrl.deleteUser)

module.exports = router
