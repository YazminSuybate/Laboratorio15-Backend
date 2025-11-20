const express = require('express');
const router = express.Router();

const {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/product.controller');

// Rutas base (/api/productos)
router.get('/', getProductos);
router.post('/', createProducto);

// Rutas con parámetro ID (/api/productos/:id)
router.get('/:id', getProductoById);
router.put('/:id', updateProducto);

router.delete('/:id', deleteProducto);


module.exports = router;