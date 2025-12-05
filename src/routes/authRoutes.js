const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const auth = require('../middlewares/auth'); 
const adminAuth = require('../middlewares/adminAuth');

router.get('/login', AuthController.loginForm);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

// Rotas de Cadastro

router.get('/registrar', auth, adminAuth, AuthController.registerForm);
router.post('/registrar', auth, adminAuth, AuthController.registrar);


module.exports = router;