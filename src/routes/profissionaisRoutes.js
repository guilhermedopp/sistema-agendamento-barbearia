const express = require('express');
const router = express.Router();

// Importa o controller
const ProfissionalController = require('../controllers/ProfissionalController');

router.get('/', ProfissionalController.index);

router.get('/criar', ProfissionalController.create);

router.post('/', ProfissionalController.store);

module.exports = router;