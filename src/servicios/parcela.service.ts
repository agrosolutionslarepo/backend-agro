import Parcela, { IParcela } from '../models/parcela';
import { sanitize } from '../helpers/sanitize';

class ParcelaService {

  public async getAllParcelas(idEmpresa: string): Promise<IParcela[]> {
    return Parcela.find({ empresa: idEmpresa, estado: true });
  }

  public async getParcelaById(id: string, idEmpresa: string): Promise<IParcela | null> {
    return Parcela.findOne({ _id: id, empresa: idEmpresa });
  }

  public async createParcela(data: Partial<IParcela>, idEmpresa: string): Promise<IParcela> {
    const clean = sanitize({ ...data }) as Partial<IParcela>;
    const nuevaParcela = new Parcela({
      ...clean,
      estado: true,
      empresa: idEmpresa,
    });
  
    return nuevaParcela.save();
  }

  public async updateParcela(id: string, data: Partial<IParcela>, idEmpresa: string): Promise<IParcela | null> {
    const clean = sanitize({ ...data }) as Partial<IParcela>;
    const actualizada = await Parcela.findOneAndUpdate(
      { _id: id, empresa: idEmpresa },
      clean,
      { new: true }
    );

    if (!actualizada) {
      throw new Error('Parcela no encontrada o no pertenece a la empresa');
    }

    return actualizada;
  }

  public async deleteParcela(id: string, idEmpresa: string): Promise<IParcela | null> {
    const parcela = await Parcela.findOne({ _id: id, empresa: idEmpresa });

    if (!parcela) {
      throw new Error('Parcela no encontrada o no pertenece a la empresa');
    }

    parcela.estado = false;
    return parcela.save();
    }
  }

export const parcelaService = new ParcelaService();
