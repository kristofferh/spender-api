import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import graphqlHTTP from "express-graphql";

import models from "./models";

// Load .env variables
config();

// Use environment defined port or 3000
const port = process.env.PORT || 3000;

// Create express server
const server = express();

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

// Create tables
models.sequelize
  .sync({ force: true })
  .then(() => {
    console.info("INFO - Database sync complete.");

    console.info("SETUP - Starting server...");

    // Start web server
    server.listen(port, error => {
      if (error) {
        console.error("ERROR - Unable to start server.");
      } else {
        console.info(`INFO - Server started on port ${port}.`);
      }
    });
  })
  .catch(() => {
    console.error("ERROR - Unable to sync database.");
    console.error("ERROR - Server not started.");
  });
