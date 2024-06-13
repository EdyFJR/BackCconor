"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const jwtMiddleware_1 = require("../middleware/jwtMiddleware");
const router = (0, express_1.Router)();
router.post('/', authController_1.login);
router.get('/renew', [jwtMiddleware_1.verifyToken], authController_1.renewToken);
exports.default = router;
