module.exports = {
  development: {
    webEndpoint: "http://localhost:3001",
    db: {
      username: "local-dev",
      password: "local",
      database: "spender",
      host: "localhost",
      dialect: "postgres",
      port: 5432, // 3306 for mysql,
      logging: console.log,
      timezone: "utc"
    }
  },
  production: {
    webEndpoint: "https://spender-webapp-dev.herokuapp.com",
    db: {
      use_env_variable: "DATABASE_URL",
      dialect: "postgres",
      logging: null,
      timezone: "utc"
    }
  }
};
