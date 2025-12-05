const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

// Importações de Segurança e Validação
const auth = require('../middlewares/auth');
const { body } = require('express-validator');

// Regras de validação para o formulário
const validacoes = [
    body('clienteNome').trim().notEmpty().withMessage('Nome é obrigatório').escape(),
    body('data').notEmpty().withMessage('Data é obrigatória'),
    body('servicoId').isNumeric().withMessage('Serviço inválido')
];

// Aplica o 'auth' para proteger a listagem e o formulário
router.get('/', auth, AgendamentoController.index);
router.get('/criar', auth, AgendamentoController.create);

// Aplica 'auth' e 'validacoes' no salvamento
router.post('/', auth, validacoes, AgendamentoController.store);

// Rotas pra mudar o status
router.post('/:id/cancelar', auth, AgendamentoController.cancelar);
router.post('/:id/concluir', auth, AgendamentoController.concluir);

module.exports = router;