"use strict"

// paramètres de connexion à la base de données au niveau local
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "groupomania_social_media",
  PORT: "3306",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
