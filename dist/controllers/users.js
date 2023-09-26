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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models-sequelize/User"));
// Controlador para obtener todos los usuarios
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});
exports.getAllUsers = getAllUsers;
// Controlador para obtener un usuario por su ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});
exports.getUserById = getUserById;
// Controlador para crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, role } = req.body;
    try {
        const newUser = new User_1.default({
            username,
            password,
            name,
            role
        });
        console.log(newUser);
        const savedUser = yield newUser.save();
        res.json(savedUser);
    }
    catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});
exports.createUser = createUser;
// Controlador para actualizar un usuario por su ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { username, password, name, role } = req.body;
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, {
            username,
            password,
            name,
            role,
        }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});
exports.updateUser = updateUser;
// Controlador para eliminar un usuario por su ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json({ message: 'Usuario eliminado con éxito' });
    }
    catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});
exports.deleteUser = deleteUser;
