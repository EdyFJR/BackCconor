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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("../routes/productRoutes"));
const saleRoutes_1 = __importDefault(require("../routes/saleRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.connectToDatabase();
        this.port = process.env.PORT || '3000';
        this.config();
        this.routes();
        this.start();
    }
    config() {
        // Configuración de middlewares
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/auth', authRoutes_1.default); // Autenticación
        this.app.use('/api/products', productRoutes_1.default); // Rutas para productos
        this.app.use('/api/sales', saleRoutes_1.default); // Rutas para ventas
        this.app.use('/api/users', userRoutes_1.default); // Rutas para usuarios
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                require('../config/db');
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}
exports.Server = Server;
