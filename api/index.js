const express = require("express");
const signup = require("./signup");
const login = require("./login");
const verify = require("./verify")
const request = require("./request")

const app = express.Router();

app.use(signup);
app.use(login);
app.use(verify)
app.use(request)

module.exports = app;
