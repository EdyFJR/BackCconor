"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Esquema del modelo de empresa
const empresaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    img: String,
    description: String,
    address: String,
    tel: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    SuscriptionsHistory: [{
            mes: String,
            fechaCorte: Date,
            estado: {
                type: String,
                enum: ['Activo', 'Inactivo', 'Pendiente'],
                default: 'Activo',
            },
            montoPagado: Number,
            metodoPago: String,
            referenciaPago: String,
        }],
});
// Modelo de empresa
const Empresa = mongoose_1.default.model('Empresa', empresaSchema);
exports.default = Empresa;
