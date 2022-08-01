const express = require("express");
const api = express.Router();
const Cliente = require('../controllers/cliente.controller');

// Crear un nuevo cliente
api.post('/cliente', Cliente.crear);
// Obtener existencia del cliente
api.post('/clienteSignIn', Cliente.obtenerExistencia);

module.exports = api;