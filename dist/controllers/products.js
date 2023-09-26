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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const Products_1 = __importDefault(require("../models-sequelize/Products"));
// Controlador para obtener todos los productos
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Products_1.default.find();
        res.json(products);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});
exports.getAllProducts = getAllProducts;
// Controlador para obtener un producto por su ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield Products_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json(product);
    }
    catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});
exports.getProductById = getProductById;
// Controlador para crear un nuevo producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, expirationDate, discount } = req.body;
    try {
        const newProduct = new Products_1.default({
            name,
            price,
            description,
            expirationDate,
            discount,
        });
        const savedProduct = yield newProduct.save();
        res.json(savedProduct);
    }
    catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});
exports.createProduct = createProduct;
// Controlador para actualizar un producto por su ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const { name, price, description, expirationDate, discount } = req.body;
    try {
        const updatedProduct = yield Products_1.default.findByIdAndUpdate(productId, {
            name,
            price,
            description,
            expirationDate,
            discount,
        }, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json(updatedProduct);
    }
    catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});
exports.updateProduct = updateProduct;
// Controlador para eliminar un producto por su ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const deletedProduct = yield Products_1.default.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json({ message: 'Producto eliminado con éxito' });
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});
exports.deleteProduct = deleteProduct;
