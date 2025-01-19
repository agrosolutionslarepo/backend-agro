import mongoose, { Schema, Document } from 'mongoose';

export interface ISemilla extends Document {
  nombreSemilla: String,
  tipoSemilla: String,
  cantidadSemilla: Number,
  estado: Boolean // ? Es necesario tener estado para las semillas si va a haber cantidad?
}

const SemillaSchema = new Schema({
  nombreSemilla: String,
  tipoSemilla: String,
  cantidadSemilla: Number,
  estado: Boolean // ? Es necesario tener estado para las semillas si va a haber cantidad?
});

export default mongoose.model<ISemilla>('Semilla', SemillaSchema);