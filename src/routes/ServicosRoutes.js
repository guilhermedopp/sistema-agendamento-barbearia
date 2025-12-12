const express = require('express');
const router = express.Router();
const ServicoController = require('../controllers/ServicoController');

// Importa middlewares de segurança
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

router.get('/', auth, ServicoController.index);
router.get('/criar', auth, adminAuth, ServicoController.create);
router.get('/:id/editar', auth, adminAuth, ServicoController.edit);

router.post('/', auth, adminAuth, ServicoController.store);
router.post('/:id/atualizar', auth, adminAuth, ServicoController.update);
router.post('/:id/deletar', auth, adminAuth, ServicoController.destroy);

module.exports = router;