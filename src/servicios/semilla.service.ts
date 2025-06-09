import Semilla, { ISemilla } from '../models/semilla';
import { sanitize } from '../helpers/sanitize';

class SemillaService {
  public async getAllSemillas(idEmpresa: string): Promise<ISemilla[]> {
    const empresaId = sanitize(idEmpresa) as string;
    return Semilla.find({ empresa: empresaId });
  }

  public async getSemillaById(id: string, idEmpresa: string): Promise<ISemilla | null> {
    const cleanId = sanitize(id) as string;
    const empresaId = sanitize(idEmpresa) as string;
    return Semilla.findOne({ _id: cleanId, empresa: empresaId });
  }

  public async updateSemilla(id: string, data: Partial<ISemilla>, idEmpresa: string): Promise<ISemilla | null> {
    const clean = sanitize({ ...data }) as Partial<ISemilla>;
    const cleanId = sanitize(id) as string;
    const empresaId = sanitize(idEmpresa) as string;
    const semilla = await Semilla.findOneAndUpdate(
      { _id: cleanId, empresa: empresaId },
      clean,
      { new: true }
    );

    if (!semilla) {
      throw new Error('Semilla no encontrada o no pertenece a la empresa');
    }

    return semilla;
  }

  public async crearSemillasBase(idEmpresa: string): Promise<void> {
    await Semilla.insertMany([
      { nombreSemilla: 'Semilla de maíz', tipoSemilla: 'maíz', cantidadSemilla: 0, unidad: 'kg', empresa: idEmpresa },
      { nombreSemilla: 'Semilla de trigo', tipoSemilla: 'trigo', cantidadSemilla: 0, unidad: 'kg', empresa: idEmpresa },
      { nombreSemilla: 'Semilla de soja', tipoSemilla: 'soja', cantidadSemilla: 0, unidad: 'kg', empresa: idEmpresa },
    ]);
  }
}

export const semillaService = new SemillaService();