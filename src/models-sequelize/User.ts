// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

// Definición de la interfaz para el documento de usuario
export interface UserDocument extends Document {
  username: string;
  password: string;
  name?: string;
  role: 'admin' | 'usuario';
  // Otros campos de usuario aquí
}

// Esquema del modelo de usuario
const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  role: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario',
    required: true,
  },
  // Define otros campos de usuario según tus necesidades
});

// Modelo de usuario
const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
