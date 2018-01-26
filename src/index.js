import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import graphqlHTTP from "express-graphql";
import jwt from "express-jwt";

import models from "./models";
import schema from "./schema";

// Load .env variables
config();

// Use environment defined port or 3000
const port = process.env.PORT || 3000;

// Create express server
const server = express();

server.set("trust proxy", true);
// Enable CORS
server.use(cors());

// Request body parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Request body cookie parser
server.use(cookieParser());

// HTTP logger
server.use(morgan("tiny"));

// Add Json web token middleware
server.use(
  jwt({
    secret: "pizza",
    credentialsRequired: false
  })
);

server
  .get("/_ah/start", function(req, res) {
    res
      .status(200)
      .send("ok")
      .end();
  })
  .get("/_ah/health", function(req, res) {
    res
      .status(200)
      .send("ok")
      .end();
  })
  .get("/_ah/stop", function(req, res) {
    res
      .status(200)
      .send("ok")
      .end();
  });

// API
server.use(
  "/",
  graphqlHTTP(() => ({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    pretty: true
  }))
);

// Create tables
models.sequelize
  .sync()
  .then(() => {
    console.info("INFO - Database sync complete.");

    console.info("SETUP - Starting server");

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
