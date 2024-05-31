"use strict";
// src/controllers/ItemController.ts
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
exports.getItems = exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllCompanyItemsPagination = exports.getAllCompanyItems = exports.getAllItems = exports.createItem = void 0;
const Company_1 = __importDefault(require("../models-mongoose/Company"));
const Products_1 = __importDefault(require("../models-mongoose/Products"));
const Item_1 = __importDefault(require("../models-mongoose/Item"));
// Crear un nuevo Item
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('crear item', req.body);
        const productId = req.body.product;
        const { empresaId } = req.params;
        const producto = yield Products_1.default.findById(productId);
        const empresa = yield Company_1.default.findById(empresaId);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: "Producto No Existe"
            });
        }
        if (!empresa) {
            return res.status(404).json({
                ok: false,
                msg: "Empresa No Existe"
            });
        }
        req.body.company = empresaId;
        const newItem = new Item_1.default(req.body);
        const savedItem = yield newItem.save();
        return res.status(201).json(savedItem);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.createItem = createItem;
// Obtener todos los Items
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Items = yield Item_1.default.find();
        res.status(200).json(Items);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllItems = getAllItems;
// Obtener todos los Items
const getAllCompanyItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const company = yield Company_1.default.findById(id);
        if (!company)
            return res.status(404).json({ message: 'Compañia no encontrada' });
        const items = yield Item_1.default.find({ company: id });
        res.status(200).json({ ok: true, items });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllCompanyItems = getAllCompanyItems;
const getAllCompanyItemsPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación con valores por defecto
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        // Calcular el desplazamiento
        const skip = (page - 1) * limit;
        const { companyId } = req.params;
        const company = yield Company_1.default.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Empresa no existe' });
        }
        // Obtener datos paginados
        const items = yield Item_1.default.find({ company: companyId }).skip(skip).limit(limit);
        // Contar el total de documentos para calcular el total de páginas
        const total = yield Item_1.default.countDocuments();
        const totalPages = Math.ceil(total / limit);
        // Devolver resultados paginados
        return res.status(200).json({
            totalPages,
            page,
            limit,
            items
        });
    }
    catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
});
exports.getAllCompanyItemsPagination = getAllCompanyItemsPagination;
// Obtener un Item por ID
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item_1.default.findById(req.params.id);
        if (!Item_1.default)
            return res.status(404).json({ message: 'Item no encontrado' });
        res.status(200).json(Item_1.default);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getItemById = getItemById;
// Actualizar un Item
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedItem = yield Item_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem)
            return res.status(404).json({ message: 'Item no encontrado' });
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.updateItem = updateItem;
// Eliminar un Item
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedItem = yield Item_1.default.findByIdAndDelete(req.params.id);
        if (!deletedItem)
            return res.status(404).json({ message: 'Item no encontrado' });
        res.status(200).json({ message: 'Item eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteItem = deleteItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresaId } = req.params;
        const { page = 1, size = 20, name } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(size, 10) || 20;
        const searchTerm = name ? name : '';
        console.log(searchTerm);
        const query = Object.assign({ company: empresaId }, (searchTerm && { name: { $regex: new RegExp(searchTerm, 'i') } }));
        const items = yield Item_1.default.find(query)
            .populate('product')
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const totalItems = yield Item_1.default.countDocuments(query);
        res.json({
            totalItems,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalItems / pageSize),
            items
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error: error });
    }
});
exports.getItems = getItems;
exports.default = {
    createItem: exports.createItem,
    getAllItems: exports.getAllItems,
    getItemById: exports.getItemById,
    updateItem: exports.updateItem,
    deleteItem: exports.deleteItem
};
