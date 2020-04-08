const { Router } = require('express');
const { getProveedor, postProveedor, putProveedor, deleteProveedor } = require('../controllers/proveedor.controller');
const router = Router();

router.get('/proveedores', getProveedor);
router.post('/proveedor', postProveedor);
router.put('/proveedor/:id', putProveedor);
router.delete('/proveedor/:id', deleteProveedor);

module.exports = router;