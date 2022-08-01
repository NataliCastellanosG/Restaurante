const Cliente = require('../models/cliente.models');

// Crear y guardar un nuevo cliente
exports.crear = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
        message: "Los datos no pueden ser nulos"
        });
    }

    const cliente = new Cliente({
        correoElectronico: req.body.correoElectronico,
        nombre: req.body.nombre,
        contrasenna: req.body.contrasenna,
        telefono: req.body.telefono
    });

    cliente.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un fallo en el servidor"
        });
    });
};

// Obtener existencia del cliente
exports.obtenerExistencia = (req, res) => {
    
    Cliente.find({correoElectronico: req.body.correoElectronico, contrasenna : req.body.contrasenna}, {_id:1})
    .then(cliente => {
        if(cliente.length == 0) {
            return res.status(404).send({
                message: "El cliente no existe"
            });
        }
        res.status(200).send({cliente});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "El cliente no existe 404"
            });
        }
        return res.status(500).send({
            message: "Ha ocurrido un fallo en el servidor"
        });
    });
};
