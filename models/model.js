const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.sequelize.define(
  "USER",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "oen",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    code: {
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
