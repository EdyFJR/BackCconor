// src/routes/productRoutes.ts

import express from 'express';
import { createProduct, deleteProduct, getAllCompanyProducts, getAllProducts, getProductById, searchProducts, updateProduct } from '../controllers/products';


const router = express.Router();

router.post('/:companyId', createProduct);
router.get('/', getAllProducts);
router.get('/company/:id', getAllCompanyProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/search/:empresaId', searchProducts);


export default router;
