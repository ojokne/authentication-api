const express = require("express");
const signup = require("./signup");
const login = require("./login");

const app = express.Router();

app.use(signup);
app.use(login);

module.exports = app;
