const { Sequelize } = require("sequelize");
const path = require("path");

let sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(path.dirname(__filename), "data.sqlite"),
});
const db = {
  sequelize: sequelize,
};
module.exports = db;
