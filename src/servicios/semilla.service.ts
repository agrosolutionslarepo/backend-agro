import Semilla, { ISemilla } from '../models/semilla';

class SemillaService {
  public async getAllSemillas(idEmpresa: string): Promise<ISemilla[]> {
    return Semilla.find({ empresa: idEmpresa });
  }

  public async getSemillaById(id: string, idEmpresa: string): Promise<ISemilla | null> {
    return Semilla.findOne({ _id: id, empresa: idEmpresa });
  }

  public async updateSemilla(id: string, data: Partial<ISemilla>, idEmpresa: string): Promise<ISemilla | null> {
    const semilla = await Semilla.findOneAndUpdate(
      { _id: id, empresa: idEmpresa },
      data,
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