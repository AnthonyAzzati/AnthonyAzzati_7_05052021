"use strict"

// importation des packages
const express = require("express")
const path = require("path")
const helmet = require("helmet")
const cors = require("cors")
const app = express()

// importation des routes du projet
const usersRoutes = require("./routes/usersRoutes")
const postsRoutes = require("./routes/postsRoutes")
const commentsRoutes = require("./routes/commentsRoutes")

// middleware contre l'injection SQL
app.use(helmet())

// middleware pour les CORS
app.use(cors())

// middleware pour transformer le cors du body en JSON
app.use(express.json())

// appel des routes de l'API
app.use("/api/user", usersRoutes)
app.use("/api/post", postsRoutes)
app.use("/api/comment", commentsRoutes)

// permet d'utiliser les images stockées dans backend/server/images
app.use(
  "/backend/server/images",
  express.static(path.join(__dirname, "images"))
)

// initiation du serveur express
module.exports = app
