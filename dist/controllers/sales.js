"use strict";
// src/controllers/saleController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaleById = exports.getAllSales = exports.createSale = void 0;
const Sales_1 = __importDefault(require("../models-mongoose/Sales"));
// Crear una nueva venta
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSale = new Sales_1.default(req.body);
        const savedSale = yield newSale.save();
        res.status(201).json(savedSale);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.createSale = createSale;
// Obtener todas las ventas
const getAllSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield Sales_1.default.find().populate('user').populate('productsSold.productId');
        res.status(200).json(sales);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllSales = getAllSales;
// Obtener una venta por ID
const getSaleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield Sales_1.default.findById(req.params.id).populate('user').populate('productsSold.productId');
        if (!sale)
            return res.status(404).json({ message: 'Venta no encontrada' });
        res.status(200).json(sale);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getSaleById = getSaleById;
