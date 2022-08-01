const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    idCliente: {
        type: String,
        required: true,
    },
    totalCompra: {
        type: Number,
        trim: true,
    },
    platos :[{
        type: Schema.Types.ObjectId,
        ref : "Plato"
    }],
    estadoPago: {
        type: Boolean,
        required: true,
    }}, 
{
    timestamps: true
});
module.exports = mongoose.model('Compra', CompraSchema);