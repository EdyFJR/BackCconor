"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscriptionsController_1 = require("../controllers/subscriptionsController");
const router = (0, express_1.Router)();
router.get('/', subscriptionsController_1.obtenerProductos);
exports.default = router;
