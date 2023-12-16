import mongoose, { Schema } from "mongoose";

export interface Item {
    name:string;
    product: Schema.Types.ObjectId,
    stock: Number,
    price: Number,
    expirationDate?: Date;
    discount: number;
    receivedDate: Date,
    company:Schema.Types.ObjectId
}

const itemSchema = new Schema<Item>({
    
    name:String,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    price: {  
        type: Number, 
        required: true
    }, 
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100,
    },
    receivedDate: Date,
    expirationDate: Date,
    
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
