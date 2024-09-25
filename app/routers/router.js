const express = require('express');
const router = express.Router();
const personasController = require('../controllers/controller.persona.js');

router.post('/personas/create', personasController.create);
router.get('/personas', personasController.findAll);
router.get('/personas/:id', personasController.findOne);
router.put('/personas/:id', personasController.update);
router.delete('/personas/:id', personasController.delete);
router.delete('/personas', personasController.deleteAll);

module.exports = router;
