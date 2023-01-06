const express = require("express");
const models = require("../models/model");
const { response_codes, response_messages } = require("./response");


const app = express.Router();

app.post("/verify", async (req, res) => {
  let response_code;
    let response_message;
    let user
  if (
    req.body.hasOwnProperty("email") &&
    req.body.hasOwnProperty("code")
  ) {
      const email = req.body.email.trim();
      const code = req.body.code.trim()
    if (email.length < 1|| (code.length<1))   {
      response_code = response_codes.TWO;
      response_message = response_messages.TWO;
    } else {
      let userReturned = await models.User.findOne({
        where: {
          email: email,
        },
      });

        if (userReturned) {
          if (code == userReturned.code) {
            if (userReturned.verified) {
                response_code = 5;
                response_message = "User is already verified";
            } else {
              userReturned.verified = true
              userReturned.save()
              response_code = response_codes.ZER0;
              response_message = response_messages.ZER0;
              user = {
                id: userReturned.id,
                email: userReturned.email,
                verified: userReturned.verified,
              };
            }
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
  res.json({ response_code, response_message,user });
});

module.exports = app;
