import { Types } from 'mongoose';
import Cultivo from '../models/Cultivo';
import Parcela from '../models/parcela';
import Usuario from '../models/usuario';
import Notification from '../models/notification';

export interface Lot {
  _id: Types.ObjectId;
  nombre: string;
  cultivo: 'maiz' | 'soja' | 'trigo';
  lat: number;
  lon: number;
  fechaSiembra: Date;
  gddAcum: number;
  userId: Types.ObjectId;
  lastNotifs: string[];
}

export async function updateLotGdd(lotId: Types.ObjectId, gdd: number): Promise<void> {
  await Parcela.findByIdAndUpdate(lotId, { gdd });
}

export async function getActiveLots(): Promise<Lot[]> {
  const cultivos = await Cultivo.find({ estado: true })
    .populate('semilla')
    .populate('parcela')
    .exec();

  const lots: Lot[] = [];

  for (const c of cultivos) {
    const parcela = c.parcela as any;
    const semilla = c.semilla as any;
    const admin = await Usuario.findOne({ empresa: c.empresa, administrador: true });

    if (!parcela || !semilla || !admin) continue;

    const tipo = (semilla.tipoSemilla as string).replace('í', 'i') as 'maiz' | 'soja' | 'trigo';

    lots.push({
      _id: parcela._id,
      nombre: parcela.nombreParcela,
      cultivo: tipo,
      lat: parcela.latitud,
      lon: parcela.longitud,
      fechaSiembra: c.fechaSiembra,
      gddAcum: parcela.gdd || 0,
      userId: admin._id,
      lastNotifs: [],
    });
  }

  return lots;
}

export async function saveNotification(parcelaId: Types.ObjectId, ruleId: string, message: string) {
  await Notification.create({ parcela: parcelaId, ruleId, message });
}