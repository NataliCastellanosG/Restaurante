const Plato = require('../models/plato.models');
var plato;
// Crear y guardar un nuevo plato
exports.crear = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
        message: "Los datos no pueden ser nulos"
        });
    }

    const plato = new Plato({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        idRestaurante: req.body.idRestaurante
    });

    plato.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un fallo en el servidor"
        });
    });
};

// Listar todos los platos
exports.listar = (req, res) => {
    Plato.find({idRestaurante : req.params.idRestaurante},{
        nombre:1,
        valor: 1,
    })
    .then(platos => {
        res.status(200).send(platos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un fallo en el servidor"
        });
    });
};

// Obtener un solo platos por Id
exports.obtenerPlato = (req, res) => {
    Plato.findById({_id: req.params.idPlato},{
        nombre:1,
        descripcion:1,
        valor: 1,
    })
    .then(plato => {
        if(plato.length == 0) {
            return res.status(404).send({
                message: "El plato no ha sido encontrado"
            });
        }
        res.status(200).send(plato);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "El plato no ha sido encontrado"
                });
            }
            return res.status(500).send({
                message: "Ha ocurrido un fallo en el servidor"
            });
        });
};
