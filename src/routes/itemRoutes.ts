// src/routes/ItemRoutes.ts

import express from 'express';
import { createItem, deleteItem, getAllCompanyItems, getAllCompanyItemsPagination, getAllItems, getItemById, getItems, updateItem } from '../controllers/itemsController';
import { validarEmpresaUsuario, verifyToken } from '../middleware/jwtMiddleware';


const router = express.Router();

router.post('/:empresaId', createItem);
router.get('/:empresaId',verifyToken, validarEmpresaUsuario, getItems);
router.get('/', getAllItems);
router.get('/company/:companyId', getAllCompanyItemsPagination);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
