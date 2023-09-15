import mongoose, { Schema, Document } from 'mongoose';

export interface ICosecha extends Document {
  idCosecha: Number,
  nombreCosecha: String,
  tipoCultivo: String,
  cantidadCosechado: Number, 
  fechaDeCosecha: Date, 
  estado: Boolean
}

const CosechaSchema = new Schema({
  idCosecha: {
    type: Number,
    required: true, // Hace que el campo sea requerido
    unique: true,   // Hace que el campo sea único
  },
  nombreCosecha: String,
  tipoCultivo: String,
  cantidadCosechado: Number, 
  fechaDeCosecha: Date,
  estado: Boolean
});

export default mongoose.model<ICosecha>('Cosecha', CosechaSchema);