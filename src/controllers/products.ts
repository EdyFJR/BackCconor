import { Request, Response } from 'express';
import Product from '../models-sequelize/Products';

// Controlador para obtener todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Controlador para obtener un producto por su ID
export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Controlador para crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, expirationDate, discount } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      expirationDate,
      discount,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Controlador para actualizar un producto por su ID
export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { name, price, description, expirationDate, discount } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        description,
        expirationDate,
        discount,
      },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Controlador para eliminar un producto por su ID
export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
