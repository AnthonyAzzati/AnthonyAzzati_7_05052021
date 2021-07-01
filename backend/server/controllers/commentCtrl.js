"use strict"

const db = require("../../config/dabatase")
const Comment = require("../models/CommentModel")
const query = require("../../config/query")

exports.getAllComments = (req, res, next) => {
  const postId = req.body.postId
  db.query(query.getAllComments),
    [postId],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error })
      }
      return res.status(200).send({ results })
    }
}

exports.createComment = (req, res, next) => {
  const PostComment = new Comment({
    text: req.body.text,
    imageUrl: req.file
      ? req.protocol + "://" + req.get("host") + "/images/" + req.file.filename
      : null,
    idPost: req.body.idPost,
    idUser: req.body.idUser,
  })

  db.query(query.createComment),
    [PostComment.idPost, PostComment.idUser, PostComment.text, PostComment.imageUrl],
    (error, results) => {
      if (error) {
        res.status(400).json({ error })
      }
      res.status(201).json({ message: "Votre commentaire a bien été créé." })
    }
}

exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
  const userId = decodedToken.userId
  const roleId = decondedToken.roleId
  const commentId = req.query.commentId

  const deleteCom = () => {
    db.query(query.deleteComment),
      [commentId],
      (error, results) => {
        if (error) {
          res.status(401).json({ message: "Vous ne pouvez pas supprimer ce commentaire." })
        }
        res.status(201).json({ message: "Commentaire supprimé." })
      }
  }

  db.query(query.getSpecificComment),
    [commentId],
    (error, data, fields) => {
      if (data[0].id_user == userId) {
        deleteCom()
      } else {
        return res.status(401).send({ message: "Vous ne pouvvez pas supprimer ce commentaire" })
      }
    }
}
