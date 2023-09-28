"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = process.env.JWT;
const generateToken = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(token);
                reject('could not generate JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
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
