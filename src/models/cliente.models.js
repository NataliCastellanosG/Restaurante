const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = Schema({
    correoElectronico: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    contrasenna: {
        type: String,
        required: true,
        trim: true,
    },
    telefono:{
        type: String,
        required: true,
    }}, 
{
    timestamps: true
});
module.exports = mongoose.model('Cliente', ClienteSchema);