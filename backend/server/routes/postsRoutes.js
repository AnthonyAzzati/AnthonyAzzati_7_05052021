"use strict"

// importation des packages
const express = require("express")
const router = express.Router()

// appel des middlewares d'authentification et de multer
const auth = require("../middleware/authentification")
const multer = require("../middleware/multer-config")

// appel du post Controller
const postCtrl = require("../controllers/postCtrl")

// Routes liées aux posts
router.post("/createpost", auth, multer, postCtrl.createPost)
router.get("/getallposts", auth, multer, postCtrl.getAllPosts)
router.delete("/deletepost", auth, multer, postCtrl.deletePost)

module.exports = router
