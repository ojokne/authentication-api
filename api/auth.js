const express = require("express");
const router = express.Router();
const db = require("../db");
const models = require("../models/model");

const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  let message = "User created successfully";
  let status = 200;

  if (username.length < 1 || password.length < 1) {
    message = "Please fill in all fields";
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
      user = await models.User.create({
        username: username,
        password: password,
      });
    }
  }
  res.status(status).json({ message: message });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let token;
  let message = "success";
  const user = await models.User.findOne({
    where: {
      username: username,
    },
  });
  if (user && user.password == password) {
    try {
      token = jwt.sign({ username: username, password: password }, SECRET_KEY);
    } catch (err) {
      console.log(err);
    }
  } else {
    message = "Incorrect username or password";
  }
  res.status(200).json({ token: token, message: message });
});

module.exports = router;
