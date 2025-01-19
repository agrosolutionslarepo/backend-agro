import mongoose, { Schema, Document } from 'mongoose';

export interface IEmpresa extends Document {
  nombreEmpresa: String
}

const EmpresaSchema = new Schema({
  nombreEmpresa: String
});

export default mongoose.model<IEmpresa>('Empresa', EmpresaSchema);
