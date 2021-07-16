"use strict"

const db = require("../../config/dabatase")
const Comment = require("../models/CommentModel")
const query = require("../../config/query")
const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")

require("dotenv").config()

// Récupère tout les commentaires
exports.getAllComments = (req, res, next) => {
  const idPost = req.query.id

  // requête getAllComments
  db.query(query.getAllComments, [idPost], (error, results) => {
    // erreur, retourne l'erreur
    if (error) {
      console.error(error)
      return res.status(500).json({ error })
    }
    // succès, retourne la réponse
    return res.status(200).send({ results })
  })
}

// Créer un commentaire
exports.createComment = (req, res, next) => {
  const PostComment = new Comment({
    idPost: req.body.idPost,
    idUser: req.body.idUser,
    text: req.body.text,
    // enregistre l'image dans backend/server/images OU envoie NULL à la DB
    imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/backend/server/images/${
          req.file.filename
        }`
      : null,
    username: req.body.username,
  })

  // requête createComment
  db.query(
    query.createComment,
    [
      PostComment.idPost,
      PostComment.idUser,
      PostComment.username,
      PostComment.text,
      PostComment.imageUrl,
    ],
    (error, results) => {
      // erreur, retourne l'erreur
      if (error) {
        console.error(error)
        res.status(400).json({ error })
      }
      // succès, retourne la réponse
      res.status(201).json({ message: "Votre commentaire a bien été créé." })
    }
  )
}

// Supprime un commentaire
exports.deleteComment = (req, res, next) => {
  // vérifie le token
  const token = req.headers.authorization.split(" ")[1]
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
  const userId = decodedToken.userId
  const commentId = req.body.commentId

  // Vérifie que l'utilisateur a les droits pour supprimer le commentaire
  db.query(query.getSpecificComment, [commentId], (error, data, fields) => {
    if (error) {
      res.status(401).send({
        message: "Vous ne pouvez pas supprimer cette publication.",
      })
    }

    const filename = data[0].image_url.split("/backend/server/images/")[1]

    fs.unlink(path.resolve() + "/server/images/" + filename, (error) => {
      if (error) {
        console.error(error)
      } else {
        db.query(query.deleteComment, [commentId], (error, results) => {
          // erreur, retourne l'erreur
          if (error) {
            console.error(error)
            res
              .status(401)
              .json({ message: "Vous ne pouvez pas supprimer ce commentaire." })
          }
          // succès, retourne la réponse
          res.status(201).json({ message: "Commentaire supprimé." })
        })
      }
    })
  })
}
