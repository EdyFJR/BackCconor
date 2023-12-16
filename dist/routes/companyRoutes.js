"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companiesController_1 = require("../controllers/companiesController"); // Asegúrate de ajustar la ruta al controlador
const jwtMiddleware_1 = require("../middleware/jwtMiddleware");
const router = (0, express_1.Router)();
router.get('/', jwtMiddleware_1.verifyToken, jwtMiddleware_1.validarSysAdmin, companiesController_1.getCompaniesPages);
router.get('/number', jwtMiddleware_1.verifyToken, jwtMiddleware_1.validarSysAdmin, companiesController_1.getNumberCompanies);
router.post('/', jwtMiddleware_1.verifyToken, jwtMiddleware_1.validarSysAdmin, companiesController_1.createEmpresa);
router.get('/:id', jwtMiddleware_1.verifyToken, companiesController_1.getEmpresaById);
router.put('/:id', jwtMiddleware_1.verifyToken, jwtMiddleware_1.validarSysAdmin, companiesController_1.updateEmpresa);
router.delete('/:id', jwtMiddleware_1.verifyToken, jwtMiddleware_1.validarSysAdmin, companiesController_1.deleteEmpresa);
exports.default = router;
