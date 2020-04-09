import db from "./db.js";

module.exports = {
  development: {
    webEndpoint: "http://localhost:3001",
    db: db["development"],
  },
  test: {
    webEndpoint: "http://localhost:3001",
    db: db["test"],
  },
  production: {
    webEndpoint: "https://spender-webapp-dev.herokuapp.com",
    db: db["production"],
  },
};
