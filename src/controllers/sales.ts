import { Request, Response } from 'express';
import  Sale  from '../models-sequelize/Sales';

// Controlador para obtener todas las ventas
export const getAllSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

// Controlador para obtener una venta por su ID
export const getSaleById = async (req: Request, res: Response) => {
  const saleId = req.params.id;

  try {
    const sale = await Sale.findById(saleId);

    if (!sale) {
      res.status(404).json({ error: 'Venta no encontrada' });
      return;
    }

    res.json(sale);
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    res.status(500).json({ error: 'Error al obtener la venta' });
  }
};

// Controlador para crear una nueva venta
export const createSale = async (req: Request, res: Response) => {
  const { date, total, discount, iva, productsSold } = req.body;

  try {
    const newSale = new Sale({
      date,
      total,
      discount,
      iva,
      productsSold,
    });

    const savedSale = await newSale.save();
    res.json(savedSale);
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

// Controlador para eliminar una venta por su ID
export const cancelSale = async (req: Request, res: Response) => {
  const saleId = req.params.id;

  try {
    const deletedSale = await Sale.findByIdAndDelete(saleId);

    if (!deletedSale) {
      res.status(404).json({ error: 'Venta no encontrada' });
      return;
    }

    res.json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    res.status(500).json({ error: 'Error al eliminar la venta' });
  }
};
