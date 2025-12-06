const express = require('express');
const router = express.Router();

// Importa o controller
const ProfissionalController = require('../controllers/ProfissionalController');

// Importa middlewares de segurança
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Rotas protegidas (apenas Admin logado pode gerenciar)

router.get('/', auth, adminAuth, ProfissionalController.index);

router.get('/criar', auth, adminAuth, ProfissionalController.create);

router.post('/', auth, adminAuth, ProfissionalController.store);

// Rota para deletar
router.post('/:id/deletar', auth, adminAuth, ProfissionalController.destroy);

module.exports = router;