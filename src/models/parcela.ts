import mongoose, { Schema, Document } from 'mongoose';
import { IEmpresa } from './empresa';

export interface IParcela extends Document {
  nombreParcela: string;
  tipoCultivo: string;
  tamaño: number;
  ubicacion: string;
  fechaCultivo: Date;
  estado: boolean;
  gdd: number;
  latitud: number;
  longitud: number;
  empresa: IEmpresa['_id'];
}

const ParcelaSchema = new Schema<IParcela>({
  nombreParcela: {
    type: String,
    required: true,
    trim: true,
  },
  tipoCultivo: {
    type: String,
    required: true,
    trim: true,
  },
  tamaño: {
    type: Number,
    required: true,
    min: 0,
  },
  ubicacion: {
    type: String,
    required: true,
    trim: true,
  },
  fechaCultivo: {
    type: Date,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
  },
  gdd: {
    type: Number,
    required: false,
  },
  latitud: {
    type: Number,
    required: false,
  },
  longitud: {
    type: Number,
    required: false,
  },
  empresa: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true,
  },
});

export default mongoose.model<IParcela>('Parcela', ParcelaSchema);