if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const nodemailer = require("nodemailer");
const models = require("../models/model");
const { response_codes, response_messages } = require("./response");

const app = express.Router();

app.post("/request", async (req, res) => {
  let response_code;
  let response_message;
  if (req.body.hasOwnProperty("email")) {
    const email = req.body.email;
    if (email.length < 1) {
      response_code = response_codes.TWO;
      response_message = response_messages.TWO;
    } else {
      let userReturned = await models.User.findOne({
        where: {
          email: email,
        },
      });

      if (userReturned) {
        if (userReturned.verified) {
          response_code = 5;
          response_message = "User is already verified";
        } else {
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
          await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: userCreated.email,
            subject: "verification code",
            text: userCreated.code,
          });
          response_code = response_codes.ZER0;
          response_message = response_messages.ZER0;
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
  res.json({ response_code, response_message });
});

module.exports = app;
