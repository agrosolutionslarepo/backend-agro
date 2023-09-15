import mongoose, { Schema, Document } from 'mongoose';

export interface IEmpresa extends Document {
  idNombreEmpresa: Number,
  nombreEmpresa: String,
}

const EmpresaSchema = new Schema({
  idNombreEmpresa: {
    type: Number,
    required: true, // Hace que el campo sea requerido
    unique: true,   // Hace que el campo sea único
  },
  nombreEmpresa: String,
});

export default mongoose.model<IEmpresa>('Empresa', EmpresaSchema);
