import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import productRoutes from '../routes/productRoutes';
import saleRoutes from '../routes/saleRoutes';
import userRoutes from '../routes/userRoutes';
import authRoutes from '../routes/authRoutes';

export class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.connectToDatabase();
    this.port = process.env.PORT || '3000';

    this.config();
    this.routes();
    this.start();
  }

  private config(): void {
    // Configuración de middlewares
    this.app.use(bodyParser.json());
    this.app.use(cors());

   
  }

  private routes(): void {
    this.app.use('/api/auth', authRoutes); // Autenticación
    this.app.use('/api/products', productRoutes); // Rutas para productos
    this.app.use('/api/sales', saleRoutes); // Rutas para ventas
    this.app.use('/api/users', userRoutes); // Rutas para usuarios
  }

  private async connectToDatabase(): Promise<void> {
    try { 
      require('../config/db');
      
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error); 
    }
  }

  private start(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}

