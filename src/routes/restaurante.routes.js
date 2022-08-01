const express = require("express");
const api = express.Router();
const Restaurante = require('../controllers/restaurante.controller');

// Crear un nuevo restaurante
api.post('/restaurante', Restaurante.crear);
// Listar todos los restaurantes
api.get('/restaurantes', Restaurante.listar);
// Obter un restaurante por id
api.get('/restaurante/:id', Restaurante.obtenerRestaurante);

module.exports = api;