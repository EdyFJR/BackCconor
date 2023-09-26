"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const jwtMiddleware_1 = require("../middleware/jwtMiddleware");
const router = (0, express_1.Router)();
// Ruta para obtener todos los productos (disponible para administradores)
router.get('/', jwtMiddleware_1.verifyToken, products_1.getAllProducts);
// Ruta para obtener un producto por su ID (disponible para usuarios y administradores)
router.get('/:id', products_1.getProductById);
// Ruta para crear un nuevo producto (disponible para administradores)
router.post('/', jwtMiddleware_1.verifyToken, products_1.createProduct);
// Ruta para actualizar un producto por su ID (disponible para administradores)
router.put('/:id', jwtMiddleware_1.verifyToken, products_1.updateProduct);
// Ruta para eliminar un producto por su ID (disponible para administradores)
router.delete('/:id', jwtMiddleware_1.verifyToken, products_1.deleteProduct);
exports.default = router;
