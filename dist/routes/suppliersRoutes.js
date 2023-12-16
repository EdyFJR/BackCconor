"use strict";
// src/routes/supplierRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const suppliersController_1 = require("../controllers/suppliersController");
const router = express_1.default.Router();
// Ruta para crear un nuevo proveedor
router.post('/:companyId', suppliersController_1.createSupplier);
// Ruta para obtener todos los proveedores
router.get('/', suppliersController_1.getAllSuppliers);
// Ruta para obtener un proveedor por su ID
router.get('/:id', suppliersController_1.getSupplierById);
// Ruta para actualizar un proveedor
router.put('/:id', suppliersController_1.updateSupplier);
// Ruta para eliminar un proveedor
router.delete('/:id', suppliersController_1.deleteSupplier);
// Ruta para obtener proveedores de una empresa específica
router.get('/company/:companyId', suppliersController_1.getCompanySuppliers);
exports.default = router;
