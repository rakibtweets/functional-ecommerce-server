const express = require('express');
const {
  registerUser,
  loginUser,
  logOutUser,
  fotgotPassword,
  resetPassword,
} = require('../Controllers/userAuthController');
const router = express.Router();

// user Register

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/password/forgot', fotgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/logOut', logOutUser);

module.exports = router;
