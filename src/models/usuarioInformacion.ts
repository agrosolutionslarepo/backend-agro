import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuarioInformacion extends Document {
  idUsuario: Number,
  nombreUsuario: String,
  fechaNacimiento: Date,
  contraseña: String, // TODO Averiguar que formato poner para la contraseña
  email: Boolean,
  estado: Boolean
}

const UsuarioInformacionSchema = new Schema({
  idUsuario: {
    type: Number,
    required: true,
    unique: true, 
  },
  nombreUsuario: {
    type: String,
    required: true, 
    unique: true,
  },
  fechaNacimiento: Date,
  contraseña: {
    type: String,
    required: true, // Hace que el campo sea requerido
  },
  email: {
    type: String,
    required: true, 
    unique: true,
  },
  estado: Boolean
});

export default mongoose.model<IUsuarioInformacion>('UsuarioInformacion', UsuarioInformacionSchema);