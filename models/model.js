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
    resetCode: {
      type: DataTypes.STRING,
      allowNull: true,
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
