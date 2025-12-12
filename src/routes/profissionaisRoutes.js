const express = require('express');
const router = express.Router();

// Importa o controller
const ProfissionalController = require('../controllers/ProfissionalController');

// Importa middlewares de segurança
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Rotas protegidas (apenas Admin logado pode gerenciar)

router.get('/', auth, ProfissionalController.index);
router.get('/criar', auth, adminAuth, ProfissionalController.create);
router.get('/:id/editar', auth, adminAuth, ProfissionalController.edit);

router.post('/', auth, adminAuth, ProfissionalController.store);
router.post('/:id/atualizar', auth, adminAuth, ProfissionalController.update);
router.post('/:id/deletar', auth, adminAuth, ProfissionalController.destroy);

module.exports = router;