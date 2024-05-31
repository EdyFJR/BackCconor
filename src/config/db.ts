// backend/config/database.ts
import mongoose, { Connection } from 'mongoose';

// URL de conexión a la base de datos MongoDB
const dbURL = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.rew7wcv.mongodb.net/?retryWrites=true&w=majority`;

// Configuración de conexión

// Conexión a la base de datos MongoDB
const connection = mongoose.connect(dbURL);

export default connection;
 