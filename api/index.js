const express = require("express");
const signup = require("./signup");
const login = require("./login");
const verify = require("./verify")

const app = express.Router();

app.use(signup);
app.use(login);
app.use(verify)

module.exports = app;
