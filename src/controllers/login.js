const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../database/connection');

const loginAuth = (req, res) => {
  const { user, password } = req.body;
  pool
    .query('SELECT * FROM users WHERE email = $1 OR username = $1', [user])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      const foundUser = result.rows[0];
      return bcrypt.compare(password, foundUser.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
        res.json({ user: foundUser, token });
      });
    })
    .catch((err) => {
      console.error('Error login:', err);
      res.status(500).json({ message: 'Server error' });
    });
};
module.exports = { loginAuth };
