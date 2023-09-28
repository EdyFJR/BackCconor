"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models-sequelize/User"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                // Verificar las credenciales del usuario en la base de datos
                const user = yield User_1.default.findOne({ username });
                if (!user || user.password !== password) {
                    return res.status(401).json({ error: 'Credenciales incorrectas' });
                }
                // Generar un token JWT con la información del usuario
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT, {
                    expiresIn: '1h', // Tiempo de expiración del token (ejemplo: 1 hora)
                });
                res.json({ token });
            }
            catch (error) {
                console.error('Error al iniciar sesión:', error);
                res.status(500).json({ error: 'Error al iniciar sesión' });
            }
        });
    }
}
exports.default = AuthController;
