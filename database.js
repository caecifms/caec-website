require("dotenv").config();
const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize(process.env.DATABASE_URL_CONNECTION, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false
});
