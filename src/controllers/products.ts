// src/controllers/productController.ts

import { Request, Response } from 'express';
import Product from '../models-mongoose/Products';


// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new Product(req.body);
        newProduct.img=''
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Obtener todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate('supplier')
        res.status(200).json({ok:true,products});
    } catch (error) {
        res.status(500).json({ message:error });
    }
};
export const getAllCompanyProducts = async (req: Request, res: Response) => {
    try {
        const {id}=req.params
        const products = await Product.find({company:id}).populate('supplier')
        res.status(200).json({ok:true,products});
    } catch (error) {
        res.status(500).json({ message:error });
    }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplier')
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ok:true,product});
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
