require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL_CONNECTION, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

async function checkConnection() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function close() {
  try {
    await sequelize.close();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sequelize, checkConnection, close };
