import mongoose, { Schema, Document } from 'mongoose';

export interface ICosecha extends Document {
  nombreCosecha: String,
  tipoCultivo: String,
  cantidadCosechado: Number, 
  fechaDeCosecha: Date, 
  estado: Boolean
}

const CosechaSchema = new Schema({
  nombreCosecha: String,
  tipoCultivo: String,
  cantidadCosechado: Number, 
  fechaDeCosecha: Date,
  estado: Boolean
});

export default mongoose.model<ICosecha>('Cosecha', CosechaSchema);