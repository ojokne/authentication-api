const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const models = require("../models/model");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
router.post("/signup", async (req, res) => {
  let message = "User created successfully";
  let status = 200;
  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("password")
  ) {
    const username = req.body.username;
    const password = req.body.password;
    if (username.length < 1 || password.length < 1) {
      message = "Please populate all fields";
      status = 400;
    } else {
      let user = await models.User.findOne({
        where: {
          username: username,
        },
      });

      if (user) {
        message = "There is already a user with that username";
        status = 400;
      } else {
        let passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        user = await models.User.create({
          username: username,
          password: passwordHash,
        });
      }
    }
  } else {
    message = "Please include all fields";
  }
  res.status(status).json({ message: message });
});

router.post("/login", async (req, res) => {
  let message = "success";
  let status = 200;
  let token;
  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("password")
  ) {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    if (username.length < 1 || password.length < 1) {
      message = "Please populate all fields";
      status = 400;
    } else {
      const user = await models.User.findOne({
        where: {
          username: username,
        },
      });
      if (user) {
        let passwordVerified = bcrypt.compare(password, user.password);
        if (passwordVerified) {
          try {
            token = jwt.sign(
              { username: username, password: password },
              SECRET_KEY
            );
          } catch (err) {
            console.log(err);
          }
        } else {
          message = "Incorrect username or password";
        }
      } else {
        message = "No record found";
      }
    }
  } else {
    message = "Please include all fields";
  }

  res.status(status).json({ token: token, message: message });
});

module.exports = router;
