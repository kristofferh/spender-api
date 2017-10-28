import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import graphqlHTTP from "express-graphql";
import { Sequelize } from "sequelize";

import db from "./config/db.js";

// Load .env variables
config();
const env = process.env.NODE_ENV || "development";

// Create express server
const server = express();

const dbConfig = db[env];

// Enable CORS
server.use(cors());

// Request body parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Request body cookie parser
server.use(cookieParser());

// HTTP logger
server.use(morgan("tiny"));

// API (GraphQL on route `/api`)
// server.use(
//   config.graphqlEndpoint,
//   graphqlHTTP(() => ({
//     schema,
//     graphiql: process.env.NODE_ENV === "development",
//     pretty: config.graphql.pretty
//   }))
// );

// Create new database connection
const connection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  { ...dbConfig, operatorsAliases: Sequelize.Op }
);

connection
  .authenticate()
  .then(() => {
    console.info("INFO - Database connected.");
  })
  .catch(err => {
    console.error("ERROR - Unable to connect to the database:", err);
  });
