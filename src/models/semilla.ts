import mongoose, { Schema, Document } from 'mongoose';

export interface ISemilla extends Document {
  idSemilla: Number,
  nombreSemilla: String,
  tipoSemilla: String,
  cantidadSemilla: Number,
  estado: Boolean // ? Es necesario tener estado para las semillas si va a haber cantidad?
}

const SemillaSchema = new Schema({
  idSemilla: {
    type: Number,
    required: true, // Hace que el campo sea requerido
    unique: true,   // Hace que el campo sea único
  },
  nombreSemilla: String,
  tipoSemilla: String,
  cantidadSemilla: Number,
  estado: Boolean // ? Es necesario tener estado para las semillas si va a haber cantidad?
});

export default mongoose.model<ISemilla>('Semilla', SemillaSchema);