import mongoose, { Schema, Document } from 'mongoose';

export interface IEmpresa extends Document {
  nombreEmpresa: String,
  estado: Boolean
}

const EmpresaSchema = new Schema({
  nombreEmpresa: String,
  estado:{
    type: Boolean,
    required: true,
  } // 1: activo , 2: inactivo
});

export default mongoose.model<IEmpresa>('Empresa', EmpresaSchema);
