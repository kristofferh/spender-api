import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";
import jwt from "express-jwt";
import sgMail from "@sendgrid/mail";

import errors from "./services/error";
import models from "./models";
import schema from "./schema";

// Load .env variables
config();

sgMail.setApiKey(process.env.SG);

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
    secret: process.env.SECRET,
    credentialsRequired: false,
    algorithms: ["HS256"],
  })
);

server
  .get("/_ah/start", function (req, res) {
    res.status(200).send("ok").end();
  })
  .get("/_ah/health", function (req, res) {
    res.status(200).send("ok").end();
  })
  .get("/_ah/stop", function (req, res) {
    res.status(200).send("ok").end();
  });

server.get("/favicon.ico", (req, res) => res.sendStatus(204));

// API
server.use(
  "/",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    pretty: true,
    customFormatErrorFn(err) {
      errors.report(err.originalError);
      if (err.originalError && err.originalError.code) {
        res.status(err.originalError.code);
      }
      return {
        message: err.message,
        code: err.originalError && err.originalError.code,
        locations: err.locations,
        path: err.path,
      };
    },
  }))
);

// Invalid jwt token.
server.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.code).send(err.message);
  } else {
    next();
  }
});

// Create tables
models.sequelize
  .sync()
  .then(() => {
    console.info("INFO - Database sync complete.");
    console.info("SETUP - Starting server");

    // Start web server
    server.listen(port, (error) => {
      if (error) {
        console.error("ERROR - Unable to start server.");
      } else {
        console.info(`INFO - Server started on port ${port}.`);
      }
    });
  })
  .catch((error) => {
    console.error("ERROR - Unable to sync database.", error);
    console.error("ERROR - Server not started.");
  });
