const express = require('express');
const { is } = require('express/lib/request');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  fotgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
} = require('../Controllers/userAuthController');

const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/auth');

// user Register

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/password/forgot', fotgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/logOut', logOutUser);
router.get('/me', isAuthenticatedUser, getUserProfile);
router.put('/password/update', isAuthenticatedUser, updatePassword);
router.put('/me/update', isAuthenticatedUser, updateProfile);

//admin routes

router.get(
  '/admin/users',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  allUsers
);
router.get(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getUserDetails
);
router.put(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  updateUser
);

module.exports = router;
