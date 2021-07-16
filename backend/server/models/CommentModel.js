"use strict"

// Modèle d'un commentaire
class Comment {
  constructor(comment) {
    this.text = comment.text
    this.imageUrl = comment.imageUrl
    this.idPost = comment.idPost
    this.idUser = comment.idUser
    this.username = comment.username
    this.createdAt = comment.createdAt
  }
}

module.exports = Comment
