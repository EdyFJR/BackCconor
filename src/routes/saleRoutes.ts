import { Router } from 'express';
import {
  getAllSales,
  getSaleById,
  createSale,
  deleteSale,
} from '../controllers/sales';

const router = Router();

router.get('/', getAllSales);
router.get('/:id', getSaleById);
router.post('/', createSale);
router.delete('/:id', deleteSale);

export default router;
