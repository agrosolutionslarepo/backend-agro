import mongoose, { Schema, Document } from 'mongoose';
import { IEmpresa } from './empresa';

export interface ISemilla extends Document {
  nombreSemilla: String,
  tipoSemilla: String,
  cantidadSemilla: Number,
  empresa: IEmpresa['_id'];
}

const SemillaSchema = new Schema({
  nombreSemilla: String,
  tipoSemilla: String,
  cantidadSemilla: Number,
  empresa: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa', // Nombre del modelo de empresa
  },
});

export default mongoose.model<ISemilla>('Semilla', SemillaSchema);