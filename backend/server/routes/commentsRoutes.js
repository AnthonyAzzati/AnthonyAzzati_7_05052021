"use strict"

// importation des packages
const express = require("express")
const router = express.Router()

// appel des middlewares d'authentification et de multer
const auth = require("../middleware/authentification")
const multer = require("../middleware/multer-config")

// appel du comment Controller
const commentCtrl = require("../controllers/commentCtrl")

// Routes liées aux commentaires
router.get("/getallcomments", auth, commentCtrl.getAllComments)
router.post("/createcomment", auth, multer, commentCtrl.createComment)
router.delete("/deletecomment", auth, commentCtrl.deleteComment)

module.exports = router
