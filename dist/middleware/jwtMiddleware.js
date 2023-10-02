"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const token = req.header('authorization');
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }
    console.log(token);
    console.log(process.env.JWT);
    jsonwebtoken_1.default.verify(token, process.env.JWT, (err, decoded) => {
        if (err) {
            console.log(err);
            console.log(decoded);
            return res.status(401).json({ error: 'Token inválido' });
        }
        // Agregamos el ID del usuario decodificado a la solicitud para su posterior uso
        req.userId = decoded.userId;
        next();
    });
}
exports.verifyToken = verifyToken;
