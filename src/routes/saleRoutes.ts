import express from 'express';
import { createSale, getAllSales, getSaleById } from '../controllers/sales';


const router = express.Router();

router.post('/sales', createSale);
router.get('/sales', getAllSales);
router.get('/sales/:id', getSaleById);

export default router;