"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sales_1 = require("../controllers/sales");
const router = express_1.default.Router();
router.post('/sales', sales_1.createSale);
router.get('/sales', sales_1.getAllSales);
router.get('/sales/:id', sales_1.getSaleById);
exports.default = router;
