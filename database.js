require("dotenv").config()
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL_CONNECTION, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

async function checkConnection()
{
    try
    {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch(error)
    {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {sequelize, checkConnection};