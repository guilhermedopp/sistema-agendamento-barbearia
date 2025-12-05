const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get('/login', AuthController.loginForm);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.get('/registrar', AuthController.registerForm);
router.post('/registrar', AuthController.registrar);

module.exports = router;