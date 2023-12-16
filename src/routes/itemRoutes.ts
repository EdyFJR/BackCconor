// src/routes/ItemRoutes.ts

import express from 'express';
import { createItem, deleteItem, getAllCompanyItems, getAllCompanyItemsPagination, getAllItems, getItemById, updateItem } from '../controllers/itemsController';


const router = express.Router();

router.post('/', createItem);
router.get('/', getAllItems);
router.get('/company/:companyId', getAllCompanyItemsPagination);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
