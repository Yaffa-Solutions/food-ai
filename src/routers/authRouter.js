const express = require('express');
const {
  loginValidation,
  signUpValidation,
} = require('../validation/authValidator');
const { loginUser, signUpUser } = require('../controllers/auth');
const authenticateToken = require('../../middleware/auth');

const router = express.Router();

router.post('/login', loginValidation(), loginUser);
router.post('/signup', signUpValidation(), signUpUser);
router.get('/home', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});
module.exports = router;
