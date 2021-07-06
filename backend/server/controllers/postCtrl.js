"use strict"
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
    imageUrl: req.file.filename
      ? `${req.protocol}://${req.get("host")}/server/images/${
          req.file.filename
        }`
      : null,
    idUser: req.body.idUser,
  })

  db.query(
    query.createPost,
    [CreatePost.idUser, CreatePost.title, CreatePost.text, CreatePost.imageUrl],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).json({ error })
      }
      return res.status(201).json({ message: "Votre post a bien été créé." })
    }
  )
}

// Récupérer tout les posts
exports.getAllPosts = (req, res, next) => {
  db.query(query.getAllPosts, (error, results) => {
    if (error) {
      return res.status(500).json({ error })
    }
    return res.status(200).json({ results })
  })
}

// Supprimer un post
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  const decodedToken = jwt.verify(token, "RANDOM_SECRET")
  const userId = decodedToken.userId
  const roleId = decodedToken.roleId
  const postId = req.query.postId

  db.query(query.getSpecificPost),
    [postId],
    (error, data, fields) => {
      if (error) {
        res.status(401).send({
          message: "Vous ne pouvez pas supprimer cette publication.",
        })
      }
      const filename = data[0].image.split("/images/")[1]
      if (roleId == 2 || data[0].id_user == userId) {
        fs.unlink(`images/${filename}`, () => {
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
