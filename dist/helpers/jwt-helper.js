"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = process.env.JWT;
function generateToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT, {
        expiresIn: '1h', // Tiempo de expiración del token (ejemplo: 1 hora)
    });
}
exports.generateToken = generateToken;
function validateToken(token) {
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.validateToken = validateToken;
