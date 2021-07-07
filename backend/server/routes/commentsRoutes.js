"use strict"

const express = require("express")
const router = express.Router()

const auth = require("../middleware/authentification")
const multer = require("../middleware/multer-config")

const commentCtrl = require("../controllers/commentCtrl")

// Routes liées aux commentaires
router.get("/:id/comments", auth, commentCtrl.getAllComments)
router.post("/createcomment", auth, multer, commentCtrl.createComment)
router.delete("deletecomment/:id", auth, commentCtrl.deleteComment)

module.exports = router
