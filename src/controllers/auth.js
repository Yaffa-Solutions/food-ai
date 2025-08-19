const { validationResult } = require('express-validator');
const { loginAuth } = require('./login');
const { signup } = require('./signup');

const loginUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  loginAuth(req,res)
  
};

const signUpUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  signup(req,res)
};
module.exports = {
  loginUser,
  signUpUser,
};
