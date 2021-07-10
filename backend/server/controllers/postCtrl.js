"use strict"

// importation des packages
const db = require("../../config/dabatase")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const Post = require("../models/PostModel")
const query = require("../../config/query")

// Créer un post
exports.createPost = (req, res, next) => {
  const CreatePost = new Post({
    title: req.body.title,
    text: req.body.text,
    // vérifie qu'une image est envoyée par le front, récupère l'URL de stockage OU envoie NULL à la DB
    imageUrl: req.file.filename
      ? `${req.protocol}://${req.get("host")}/backend/server/images/${
          req.file.filename
        }`
      : null,
    idUser: req.body.idUser,
    username: req.body.username,
  })

  // requête createPost
  db.query(
    query.createPost,
    [
      CreatePost.idUser,
      CreatePost.username,
      CreatePost.title,
      CreatePost.text,
      CreatePost.imageUrl,
    ],
    (error, results) => {
      // si erreur, retourne l'erreur
      if (error) {
        console.error(error)
        res.status(500).json({ error })
      }
      // succès, envoie au front le succès
      return res.status(201).json({ message: "Votre post a bien été créé." })
    }
  )
}

// Récupérer tout les posts
exports.getAllPosts = (req, res, next) => {
  // requête getAllPosts
  db.query(query.getAllPosts, (error, results) => {
    // si erreur, retourne l'erreur
    if (error) {
      console.error(error)
      return res.status(500).json({ error })
    }
    // succès, retourne le succès au front
    return res.status(200).json({ results })
  })
}

// Supprimer un post
exports.deletePost = (req, res, next) => {
  // vérifie le token envoyé par le front
  const token = req.headers.authorization.split(" ")[1]
  const decodedToken = jwt.verify(token, "RANDOM_SECRET")
  const userId = decodedToken.userId
  const roleId = decodedToken.roleId
  const postId = req.query.postId

  // requête getSpecificPost
  db.query(query.getSpecificPost),
    [postId],
    (error, data, fields) => {
      // si erreur dans la suppression
      if (error) {
        res.status(401).send({
          message: "Vous ne pouvez pas supprimer cette publication.",
        })
      }
      const filename = data[0].image.split("/images/")[1]

      // vérifie que l'utilisateur qui supprime le post est celui qui
      // l'a créé OU l'utilisateur possède les droits Modérateur
      if (roleId == 2 || data[0].id_user == userId) {
        fs.unlink(`backend/server/images/${filename}`, () => {
          db.query(query.deletePost),
            [postId],
            (error, data, fields) => {
              if (error) {
                return res.status(404).json({ error })
              }
              res.status(201).json({ message: "Publication supprimée" })
            }
        })
      }
    }
}
