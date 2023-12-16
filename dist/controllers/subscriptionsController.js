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
exports.crearCliente = exports.crearSuscripcion = exports.obtenerPreciosDeProducto = exports.obtenerProductos = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_DEV_KEY, { apiVersion: '2023-10-16' });
// Obtener todos los productos (suscripciones) de Stripe
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stripeResponse = yield stripe.products.list();
        res.status(200).json({
            ok: true,
            stripeResponse
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});
exports.obtenerProductos = obtenerProductos;
// Obtener los precios de un producto específico
const obtenerPreciosDeProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const precios = yield stripe.prices.list({ product: productId });
        res.status(200).json({
            ok: true,
            precios
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los precios del producto', error });
    }
});
exports.obtenerPreciosDeProducto = obtenerPreciosDeProducto;
// Crear una nueva suscripción
const crearSuscripcion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, priceId } = req.body;
        const stripeSubscription = yield stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent'],
        });
        if (stripeSubscription.latest_invoice) {
            // Aquí puedes manejar la información de la factura si es necesario
        }
        res.status(201).json({ message: 'Suscripción creada exitosamente', stripeSubscription });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la suscripción', error });
    }
});
exports.crearSuscripcion = crearSuscripcion;
const crearCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, description } = req.body;
        const customer = yield stripe.customers.create({
            email,
            name,
            description
        });
        res.status(201).json({ message: 'Cliente creado exitosamente', customer });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error });
    }
});
exports.crearCliente = crearCliente;
