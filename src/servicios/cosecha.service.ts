import Cosecha, { ICosecha } from '../models/cosecha';
import Cultivo from '../models/Cultivo';

class CosechaService {
  public async getAllCosechas(idEmpresa: string): Promise<ICosecha[]> {
    return Cosecha.find({ empresa: idEmpresa, estado: true }).populate('cultivo');
  }

  public async getCosechaById(id: string, idEmpresa: string): Promise<ICosecha | null> {
    return Cosecha.findOne({ _id: id, empresa: idEmpresa }).populate('cultivo');
  }

  public async createCosecha(data: Partial<ICosecha>, idEmpresa: string): Promise<ICosecha> {
    const { cultivo, cantidadCosechada, unidad, observaciones } = data;
  
    // Validar que el cultivo pertenece a la empresa
    const cultivoExiste = await Cultivo.findOne({ _id: cultivo, empresa: idEmpresa });
    if (!cultivoExiste) {
      throw new Error('Cultivo no válido para esta empresa');
    }
  
    const nueva = new Cosecha({
      fechaCosecha: new Date(), // Usamos fecha actual automáticamente
      cantidadCosechada,
      unidad,
      observaciones,
      cultivo,
      empresa: idEmpresa,
      estado: true,
    });
  
    return nueva.save();
  }

  public async updateCosecha(id: string, data: Partial<ICosecha>, idEmpresa: string): Promise<ICosecha | null> {
    const actual = await Cosecha.findOne({ _id: id, empresa: idEmpresa });
    if (!actual) throw new Error('Cosecha no encontrada o no pertenece a la empresa');

    const updateData = {
      ...data,
      cultivo: data.cultivo ?? actual.cultivo,
    };

    return Cosecha.findByIdAndUpdate(id, updateData, { new: true });
  }

  public async deleteCosecha(id: string, idEmpresa: string): Promise<ICosecha | null> {
    const cosecha = await Cosecha.findOne({ _id: id, empresa: idEmpresa });

    if (!cosecha) throw new Error('Cosecha no encontrada o no pertenece a la empresa');

    cosecha.estado = false;
    return cosecha.save();
  }
}

export const cosechaService = new CosechaService();
