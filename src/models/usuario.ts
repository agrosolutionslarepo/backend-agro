import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
  nombreUsuario: String,
  nombre: String,
  apellido: String,
  fechaNacimiento: Date,
  contraseña: String,
  email: String,
  estado: Boolean, // 1: activo , 2: inactivo
  empresa: Schema.Types.ObjectId, // id de la empresa
}

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  estado:{
    type: Boolean,
    required: true,
  },
  empresa: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa', // Nombre del modelo de empresa
  },
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);