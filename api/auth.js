const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const models = require("../models/model");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const response_codes = {
  ZER0: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
};
const response_messages = {
  ZER0: "Success",
  ONE: "Provide all fields",
  TWO: "Populate all fields",
  THREE: "User already exists",
  FOUR: "Incorrect credentials",
};
router.post("/signup", async (req, res) => {
  let response_code;
  let response_message;
  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("password")
  ) {
    const username = req.body.username;
    const password = req.body.password;
    if (username.length < 1 || password.length < 1) {
      response_code = response_codes.TWO;
      response_message = response_messages.TWO;
    } else {
      let user = await models.User.findOne({
        where: {
          username: username,
        },
      });

      if (user) {
        response_code = response_codes.THREE;
        response_message = response_messages.THREE;
      } else {
        let passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        user = await models.User.create({
          username: username,
          password: passwordHash,
        });
        response_code = response_codes.ZER0;
        response_message = response_messages.ZER0;
      }
    }
  } else {
    response_code = response_codes.ONE;
    response_message = response_messages.ONE;
  }
  res.json({ response_code, response_message });
});

router.post("/login", async (req, res) => {
  let response_code;
  let response_message;
  let token;
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
      const user = await models.User.findOne({
        where: {
          username: username,
        },
      });
      if (user) {
        let passwordVerified = await bcrypt.compare(password, user.password);
        if (passwordVerified) {
          try {
            token = jwt.sign(
              { username: username, password: password },
              SECRET_KEY
            );
          } catch (err) {
            console.log(err);
          }
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

  res.json({ token, response_code, response_message });
});

module.exports = router;
