require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./api/index");
const db = require("./db");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", auth);
app.get("/", (req, res) => {
  res.json({ message: "Success, please read documentation to use this api" });
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

// create();
// uncomment to create database

// function to create the databse
async function create() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: true });
    console.log("Created");
  } catch (err) {
    console.log(err);
  }
}
