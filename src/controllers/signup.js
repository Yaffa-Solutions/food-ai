const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkEmail, insertUser } = require('../../models/queries/userModel');

const signup = (req, res) => {
  const { username, email, password } = req.body;

  checkEmail(email)
    .then((result) => {
      console.log('Email check result:', result);
      if (result && result.rows && result.rows.length > 0) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      console.log('Hashed password:', hashedPassword);
      if (!hashedPassword) return;
      return insertUser({ username, email, hashedPassword });
    })
    .then((insertResult) => {
      console.log('Insert result:', insertResult);
      if (!insertResult || insertResult.rows.length === 0) {
        throw { status: 500, message: 'Failed to create user' };
      }

      const user = insertResult.rows[0];
      console.log('New user created:', user);
      const token = jwt.sign(
        { id: user.id, name: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(201).json({
        status: '201',
        message: 'User has been created successfully',
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      console.error('Error during signup:', err);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Server error' });
      }
    });
};

module.exports = {
  signup,
};
