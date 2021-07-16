"use strict"

// importation des packages
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../../config/dabatase")
const passwordValidator = require("password-validator")

// importation des requêtes préparées
const query = require("../../config/query")

// Vérifie que le mot de passe a entre 8 et 60 caractères
// au moins 1 Majuscule, 1 minuscule, 1 chiffre
// ne contient pas d'espace
const checkPassword = new passwordValidator()
checkPassword
  .is()
  .min(8)
  .is()
  .max(60)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()

// Enregistre l'utilisateur
exports.signup = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  const email = req.body.email
  const username = req.body.username
  const password = hash
  const role_id = 3

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hash,
  }
  const token = jwt.sign({ user }, "RANDOM_SECRET")

  // si le mot de passe vérifie les prérequis
  if (checkPassword.validate(req.body.password)) {
    db.query(
      query.signup,
      [email, password, username, role_id],
      (error, results) => {
        // erreur lors de la requête "signup"
        if (error) {
          res.status(500).send({ message: error.message })
        }
        // succès
        res.status(201).json({
          token,
          email: user.email,
          username: user.username,
        })
      }
    )
  }
  // retourne une erreur si le mot de passe ne respecte pas les prérequis
  else {
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir entre 8 et 60 caractères, au minimum 1 majuscule, au minimum 2 chiffres et ne doit pas contenir d'espaces.",
    })
  }
}

// Permet de connecter l'utilisateur
exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  // vérifie que tout les champs sont remplis
  if (!username || !password) {
    return res
      .status(500)
      .json({ error: "Tout les champs doivent être remplis." })
  }

  // requête "login"
  db.query(query.login, [username], (error, results) => {
    // affiche l'erreur dans la requête
    if (error) {
      console.error(error)
    }
    // si succès, vérifie le mdp rentré par l'utilisateur et celui
    // hashé dans la database
    else {
      bcrypt
        .compare(password, results[0].password)
        .then((valid) => {
          // erreur si les mdp ne correspondent pas
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect." })
          }
          // succès, retourne au front l'id utilisateur, le token, le role_id, le username et l'email
          else {
            return res.status(200).json({
              id: results[0].id,
              token: jwt.sign({ id: results[0].id }, "RANDOM_SECRET", {
                expiresIn: "24h",
              }),
              roleId: results[0].role_id,
              username: results[0].username,
              email: results[0].email,
            })
          }
        })
        // récupère l'erreur dans la promise
        .catch((error) => res.status(500).send({ message: error.message }))
    }
  })
}

// Supprime l'utilisateur
exports.deleteUser = (req, res, next) => {
  const id = req.body.id

  // requête deleteUser
  db.query(query.deleteUser, [id], (error, results) => {
    // si erreur dans la requête retourne l'erreur
    if (error) {
      console.error(error)
      return res.status(400).json({ error })
    }

    // succès, retourne le résultat de la suppression
    return res.status(200).json({ results })
  })
}
