const proveedorController = {}
const Proveedor = require('../models/proveedores');

proveedorController.getProveedor = (req, res) => {
    Proveedor.find({}, (err, result) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(result);
    });
}

proveedorController.postProveedor = (req, res) => {
    const proveedor = new Proveedor(req.body);
    proveedor.save((err, result) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(result);
    });
}

proveedorController.putProveedor = (req, res) => {
    Proveedor.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(result);
    });
}

proveedorController.deleteProveedor = (req, res) => {
    Proveedor.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(result);
    });
}

module.exports = proveedorController;