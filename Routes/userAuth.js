const express = require('express');
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
} = require('../Controllers/userAuthController');

const { isAuthenticatedUser } = require('../Middlewares/auth');

// user Register

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/password/forgot', fotgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/logOut', logOutUser);
router.get('/me', isAuthenticatedUser, getUserProfile);
router.put('/password/update', isAuthenticatedUser, updatePassword);
router.put('/me/update', isAuthenticatedUser, updateProfile);

module.exports = router;
