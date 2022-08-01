const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestauranteSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    telefono:{
        type: String,
        required: true,
    }}, 
{
    timestamps: true
});

module.exports = mongoose.model("Restaurante", RestauranteSchema);