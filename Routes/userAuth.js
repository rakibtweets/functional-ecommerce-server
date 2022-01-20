const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../Controllers/userAuthController');
const router = express.Router();

// user Register

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
