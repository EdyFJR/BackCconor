import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products';
import { verifyToken } from '../middleware/jwtMiddleware';

const router = Router();

// Ruta para obtener todos los productos (disponible para administradores)
router.get('/', verifyToken, getAllProducts);

// Ruta para obtener un producto por su ID (disponible para usuarios y administradores)
router.get('/:id', getProductById);

// Ruta para crear un nuevo producto (disponible para administradores)
router.post('/', verifyToken, createProduct);

// Ruta para actualizar un producto por su ID (disponible para administradores)
router.put('/:id', verifyToken, updateProduct);

// Ruta para eliminar un producto por su ID (disponible para administradores)
router.delete('/:id', verifyToken, deleteProduct);

export default router;
