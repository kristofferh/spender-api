require("dotenv").config();

module.exports = {
  development: {
    username: "local-dev",
    password: "local",
    database: "spender",
    host: "localhost",
    dialect: "postgres",
    port: 5432, // 3306 for mysql,
    logging: console.log,
    timezone: "utc",
  },
  test: {
    username: "local-dev",
    password: "local",
    database: "spender",
    host: "localhost",
    dialect: "postgres",
    port: 5432, // 3306 for mysql,
    logging: console.log,
    timezone: "utc",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: null,
    timezone: "utc",
    dialectOptions: {
      ssl: true,
    },
  },
};
