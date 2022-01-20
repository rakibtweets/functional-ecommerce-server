const express = require('express');
const { registerUser } = require('../Controllers/userAuthController');
const router = express.Router();

// user Register

router.post('/register', registerUser);

module.exports = router;
