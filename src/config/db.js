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
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: `/cloudsql/${process.env.RDS_HOSTNAME}`,
    database: "spender",
    dialect: "mysql",
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.RDS_HOSTNAME}`
    },
    logging: null
  }
};
