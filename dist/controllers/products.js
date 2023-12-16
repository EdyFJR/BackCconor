"use strict";
// src/controllers/productController.ts
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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllCompanyProducts = exports.getAllProducts = exports.createProduct = void 0;
const Products_1 = __importDefault(require("../models-mongoose/Products"));
// Crear un nuevo producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new Products_1.default(req.body);
        newProduct.img = '';
        const savedProduct = yield newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.createProduct = createProduct;
// Obtener todos los productos
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Products_1.default.find().populate('supplier');
        res.status(200).json({ ok: true, products });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllProducts = getAllProducts;
const getAllCompanyProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield Products_1.default.find({ company: id }).populate('supplier');
        res.status(200).json({ ok: true, products });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllCompanyProducts = getAllCompanyProducts;
// Obtener un producto por ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Products_1.default.findById(req.params.id).populate('supplier');
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ ok: true, product });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getProductById = getProductById;
// Actualizar un producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield Products_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.updateProduct = updateProduct;
// Eliminar un producto
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield Products_1.default.findByIdAndDelete(req.params.id);
        if (!deletedProduct)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteProduct = deleteProduct;
