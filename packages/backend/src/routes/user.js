const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const isSuperAdmin = require('../middleware/is-superAdmin');

const router = express.Router();

// get specified user
router.get('/user/:userId', isAuth, userController.getUser);

// update specified user data
router.put('/user/:userId', isAuth, userController.updateUser);

// delete user
router.delete('/user/:userId', isAuth, userController.deleteUser);

module.exports = router;
