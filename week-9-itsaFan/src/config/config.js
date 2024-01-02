require('dotenv').config();

const config = {
  port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_pasw: process.env.DB_PASSWORD,
  db_schema: process.env.DB_SCHEMA,
};

module.exports = config;
