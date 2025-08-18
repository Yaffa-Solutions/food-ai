const pool = require('../../database/connection');

const getUserByEmailOrUsername = (user) => {
  const sql = 'SELECT * FROM users WHERE email = $1 OR username = $1';
  return pool.query(sql, [user]);
};

module.exports = { getUserByEmailOrUsername };
