"user strict"

// Modèle d'un post
class Post {
  constructor(post) {
    this.title = post.title
    this.text = post.text
    this.imageUrl = post.imageUrl
    this.idUser = post.idUser
    this.username = post.username
    this.createdAt = post.createdAt
    this.updatedAt = post.updatedAt
  }
}

module.exports = Post
