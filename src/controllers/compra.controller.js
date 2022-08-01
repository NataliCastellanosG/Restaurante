const Compra = require('../models/compra.models');
const Plato = require('../models/plato.models');
const PlatoController = require('./plato.controller');

var platosCompra;
var valorTotal;
// Crear y guardar un nuevo restaurante
exports.crear = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
        message: "Los datos no pueden ser nulos"
        });
    }

    const compra = new Compra({
        idCliente : req.body.idCliente,
        platos: req.body.platos,
        estadoPago: req.body.estadoPago,
    });

    compra.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un fallo en el servidor"
        });
    });

    valorTotal=0;
};

//Agregar un nuevo plato a la compra... 
//Antes de hacer este procedimiento se debe ejecutar la funcion obtenerCompra
exports.agregarPlatoCompra = (req, res) =>{
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
        message: "Los datos no pueden ser nulos"
        });
    }

    const compra = new Compra ({
        platos: req.body.platos,
    });
    
    let platosArray;

    if(platosCompra.length != 0)
    {
        platosCompra = platosCompra + "," + compra.platos;
        platosArray = platosCompra.split(',');
    }
    else
        platosArray = compra.platos
    

    Compra.findByIdAndUpdate(req.params.id, {
        platos : platosArray
        }, { new: true })
        .then(compra => {
            if(!compra) {
                return res.status(404).send({
                message: "No se ha podido agregar el plato"
                });
            }
            res.status(200).send(compra);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                message: "No se ha podido agregar el plato"
                });
            }
            return res.status(500).send({message: "Ha ocurrido un fallo en el servidor" + err});
        });
};

//Remover un plato ce la compra... 
//Antes de hacer este procedimiento se debe ejecutar la funcion obtenerCompra
exports.removerPlatoCompra = (req, res) =>{
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
        message: "Los datos no pueden ser nulos"
        });
    }

    const compra = new Compra ({
        platos: req.body.platos,
    });  

    if(platosCompra.length !=0){
        platosCompra.remove(compra.platos);
    }

    Compra.findByIdAndUpdate(req.params.id, {
        platos : platosCompra
        }, { new: true })
        .then(compra => {
            if(!compra) {
                return res.status(404).send({
                message: "No se ha podido agregar el plato"
                });
            }
            res.status(200).send(compra);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                message: "No se ha podido agregar el plato"
                });
            }
            return res.status(500).send({message: "Ha ocurrido un fallo en el servidor" });
        });
};

//Asignar el valor total de la compra
//En el front se debe consultar la cantidad de productos y una a uno obtener el valor
//Esto desde el endpoint platos.obtenerPlato, 
//Posteriormente crear un array de valores, sumarlos y enviar el total a este método
exports.asignarTotal = (req, res) =>{
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
        message: "Los datos no pueden ser nulos"
        });
    }

    Compra.findByIdAndUpdate(req.params.id, {
        totalCompra : req.body.totalCompra
        }, { new: true })
        .then(compra => {
            if(!compra) {
                return res.status(404).send({
                message: "No se ha podido ingresar el valor total"
                });
            }
            res.status(200).send(compra);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                message: "No se ha podido ingresar el valor total"
                });
            }
            return res.status(500).send({message: "Ha ocurrido un fallo en el servidor" });
        });

}

// Obtener una compra por Id
exports.obtenerCompra = (req, res) => {
    Compra.findById({_id: req.params.id}, {platos: 1})
    .then(compra => {
        if(compra.length == 0) {
            return res.status(404).send({
                message: "El compra no ha sido encontrado"
            });
        }
        res.status(200).send(compra);
        platosCompra = compra.platos
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "El compra no ha sido encontrado"
                });
            }
            return res.status(500).send({
                message: "Ha ocurrido un fallo en el servidor"
            });
        });
};

//Actualizar el estado del pago
exports.actualizarEstadoPago = (req, res) =>{
    
    Compra.findByIdAndUpdate(req.params.id, {
        estadoPago : true
        }, { new: true })
        .then(compra => {
            if(!compra) {
                return res.status(404).send({
                message: "No se ha podido actualizar el estado de pago de la compra"
                });
            }
            res.status(200).send(compra);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                message: "No se ha podido actualizar el estado de pago de la compra"
                });
            }
            return res.status(500).send({message: "Ha ocurrido un fallo en el servidor" });
        });

}

