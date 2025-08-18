const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkEmail, insertUser } = require('../models/queries/userModel');

const signup = (req, res) => {
  const { username, email, password } = req.body;
  const isEmailIsExists = checkEmail(email);
  if (isEmailIsExists) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  bcrypt
    .hash(password, 10)

    .then((hashedPassword) => {
      return insertUser({ username, email, hashedPassword });
    })
    .then((insertResult) => {
      if (!insertResult || insertResult.rows.length === 0) {
        throw { status: 500, message: 'Failed to create user' };
      }

      const user = insertResult.rows[0];

      const token = jwt.sign(
        { id: user.id, name: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
      });

      return res.status(201).json({
        status: '201',
        message: 'user has been created successfully',
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      console.error('Error during signup:', err);
      return res.status(500).json({ message: 'Server error' });
    });
};

module.exports = {
  signup,
};
