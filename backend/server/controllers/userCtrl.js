"use strict"

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../../config/dabatase")

const passwordValidator = require("password-validator")

const query = require("../../config/query")

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
  const token = jwt.sign({ user }, "RANDOM_SECRET_KEY")

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
              token: jwt.sign({ id: results[0].id }, "RANDOM_SECRET_TOKEN", {
                expiresIn: "24h",
              }),
            })
          }
        })
        .catch((error) => res.status(500).send({ message: error.message }))
    }
  })
}

exports.deleteUser = (req, res, next) => {
  const id = req.body.id

  db.query(query.deleteUser, [id], (error, results) => {
    if (error) {
      return res.status(400).json({ error })
    }
    return res.status(200).json({ results })
  })
}