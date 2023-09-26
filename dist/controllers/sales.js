"use strict";
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
exports.deleteSale = exports.createSale = exports.getSaleById = exports.getAllSales = void 0;
const Sales_1 = __importDefault(require("../models-sequelize/Sales"));
// Controlador para obtener todas las ventas
const getAllSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield Sales_1.default.find();
        res.json(sales);
    }
    catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ error: 'Error al obtener ventas' });
    }
});
exports.getAllSales = getAllSales;
// Controlador para obtener una venta por su ID
const getSaleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleId = req.params.id;
    try {
        const sale = yield Sales_1.default.findById(saleId);
        if (!sale) {
            res.status(404).json({ error: 'Venta no encontrada' });
            return;
        }
        res.json(sale);
    }
    catch (error) {
        console.error('Error al obtener la venta:', error);
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
});
exports.getSaleById = getSaleById;
// Controlador para crear una nueva venta
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, total, discount, iva, productsSold } = req.body;
    try {
        const newSale = new Sales_1.default({
            date,
            total,
            discount,
            iva,
            productsSold,
        });
        const savedSale = yield newSale.save();
        res.json(savedSale);
    }
    catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ error: 'Error al crear la venta' });
    }
});
exports.createSale = createSale;
// Controlador para eliminar una venta por su ID
const deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleId = req.params.id;
    try {
        const deletedSale = yield Sales_1.default.findByIdAndDelete(saleId);
        if (!deletedSale) {
            res.status(404).json({ error: 'Venta no encontrada' });
            return;
        }
        res.json({ message: 'Venta eliminada con éxito' });
    }
    catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
});
exports.deleteSale = deleteSale;
