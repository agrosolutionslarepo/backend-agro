import mongoose, { Schema, Document } from 'mongoose';

export interface IIngresoUsuario extends Document {
  idUsuario: Number,
  fechaIngreso: Date,
}

const IngresoUsuarioSchema = new Schema({
  idUsuario: {
    type: Number,
    required: true,
    unique: true, 
  },
  fechaIngreso: Date,
});

export default mongoose.model<IIngresoUsuario>('IngresoUsuario', IngresoUsuarioSchema);