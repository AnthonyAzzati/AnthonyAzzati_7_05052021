"use strict"

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../../config/dabatase")

const passwordValidator = require("password-validator")

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

  if (checkPassword.validate(req.body.password)) {
    db.query(
      query.signup,
      [email, password, username, role_id],
      (error, results) => {
        if (error) {
          res.status(500).send({ message: error.message })
        }
        res.status(201).json({
          token,
          email: user.email,
          username: user.username,
        })
      }
    )
  } else {
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
  if (!username || !password) {
    return res
      .status(500)
      .json({ error: "Tout les champs doivent être remplis." })
  }
  db.query(query.login, [username], (error, results) => {
    if (error) {
      console.error(error)
    } else {
      bcrypt
        .compare(password, results[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect." })
          } else {
            return res.status(200).json({
              id: results[0].id,
              token: jwt.sign({ id: results[0].id }, "RANDOM_SECRET", {
                expiresIn: "24h",
              }),
              username: results[0].username,
              email: results[0].email,
            })
          }
        })
        .catch((error) => res.status(500).send({ message: error.message }))
    }
  })
}

// Modifie les données du compte de l'utilisateur
exports.updateAccount = (req, res, next) => {
  const email = req.body.data.email
  const username = req.body.data.username
  const id = req.body.data.id

  db.query(query.updateAccount, [email, username, id], (error, results) => {
    if (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
    return res.status(200).json({ results })
  })
}

// Supprime l'utilisateur
exports.deleteUser = (req, res, next) => {
  const id = req.body.id

  db.query(query.deleteUser, [id], (error, results) => {
    if (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
    return res.status(200).json({ results })
  })
}
