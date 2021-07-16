"use strict"

// Modèle d'un utilisateur
class User {
  constructor(user) {
    this.email = user.email
    this.password = user.password
    this.username = user.username
    this.idRole = user.idRole
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}

module.exports = User
