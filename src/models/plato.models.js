const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatoSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    valor:{
        type: Number,
        required: true,
    },
    idRestaurante :{
        type: String,
        require: true,
    }
}, 
{
    timestamps: true
});
module.exports = mongoose.model('Plato', PlatoSchema);