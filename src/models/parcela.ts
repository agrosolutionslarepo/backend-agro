import mongoose, { Schema, Document } from 'mongoose';
import { IEmpresa } from './empresa';

export interface IParcela extends Document {
  nombreParcela: String,
  tipoCultivo: String,
  tamaño: Number,
  ubicacion: String,
  fechaCultivo: Date,
  estado: Boolean,
  empresa: IEmpresa['_id']; // Referencia a la empresa a la que pertenece la parcela
}

const ParcelaSchema = new Schema({
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