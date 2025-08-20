const pool = require('../../database/connection');

const checkEmail = (email) => {
  return pool
    .query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => {
      // return result.rows.length > 0;
      return result.rows[0] || null;
    })
    .catch((err) => {
      console.error('Error checking email:', err);
      throw err;
    });
};

const insertUser = ({ username, email, hashedPassword }) => {
  return pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
};

const getUserByEmailOrUsername = (user) => {
  const sql = 'SELECT * FROM users WHERE email = $1 OR username = $1';
  return pool.query(sql, [user]);
};

module.exports = {
  checkEmail,
  insertUser,
  getUserByEmailOrUsername,
};
