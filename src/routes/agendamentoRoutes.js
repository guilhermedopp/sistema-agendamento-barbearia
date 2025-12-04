const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

router.get('/', AgendamentoController.index);
router.get('/criar', AgendamentoController.create);
router.post('/', AgendamentoController.store);

// Rotas pra mudar o status
router.post('/:id/cancelar', AgendamentoController.cancelar);
router.post('/:id/concluir', AgendamentoController.concluir);

module.exports = router;