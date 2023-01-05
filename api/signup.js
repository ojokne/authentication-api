require('dotenv').config()
const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const db = require("../db");
const models = require("../models/model");
const { response_codes, response_messages } = require("./response");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const app = express.Router();

app.post("/signup", async (req, res) => {
  let response_code;
  let response_message;
  let user;
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
      let userReturned = await models.User.findOne({
        where: {
          username: username,
        },
      });

      if (userReturned) {
        response_code = response_codes.THREE;
        response_message = response_messages.THREE;
      } else {
        let code = ''
        for (let i = 0; i < 5; i++) {
          c = parseInt((Math.random()*1e16)%10)
          code +=c
        }
        let passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        userCreated = await models.User.create({
          username: username,
          password: passwordHash,
          code: code
        });
        user = {
          id: userCreated.id,
          username: userCreated.username,
          verified: userCreated.verified
        };
          //  code to send email
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.ADMIN_EMAIL, 
            pass: process.env.APP_PASSWORD,
          },
        });
        let info = await transporter.sendMail({
          from: "ojokne@gmail.com",
          to: userCreated.username,
          subject: "verification code",
          text:userCreated.code
        })
        console.log(`Message sent ${info.messageId}`);
        response_code = response_codes.ZER0;
        response_message = response_messages.ZER0;
      }
    }
  } else {
    response_code = response_codes.ONE;
    response_message = response_messages.ONE;
  }
  res.json({ response_code, response_message, user });
});

module.exports = app;
