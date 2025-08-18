const pool = require('../../../database/connection')

const checkEmail = ({ email }) => {
  pool.query('SELECT * FROM users WHERE email = $1', [email]).then((reulst) => {
    if (reulst.rows.length > 0) {
      return false;
    }
  });
};

const insertUser = ({ username, email, hashedPassword }) => {
  return pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
};

module.exports = {
  checkEmail,
  insertUser
}