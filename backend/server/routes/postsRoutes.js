"use strict"

const express = require("express")
const router = express.Router()

const auth = require("../middleware/authentification")
const multer = require("../middleware/multer-config")

const postCtrl = require("../controllers/postCtrl")

// Routes liées aux posts
router.post("/createpost", auth, multer, postCtrl.createPost)
router.get("/getallposts", auth, multer, postCtrl.getAllPosts)
router.delete("/deletepost/:id", auth, multer, postCtrl.deletePost)

module.exports = router
