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
exports.deleteEmpresa = exports.updateEmpresa = exports.getEmpresaById = exports.getCompaniesPages = exports.getNumberCompanies = exports.getAllEmpresas = exports.createEmpresa = void 0;
const Company_1 = __importDefault(require("../models-mongoose/Company"));
const User_1 = __importDefault(require("../models-mongoose/User"));
// Crear una nueva empresa
const createEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.body;
        const userExists = yield User_1.default.findById(adminId);
        const userAlreadyAdmin = yield Company_1.default.findOne({ adminId });
        if (!userExists) {
            return res.status(500).json({ error: `Error, el usuario ${adminId} No existe` });
        }
        if (userAlreadyAdmin) {
            return res.status(500).json({ error: `Error, el usuario ${adminId} Ya es administrador de una empresa` });
        }
        const newEmpresa = new Company_1.default(req.body);
        const savedEmpresa = yield newEmpresa.save();
        return res.status(201).json(savedEmpresa);
    }
    catch (error) {
        console.error('Error al crear la empresa:', error);
        return res.status(500).json({ error: 'Error al crear la empresa' });
    }
});
exports.createEmpresa = createEmpresa;
// Obtener todas las empresas
const getAllEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield Company_1.default.find();
        return res.status(200).json({
            ok: true,
            companies
        });
    }
    catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
});
exports.getAllEmpresas = getAllEmpresas;
const getNumberCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numberOfCompanies = yield Company_1.default.count();
        return res.status(200).json({
            ok: true,
            numberOfCompanies
        });
    }
    catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
});
exports.getNumberCompanies = getNumberCompanies;
const getCompaniesPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parámetros de paginación con valores por defecto
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        // Calcular el desplazamiento
        const skip = (page - 1) * limit;
        // Obtener datos paginados
        const companies = yield Company_1.default.find().skip(skip).limit(limit);
        // Contar el total de documentos para calcular el total de páginas
        const total = yield Company_1.default.countDocuments();
        const totalPages = Math.ceil(total / limit);
        // Devolver resultados paginados
        return res.status(200).json({
            totalPages,
            page,
            limit,
            companies
        });
    }
    catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
});
exports.getCompaniesPages = getCompaniesPages;
// Obtener una empresa por su ID
const getEmpresaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresa = yield Company_1.default.findById(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({
            ok: true,
            company: empresa
        });
    }
    catch (error) {
        console.error('Error al obtener la empresa:', error);
        return res.status(500).json({ error: 'Error al obtener la empresa' });
    }
});
exports.getEmpresaById = getEmpresaById;
// Actualizar una empresa
const updateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresa = yield Company_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json(empresa);
    }
    catch (error) {
        console.error('Error al actualizar la empresa:', error);
        return res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
});
exports.updateEmpresa = updateEmpresa;
// Eliminar una empresa
const deleteEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresa = yield Company_1.default.findByIdAndDelete(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({ message: 'Empresa eliminada' });
    }
    catch (error) {
        console.error('Error al eliminar la empresa:', error);
        return res.status(500).json({ error: 'Error al eliminar la empresa' });
    }
});
exports.deleteEmpresa = deleteEmpresa;
