import mongoose, { Schema, Document } from 'mongoose';

// Definición de la interfaz para el objeto de suscripción
interface Suscription {
    month: string;
    cuttOfDate: Date;
    state: 'Activo' | 'Inactivo' | 'Pendiente';
    amountPaid: number;
    payMethod: string;
    payReference: string;
}

// Definición de la interfaz para el documento de empresa
export interface EmpresaDocument extends Document {
    name: string;
    adminId: mongoose.Types.ObjectId;
    img?: string;
    description: string;
    address: string;
    tel: string;
    email: string;
    createdAt: Date;
    SuscriptionsHistory?: Suscription[];
}

// Esquema del modelo de empresa
const empresaSchema = new Schema<EmpresaDocument>({
    name: {
        type: String, 
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Asegúrate de que esta es la referencia correcta al modelo de usuario
        required: true,
    },
    img: String,
    description: String,
    address: String,
    tel: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    SuscriptionsHistory: [{
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
