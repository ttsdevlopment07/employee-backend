require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,    // ➤ 'railway'
  process.env.DB_USER,    // ➤ 'root'
  process.env.DB_PASS,    // ➤ password from Railway
  {
    host: process.env.DB_HOST,   // ➤ 'interchange.proxy.rlwy.net'
    port: process.env.DB_PORT,   // ➤ '29413' (number or string both work)
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 15000 // ✅ gives more time to connect to Railway (15s)
    }
  }
);

module.exports = sequelize;
