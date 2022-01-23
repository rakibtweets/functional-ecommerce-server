const express = require('express');
const {
  registerUser,
  loginUser,
  logOutUser,
} = require('../Controllers/userAuthController');
const router = express.Router();

// user Register

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logOut', logOutUser);

module.exports = router;
