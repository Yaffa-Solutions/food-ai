const { body } = require('express-validator');

const loginValidation = () => {
  return [
    body('user').notEmpty().withMessage('Email or Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};

const signUpValidation = () => {
  return [
    body('username').notEmpty().withMessage('Username is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter.')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
      .matches(/[\W_]/)
      .withMessage('Password must contain at least one special character'),

    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords dose not match');
        }
        return true;
      }),
  ];
};

module.exports = {
  loginValidation,
  signUpValidation,
};
