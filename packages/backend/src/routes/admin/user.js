const express = require('express');
const { body } = require('express-validator');

const userAdminController = require('../../controllers/admin/user');
const isAuth = require('../../middleware/is-auth');
const isAdmin = require('../../middleware/is-admin');
const isSuperAdmin = require('../../middleware/is-superAdmin');

const router = express.Router();

// get specified user
router.get('/user/:userId', isAuth, isAdmin, userAdminController.getUser);

// get all users: protected - admin, superadmin
router.get('/users', isAuth, isAdmin, userAdminController.getUsers);

// update user role
router.put('/user/:userId', isAuth, isSuperAdmin, userAdminController.updateUser);

// delete user
router.delete('/user/:userId', isAuth, userAdminController.deleteUser);

module.exports = router;
