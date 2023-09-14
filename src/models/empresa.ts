import mongoose, { Schema, Document } from 'mongoose';


// Configuración global para desactivar el campo de versión '__v' | no funciona
mongoose.set('toJSON', { versionKey: false });
mongoose.set('toObject', { versionKey: false });

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
