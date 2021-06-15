"use strict";

const mysql = require("mysql2");
const dbConfig = require("./config.js");

const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

db.connect((error) => {
  if (error) {
    console.error("erreur lors de la connexion: " + error.stack);
    return;
  }
  console.log("Connexion à la base de donnée établie");
});

module.exports = db;
