import mongoose, { Schema, Document } from 'mongoose';
import { IEmpresa } from './empresa';

export interface IParcela extends Document {
  idParcela: Number,
  nombreParcela: String,
  tipoCultivo: String,
  tamaño: Number,
  ubicacion: String,
  fechaCultivo: Date,
  estado: Boolean,
  empresa: IEmpresa['_id']; // Referencia a la empresa a la que pertenece la parcela
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
  estado: Boolean,
  empresa: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa', // Nombre del modelo de empresa
  },
});

export default mongoose.model<IParcela>('Parcela', ParcelaSchema);