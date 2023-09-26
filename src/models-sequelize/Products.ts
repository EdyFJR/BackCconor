// src/models/product.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { SaleDocument } from './Sales'; // Importa el modelo de ventas

// Definición de la interfaz para el documento de producto
export interface ProductDocument extends Document {
  name: string;
  price: number;
  description?: string;
  expirationDate?: Date;
  discount: number;
  sales: Array<mongoose.Types.ObjectId | SaleDocument>; // Campo que hace referencia a las ventas
}

// Esquema del modelo de producto
const productSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  expirationDate: Date,
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  sales: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sale', // Referencia al modelo de venta
    },
  ],
});

// Modelo de producto
const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
