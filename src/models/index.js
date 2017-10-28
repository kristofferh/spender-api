import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import db from "../config/db.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = db[env];

let models = {};

// Create new database connection
const connection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  { ...dbConfig, operatorsAliases: Sequelize.Op }
);

// Attempt to connect
connection
  .authenticate()
  .then(() => {
    console.info("INFO - Database connected.");
  })
  .catch(err => {
    console.error("ERROR - Unable to connect to the database:", err);
  });

// Register models.
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function(file) {
    const model = connection.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

models.sequelize = connection;
models.Sequelize = Sequelize;

export default models;
