const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  fotgotPassword,
  resetPassword,
  getUserProfile,
} = require('../Controllers/userAuthController');

const { isAuthenticatedUser } = require('../Middlewares/auth');

// user Register

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/password/forgot', fotgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/logOut', logOutUser);
router.get('/me', isAuthenticatedUser, getUserProfile);

module.exports = router;
