const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.sequelize.define(
  "USER",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "oen",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const models = {
  User: User,
};

module.exports = models;
