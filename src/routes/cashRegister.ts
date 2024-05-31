
import express from 'express';
import { openCashRegister, closeCashRegister, getCashRegisters } from '../controllers/CashRegisterController';

const router = express.Router();

router.post('/open', openCashRegister);
router.post('/close/:id', closeCashRegister);
router.get('/', getCashRegisters);

export default router;
