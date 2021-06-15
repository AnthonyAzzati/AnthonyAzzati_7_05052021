"use strict"

const express = require("express")
const router = express.Router()

const auth = require("../middleware/authentification")
const multer = require("../middleware/multer-config")

const postCtrl = require("../controllers/postCtrl")

router.post("/createpost", auth, multer, postCtrl.createPost)
router.put("/modifypost/:id", auth, multer, postCtrl.modifyPost)
router.get("/getallposts", auth, multer, postCtrl.getAllPosts)
router.delete("/deletepost/:id", auth, multer, postCtrl.deletePost)

module.exports = router
