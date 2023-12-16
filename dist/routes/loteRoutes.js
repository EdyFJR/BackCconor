"use strict";
// src/routes/loteRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lotesController_1 = require("../controllers/lotesController");
const router = express_1.default.Router();
router.post('/', lotesController_1.createLote);
router.get('/', lotesController_1.getAllLotes);
router.get('/:id', lotesController_1.getLoteById);
router.put('/:id', lotesController_1.updateLote);
router.delete('/:id', lotesController_1.deleteLote);
exports.default = router;
