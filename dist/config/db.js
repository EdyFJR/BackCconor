"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/config/database.ts
const mongoose_1 = __importDefault(require("mongoose"));
// URL de conexión a la base de datos MongoDB
const dbURL = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.lw2yqfr.mongodb.net/`;
// Configuración de conexión
// Conexión a la base de datos MongoDB
const connection = mongoose_1.default.connect(dbURL);
exports.default = connection;
