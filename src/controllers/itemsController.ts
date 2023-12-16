// src/controllers/ItemController.ts

import { Request, Response } from 'express';


import Empresa from '../models-mongoose/Company';
import Product from '../models-mongoose/Products';
import Item from '../models-mongoose/Item';


// Crear un nuevo Item
export const createItem = async (req: Request, res: Response) => {
    try {


        //obtener companyId de Producto Padre
        const fatherId = req.body.product
        const producto=await Product.findById(fatherId)
        
        
        if(!producto){
            res.status(404).json({
                ok:false,
                msg:"Producto No Existe"
            });
        }
        
        req.body.company = producto?.company
        
        const newItem = new Item(req.body);

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Obtener todos los Items
export const getAllItems = async (req: Request, res: Response) => {
    try {
        const Items = await Item.find();
        res.status(200).json(Items);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
// Obtener todos los Items
export const getAllCompanyItems = async (req: Request, res: Response) => {
    try {
        const {id}=req.params
        const company = await Empresa.findById(id);
        if (!company) return res.status(404).json({ message: 'Compañia no encontrada' });

        const items = await Item.find({company:id});
        res.status(200).json({ok:true, items});
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
export const getAllCompanyItemsPagination = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Parámetros de paginación con valores por defecto

        
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        // Calcular el desplazamiento
        const skip = (page - 1) * limit;
        const {companyId} = req.params
        const company = await Empresa.findById(companyId);
        if (!company) {
          return res.status(404).json({ message: 'Empresa no existe' });
        }
        // Obtener datos paginados
        const items = await Item.find({company:companyId}).skip(skip).limit(limit);

        // Contar el total de documentos para calcular el total de páginas
        const total = await Item.countDocuments();
        const totalPages = Math.ceil(total / limit);

        // Devolver resultados paginados
        return res.status(200).json({
            totalPages,
            page,
            limit,
            items
        });
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};

// Obtener un Item por ID
export const getItemById = async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!Item) return res.status(404).json({ message: 'Item no encontrado' });
        res.status(200).json(Item);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Actualizar un Item
export const updateItem = async (req: Request, res: Response) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item no encontrado' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Eliminar un Item
export const deleteItem = async (req: Request, res: Response) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item no encontrado' });
        res.status(200).json({ message: 'Item eliminado' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};
