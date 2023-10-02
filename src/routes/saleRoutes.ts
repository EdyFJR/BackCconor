import { Router } from 'express';
import {
  getAllSales,
  getSaleById,
  createSale,
  cancelSale,
} from '../controllers/sales';
import { verifyToken } from '../middleware/jwtMiddleware';

const router = Router();

// Ruta para obtener todas las ventas
router.get('/', verifyToken, getAllSales);

// Ruta para obtener una venta por su ID
router.get('/:id', verifyToken, getSaleById);

// Ruta para crear una nueva venta
router.post('/', verifyToken, createSale);

// Ruta para actualizar una venta por su ID
router.post('/cancel/:id', verifyToken, cancelSale);



export default router;
