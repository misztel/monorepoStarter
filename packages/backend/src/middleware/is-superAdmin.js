const User = require('../models/user');

module.exports = (req, res, next) => {
  const { userId } = req;

  if (!userId) {
    const error = new Error('Not authorized.');
    error.statusCode = 401;
    throw error;
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user to authorize.');
        error.statusCode = 404;
        throw error;
      }
      if (user.access !== 'superadmin') {
        const error = new Error('This user is not authorized to superAdmin.');
        error.statusCode = 404;
        throw error;
      }
      console.log('user', userId, user.access, 'is authorized!');
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  next();
};
