// src/routes/productRoutes.ts

import express from 'express';
import { createProduct, deleteProduct, getAllCompanyProducts, getAllProducts, getProductById, updateProduct } from '../controllers/products';


const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/company/:id', getAllCompanyProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;
