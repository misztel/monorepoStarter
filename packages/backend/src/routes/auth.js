const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email!')
    .custom((value, { req }) => User.findOne({ email: value })
      .then((userDoc) => {
        if (userDoc) {
          return Promise.reject(new Error('User with this email already exist'));
        }
        return null;
      }))
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 }),
  body('name')
    .trim()
    .not()
    .isEmpty(),
  body('surname')
    .trim()
    .not()
    .isEmpty()
],
authController.signup);

router.post('/login', authController.login);

module.exports = router;
