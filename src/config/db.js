module.exports = {
  development: {
    username: "local-dev",
    password: "local",
    database: "spender",
    host: "localhost",
    dialect: "postgres",
    port: 5432, // 3306 for mysql,
    logging: console.log
  },
  test: {
    username: "local-dev",
    password: "",
    database: "spender",
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: console.log
  },
  staging: {
    username: "local-dev",
    password: "",
    database: "spender",
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: console.log
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: null
  }
};
