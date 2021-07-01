"use strict"

const express = require("express")
const path = require("path")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const app = express()

const usersRoutes = require("./routes/usersRoutes")
const postsRoutes = require("./routes/postsRoutes")
const commentsRoutes = require("./routes/commentsRoutes")

app.use(bodyParser.json())
app.use(helmet())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})

app.use("/api/user", usersRoutes)
app.use("/api/post", postsRoutes)
app.use("/api/comment", commentsRoutes)

app.use("/images", express.static(path.join(__dirname, "/images")))

module.exports = app
