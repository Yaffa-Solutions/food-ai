const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../database/connection');

const register = (req, res) => {
  const { username, email, password } = req.body;

  pool
    .query('SELECT * FROM users WHERE email = $1', [email])

    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      if (!hashedPassword) return;

      return pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
    })
    .then((insertResult) => {
      if (!insertResult) return;

      const user = insertResult.rows[0];

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ user, token });
    })
    .catch((err) => {
      console.error('Error during register:', err);
      res.status(500).json({ message: 'Server error' });
    });
};

module.exports = {
  register,
};
