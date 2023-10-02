import mongoose, { Schema, Document } from 'mongoose';

// Definición de la interfaz para el objeto de suscripción
interface Suscripcion {
    mes: string;
    fechaCorte: Date;
    estado: 'Activo' | 'Inactivo' | 'Pendiente';
    montoPagado: number;
    metodoPago: string;
    referenciaPago: string;
}

// Definición de la interfaz para el documento de empresa
export interface EmpresaDocument extends Document {
    nombre: string;
    adminId: mongoose.Types.ObjectId; // Referencia al usuario administrador
    imagen: string;
    descripcion: string;
    direccion: string;
    telefono: string;
    email: string;
    fechaCreacion: Date;
    historialSuscripciones: Suscripcion[];
}

// Esquema del modelo de empresa
const empresaSchema = new Schema<EmpresaDocument>({
    nombre: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Asegúrate de que esta es la referencia correcta al modelo de usuario
        required: true,
    },
    imagen: String,
    descripcion: String,
    direccion: String,
    telefono: String,
    email: String,
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    historialSuscripciones: [{
        mes: String,
        fechaCorte: Date,
        estado: {
            type: String,
            enum: ['Activo', 'Inactivo', 'Pendiente'],
            default: 'Activo',
        },
        montoPagado: Number,
        metodoPago: String,
        referenciaPago: String,
    }],
});

// Modelo de empresa
const Empresa = mongoose.model<EmpresaDocument>('Empresa', empresaSchema);

export default Empresa;
