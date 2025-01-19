import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
  nombreUsuario: String,
  fechaNacimiento: Date,
  contraseña: String,
  email: String,
  estado: Boolean
  empresa: Schema.Types.ObjectId, // Nueva propiedad para la empresa a la que pertenece
}

const UsuarioSchema = new Schema({
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
  estado: Boolean,
  empresa: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa', // Nombre del modelo de empresa
  },
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);