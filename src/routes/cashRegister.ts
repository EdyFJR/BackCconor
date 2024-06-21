
import express from 'express';
import { openCashRegister, closeCashRegister, getCashRegisters, hasOpenCashRegister, getOpenCashRegister } from '../controllers/CashRegisterController';
import { verifyToken } from '../middleware/jwtMiddleware';

const router = express.Router();

//ABRIR CAJA
router.post('/open',verifyToken, openCashRegister);

//CERRAR CAJA
router.post('/close/:id', closeCashRegister);

//OBTENER CAJAS CAJA
router.get('/', getCashRegisters);

//OBTENER CAJAS CAJA
router.get('/has-open/:userId', hasOpenCashRegister);


router.get('/open/:userId', getOpenCashRegister);



export default router;