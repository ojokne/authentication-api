const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const models = require("../models/model");
const jwt = require("jsonwebtoken");
const { response_codes, response_messages } = require("./response");

const app = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

app.post("/login", async (req, res) => {
  let response_code;
  let response_message;
  let token;
  let user;
  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("password")
  ) {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    if (username.length < 1 || password.length < 1) {
      response_code = response_codes.TWO;
      response_message = response_messages.TWO;
    } else {
      const userReturned = await models.User.findOne({
        where: {
          username: username,
        },
      });
      if (userReturned) {
        let passwordVerified = await bcrypt.compare(
          password,
          userReturned.password
        );
        if (passwordVerified) {
          try {
            token = jwt.sign(
              { username: username, password: password },
              SECRET_KEY
            );
          } catch (err) {
            console.log(err);
          }
          user = {
            id: userReturned.id,
            username: userReturned.username,
            verified: userReturned.verified
          };
          response_code = response_codes.ZER0;
          response_message = response_messages.ZER0;
        } else {
          response_code = response_codes.FOUR;
          response_message = response_messages.FOUR;
        }
      } else {
        response_code = response_codes.FOUR;
        response_message = response_messages.FOUR;
      }
    }
  } else {
    response_code = response_codes.ONE;
    response_message = response_messages.ONE;
  }

  res.json({ token, response_code, response_message, user });
});

module.exports = app;
