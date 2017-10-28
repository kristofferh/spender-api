import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import graphqlHTTP from "express-graphql";

// Load .env variables
config();

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
