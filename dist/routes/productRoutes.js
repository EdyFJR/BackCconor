"use strict";
// src/routes/productRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const router = express_1.default.Router();
router.post('/:companyId', products_1.createProduct);
router.get('/', products_1.getAllProducts);
router.get('/company/:id', products_1.getAllCompanyProducts);
router.get('/:id', products_1.getProductById);
router.put('/:id', products_1.updateProduct);
router.delete('/:id', products_1.deleteProduct);
router.get('/search/:empresaId', products_1.searchProducts);
exports.default = router;
