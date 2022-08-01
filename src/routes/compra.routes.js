const express = require("express");
const api = express.Router();
const Compra = require('../controllers/compra.controller');
const compraModels = require("../models/compra.models");

// Crear un nuevo cliente
api.post('/compra', Compra.crear);
// Agregar plato a la compra
api.put('/compraAgregarPlato/:id', Compra.agregarPlatoCompra);
// Remover plato de la compra
api.put('/compraRemoverPlato/:id', Compra.removerPlatoCompra);
//Obtener datos de la compra
api.get('/compra/:id', Compra.obtenerCompra);
//Asignar el valor total de la compra
api.put('/compraTotal/:id', Compra.asignarTotal);
//Actualizar el estado del pago
api.put('/compraPago/:id', Compra.actualizarEstadoPago);

module.exports = api;