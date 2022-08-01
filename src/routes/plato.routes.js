const express = require("express");
const api = express.Router();
const Plato = require('../controllers/plato.controller');

// Crear un nuevo plato
api.post('/plato', Plato.crear);
// Listar todos los platos
api.get('/platos/:idRestaurante', Plato.listar);
// Obtener un solo plato por id
api.get('/plato/:idPlato', Plato.obtenerPlato);

module.exports = api;