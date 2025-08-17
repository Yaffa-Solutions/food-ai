const express = require('express');
const {
  loginValidation,
  signUpValidation,
} = require('../validation/authValidator');
const { loginUser, signUpUser } = require('../controllers/auth');
const router = express.Router();

router.post('/login', loginValidation(), loginUser);
router.post('/signUp', signUpValidation(), signUpUser);

module.exports = router;