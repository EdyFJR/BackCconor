"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = require("../middleware/jwtMiddleware");
const Categories_1 = require("../controllers/Categories");
const router = (0, express_1.Router)();
// Ruta para obtener todos los categorias (disponible para administradores)
router.get('/', jwtMiddleware_1.verifyToken, Categories_1.getAllCategories);
// Ruta para obtener todos los categorias (disponible para administradores)
router.get('/company/pages/:companyId', jwtMiddleware_1.verifyToken, jwtMiddleware_1.validarAdminCompany, Categories_1.getCategoriesCompaniesPagination);
router.get('/company/:companyId', jwtMiddleware_1.verifyToken, Categories_1.getAllCategoriesCompany);
// Ruta para obtener un categoria por su ID (disponible para usuarios y administradores)
router.get('/:id', Categories_1.getCategoryById);
// Ruta para crear un nuevo categoria (disponible para administradores)
router.post('/:idEmpresa', jwtMiddleware_1.verifyToken, Categories_1.createCategory);
// Ruta para actualizar un categoria por su ID (disponible para administradores)
router.put('/:id', jwtMiddleware_1.verifyToken, Categories_1.updateCategory);
// Ruta para eliminar un categoria por su ID (disponible para administradores)
router.delete('/:id', jwtMiddleware_1.verifyToken, Categories_1.deleteCategory);
exports.default = router;
