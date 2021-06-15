"user strict"

class Post {
  constructor(post) {
    this.title = post.title
    this.text = post.text
    this.imageUrl = post.imageUrl
    this.idUser = post.idUser
    this.createdAt = post.createdAt
    this.updatedAt = post.updatedAt
  }
}

module.exports = Post
