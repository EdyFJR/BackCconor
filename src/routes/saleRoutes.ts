import express from 'express';
import { createSale, getAllSales, getSaleById } from '../controllers/sales';
import { validarAdmin, verifyToken } from '../middleware/jwtMiddleware';


const router = express.Router();

router.post('/',verifyToken, createSale);
router.get('/', getAllSales);
router.get('/:id', getSaleById);

export default router;