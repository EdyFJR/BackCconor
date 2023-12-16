"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileupload_1 = require("../controllers/fileupload");
const router = (0, express_1.Router)();
router.put('/:tipo/:id', fileupload_1.subirArchivo);
exports.default = router;
