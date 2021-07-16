"use strict"

// importation des packages
const jwt = require("jsonwebtoken")

require("dotenv").config()

// vérifie le token pour authentifier la connexion
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable"
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: error | "Requête non authentifiée" })
  }
}
