"use strict"

const express = require("express")
const path = require("path")
const helmet = require("helmet")
const cors = require("cors")
const app = express()

const usersRoutes = require("./routes/usersRoutes")
const postsRoutes = require("./routes/postsRoutes")
const commentsRoutes = require("./routes/commentsRoutes")

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use("/api/user", usersRoutes)
app.use("/api/post", postsRoutes)
app.use("/api/comment", commentsRoutes)

app.use(
  "/backend/server/images",
  express.static(path.join(__dirname, "images"))
)

module.exports = app
