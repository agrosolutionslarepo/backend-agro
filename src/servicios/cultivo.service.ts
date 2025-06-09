import Cultivo, { ICultivo } from '../models/Cultivo';
import Semilla from '../models/semilla';
import Parcela from '../models/parcela';
import { sanitize } from '../helpers/sanitize';

class CultivoService {
  public async getAllCultivos(idEmpresa: string): Promise<ICultivo[]> {
    const cleanEmpresa = sanitize(idEmpresa) as string;
    return Cultivo.find({ empresa: cleanEmpresa, estado: true }).populate('semilla').populate('parcela');
  }

  public async getCultivoById(id: string, idEmpresa: string): Promise<ICultivo | null> {
    const cleanId = sanitize(id) as string;
    const cleanEmpresa = sanitize(idEmpresa) as string;
    return Cultivo.findOne({ _id: cleanId, empresa: cleanEmpresa }).populate('semilla').populate('parcela');
  }

  public async createCultivo(data: Partial<ICultivo>, idEmpresa: string): Promise<ICultivo> {
    const cleanEmpresa = sanitize(idEmpresa) as string;
    const clean = sanitize({ ...data }) as Partial<ICultivo>;
    const { semilla, parcela, cantidadSemilla, unidad, fechaSiembra, fechaCosecha } = clean;

    // Validar existencia de semilla y parcela dentro de la empresa
    const semillaExiste = await Semilla.findOne({ _id: semilla, empresa: cleanEmpresa });
    const parcelaExiste = await Parcela.findOne({ _id: parcela, empresa: cleanEmpresa });

    if (!semillaExiste || !parcelaExiste) {
      throw new Error('Semilla o Parcela no válida para esta empresa');
    }

    const cultivo = new Cultivo({
      fechaSiembra,
      fechaCosecha,
      cantidadSemilla,
      unidad,
      semilla,
      parcela,
      empresa: cleanEmpresa,
      estado: true,
    });

    return cultivo.save();
  }

  public async updateCultivo(id: string, data: Partial<ICultivo>, idEmpresa: string): Promise<ICultivo | null> {
    const cleanId = sanitize(id) as string;
    const cleanEmpresa = sanitize(idEmpresa) as string;
    const cultivoActual = await Cultivo.findOne({ _id: cleanId, empresa: cleanEmpresa });
    
    if (!cultivoActual) {
      throw new Error('Cultivo no encontrado o no pertenece a la empresa');
    }

    // Si no se manda semilla o parcela, mantener las actuales
    const clean = sanitize({ ...data }) as Partial<ICultivo>;
    const updateData = {
      ...clean,
      semilla: clean.semilla ?? cultivoActual.semilla,
      parcela: clean.parcela ?? cultivoActual.parcela,
    };
  
    const actualizado = await Cultivo.findByIdAndUpdate(cleanId, updateData, { new: true });
    return actualizado;
  }

  public async deleteCultivo(id: string, idEmpresa: string): Promise<ICultivo | null> {
    const cleanId = sanitize(id) as string;
    const cleanEmpresa = sanitize(idEmpresa) as string;
    const cultivo = await Cultivo.findOne({ _id: cleanId, empresa: cleanEmpresa });

    if (!cultivo) {
      throw new Error('Cultivo no encontrado o no pertenece a la empresa');
    }

    cultivo.estado = false;
    return cultivo.save();
  }
}

export const cultivoService = new CultivoService();