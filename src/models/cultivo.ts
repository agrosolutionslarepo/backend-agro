import mongoose, { Schema, Document } from 'mongoose';
import { IEmpresa } from './empresa';
import { ISemilla } from './semilla';
import { IParcela } from './parcela';

export interface ICultivo extends Document {
  fechaSiembra: Date;
  fechaCosecha?: Date;
  cantidadSemilla: Number;
  unidad: 'kg' | 'ton';
  semilla: ISemilla['_id'];
  parcela: IParcela['_id'];
  empresa: IEmpresa['_id'];
}

const CultivoSchema = new Schema<ICultivo>({
  fechaSiembra: {
    type: Date,
    required: true
  },
  fechaCosecha: {
    type: Date,
    required: false
  },
  cantidadSemilla: {
    type: Number,
    required: true,
    min: 0
  },
  unidad: {
    type: String,
    enum: ['kg', 'ton'],
    required: true
  },
  semilla: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semilla',
    required: true
  },
  parcela: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parcela',
    required: true
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  }
});

export default mongoose.model<ICultivo>('Cultivo', CultivoSchema);