const express = require('express');
const router = express.Router();
const ServicoController = require('../controllers/ServicoController');

router.get('/', ServicoController.index); // Lista
router.get('/criar', ServicoController.create); // Formulário
router.post('/', ServicoController.store); // Salva

module.exports = router;