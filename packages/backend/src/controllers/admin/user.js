const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const User = require('../../models/user');

const clearImage = (filePath) => {
  if (!filePath.includes('/default/')) {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, (err) => console.log('err', err));
  }
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: 'Users fetched successfully',
        users
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'User fetched successfully',
        user
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { userId } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, incorrect data.');
    error.statusCode = 422;
    throw error;
  }
  const { access } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      user.access = access;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'User access level updated successfully', user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user!');
        error.statusCode = 404;
        throw error;
      }
      // check logged in user
      clearImage(user.avatarUrl);
      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      res.status(200).json({ message: 'User deleted successfully!' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
