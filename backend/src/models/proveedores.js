const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proveedoresSchema = new Schema({
    nombres: String,
    apellidos: String,
    dni: String,
    foto: String
});

module.exports = mongoose.model('Proveedores', proveedoresSchema);