const express = require('express');
const router = express.Router();
const ServicoController = require('../controllers/ServicoController');

// Importa middlewares de segurança
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

router.get('/', auth, ServicoController.index);
router.get('/criar', auth, adminAuth, ServicoController.create);

router.post('/', auth, adminAuth, ServicoController.store);
router.post('/:id/deletar', auth, adminAuth, ServicoController.destroy);

module.exports = router;