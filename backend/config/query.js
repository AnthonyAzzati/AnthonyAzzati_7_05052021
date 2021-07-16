"use strict"

// Requêtes préparées
module.exports = {
  // Enregistre l'utilisateur
  signup:
    "INSERT INTO Users (email, password, username, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",

  // Connecte l'utilisateur
  login: "SELECT * FROM Users WHERE username = ?",

  // Modifie les données de l'utilisateur
  updateAccount: "UPDATE Users SET email = ?, username = ? WHERE Users.id = ?",

  // Supprime l'utilisateur
  deleteUser: "DELETE FROM Users WHERE id = ?",

  // Créer un nouveau post
  createPost:
    "INSERT INTO Posts (id_user, post_username, title, text, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",

  // Récupère tout les posts
  getAllPosts: "SELECT * FROM Posts ORDER BY created_at DESC",

  // Récupère un post en focntion de son id
  getSpecificPost: "SELECT * FROM Posts WHERE id = ?",

  // Supprime un post en fonction de son id
  deletePost: "DELETE FROM Posts WHERE Posts.id = ?",

  // Récupère tout les commentaires d'un post en fonction de son id
  getAllComments:
    "SELECT * FROM COMMENTS WHERE id_post = ? ORDER BY created_at DESC",

  // Créer un commentaire
  createComment:
    "INSERT INTO Comments (id_post, id_user, comment_username, text, image_url, created_at) VALUES (?, ?, ?, ?, ?, NOW())",

  // Récupère un commentaire en fonction de son id
  getSpecificComment:
    "SELECT Comments.id_user FROM Comments WHERE Comments.id = ?",

  // Supprime un commentaire en fonction de son id
  deleteComment: "DELETE FROM Comments WHERE id = ?",
}
