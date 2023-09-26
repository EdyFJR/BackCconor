// src/models/sale.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from './User'; // Importa el modelo de usuario

// Definición de la interfaz para el documento de venta
export interface SaleDocument extends Document {
  user: mongoose.Types.ObjectId | UserDocument; // Campo que hace referencia al usuario
  date: Date;
  total: number;
  discount: number;
  iva?: number;
  productsSold: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
    unitPrice: number;
  }>;
}

// Esquema del modelo de venta
const saleSchema = new Schema<SaleDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  iva: Number, // Opcional, depende de tus necesidades
  productsSold: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product', // Referencia al modelo de producto
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Modelo de venta
const Sale = mongoose.model<SaleDocument>('Sale', saleSchema);

export default Sale;
