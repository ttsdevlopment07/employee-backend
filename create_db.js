require('dotenv').config(); // Load .env variables
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,                 // important for Railway!
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME             // directly connect to existing DB
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log(`Connected to MySQL database "${process.env.DB_NAME}".`);
  connection.end();
});
