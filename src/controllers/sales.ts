// src/controllers/saleController.ts

import { Request, Response } from 'express';
import Sale from '../models-mongoose/Sales';


// Crear una nueva venta
export const createSale = async (req: Request, res: Response) => {
    try {
        const newSale = new Sale(req.body);
        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Obtener todas las ventas
export const getAllSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find().populate('user').populate('productsSold.productId');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Obtener una venta por ID
export const getSaleById = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('user').populate('productsSold.productId');
        if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};