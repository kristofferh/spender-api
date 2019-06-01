import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import config from "../config";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env].db;

let models = {};
let connection;
// Create new database connection
if (dbConfig.use_env_variable) {
  connection = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  connection = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

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
fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    const model = connection.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    const associations = models[modelName].associate(models);
    if (associations) {
      associations.forEach(a => {
        models[modelName][a.name] = a.association;
      });
    }
  }
});

models.sequelize = connection;
models.Sequelize = Sequelize;

export default models;
