const Restaurante = require('../models/restaurante.models');

// Crear y guardar un nuevo restaurante
exports.crear = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
        message: "Los datos no pueden ser nulos"
        });
    }

    const restaurante = new Restaurante({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    });

    restaurante.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un fallo en el servidor"
        });
    });
};

// Listar todos los restaurantes
exports.listar = (req, res) => {
    Restaurante.find({},{
        nombre:1
    })
    .then(restaurantes => {
        res.status(200).send(restaurantes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un fallo en el servidor"
        });
    });
};

// Obtener un solo restaurantes por Id
exports.obtenerRestaurante = (req, res) => {
    Restaurante.findById({_id: req.params.id},{
        nombre:1,
        direccion: 1,
        telefono: 1
    })
    .then(restaurante => {
        if(restaurante.length == 0) {
            return res.status(404).send({
                message: "El restaurante no ha sido encontrado"
            });
    }
    res.status(200).send(restaurante);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "El restaurante no ha sido encontrado"
            });
        }
        return res.status(500).send({
            message: "Ha ocurrido un fallo en el servidor"
        });
    });
};
