import mongoose, { Schema, Document } from 'mongoose';

export interface IParcela extends Document {
  idParcela: Number,
  nombreParcela: String,
  tipoCultivo: String,
  tamaño: Number,
  ubicacion: String,
  fechaCultivo: Date,
  estado: Boolean
}

const ParcelaSchema = new Schema({
  idParcela: {
    type: Number,
    required: true, // Hace que el campo sea requerido
    unique: true,   // Hace que el campo sea único
  },
  nombreParcela: String,
  tipoCultivo: String,
  tamaño: Number,
  ubicacion: String,
  fechaCultivo: Date,
  estado: Boolean
});

export default mongoose.model<IParcela>('Parcela', ParcelaSchema);