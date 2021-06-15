"use strict"

module.exports = {
  signup:
    "INSERT INTO Users (email, password, username, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
  login: "SELECT * FROM Users WHERE username = ?",
  deleteUser: "DELETE FROM Users WHERE id = ?",
  createPost:
    "INSERT INTO Posts (id_user, title, text, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
  getAllPosts: "SELECT * FROM Posts ORDER BY created_at DESC",
  getSpecificPost: "SELECT * FROM Posts WHERE id = ?",
  deletePost: "DELETE FROM Posts WHERE Posts.id = ?",
  getAllComments:
    "SELECT * FROM COMMENTS WHERE id_post = ? ORDER BY created_at DESC",
  createComment:
    "INSERT INTO Comments (id_post, id_user, text, image_url, created_at) VALUES (?, ?, ?, ?, NOW()",
  getSpecificComment:
    "SELECT Comments.id_user FROM Comments WHERE Comments.id = ?",
  deleteComment: "DELETE FROM Comments WHERE id = ?",
}
