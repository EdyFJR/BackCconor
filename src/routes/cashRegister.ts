
import express from 'express';
import { openCashRegister, closeCashRegister, getCashRegisters, hasOpenCashRegister } from '../controllers/CashRegisterController';

const router = express.Router();

router.post('/open', openCashRegister);
router.post('/close/:id', closeCashRegister);
router.get('/', getCashRegisters);
router.get('/has-open/:userId', hasOpenCashRegister);
export default router;