const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../database/connection');
const { getUserByEmailOrUsername } = require('../../models/queries/userModel');
const loginAuth = (req, res) => {
  const { user, password } = req.body;
  getUserByEmailOrUsername(user)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      const foundUser = result.rows[0];
      return bcrypt.compare(password, foundUser.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign(
          { id: foundUser.id, name: foundUser.username },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
          }
        );
        res.cookie('token', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          status: '200',
          user: foundUser,
        });
      });
    })
    .catch((err) => {
      console.error('Error login:', err);
      res.status(500).json({ message: 'Server error' });
    });
};
module.exports = { loginAuth };
