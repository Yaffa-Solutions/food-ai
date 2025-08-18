require('env2')('.env');

const DB_URL = process.env.DB_URL;
if (!DB_URL) throw new Error('DB_URL is not defined in .env');

const config = {
  port: process.env.PORT || 5000,
  database: DB_URL,
};

module.exports = config;
