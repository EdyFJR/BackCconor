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
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllItems = exports.createItem = void 0;
const Item_1 = __importDefault(require("../models-mongoose/Item"));
// Crear un nuevo Item
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = new Item_1.default(req.body);
        const savedItem = yield newItem.save();
        res.status(201).json(savedItem);
    }
    catch (error) {
        res.status(400).json({ message: error });
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
exports.default = {
    createItem: exports.createItem,
    getAllItems: exports.getAllItems,
    getItemById: exports.getItemById,
    updateItem: exports.updateItem,
    deleteItem: exports.deleteItem
};
