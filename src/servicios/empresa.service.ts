import Empresa, { IEmpresa } from '../models/empresa';

class EmpresaService {

  public async createEmpresa(data: IEmpresa): Promise<IEmpresa> { // funciona
    if (typeof data.nombreEmpresa !== 'string') {
      throw new Error('Los datos de entrada son inválidos');
    }

    try {
      const empresaCreada: IEmpresa = await Empresa.create(data);
      return empresaCreada;
    } catch (error: any) {
      throw new Error(error.message || 'Error al crear la empresa');
    }
  }

  public async updateEmpresa(id: string, data: Partial<IEmpresa>): Promise<IEmpresa | null> { // funciona
    // Validar los datos de entrada
    if (!data.nombreEmpresa || typeof data.nombreEmpresa !== 'string') {
      throw new Error('El nombre de la empresa es obligatorio y debe ser un string');
    }

    try {
      const empresaActualizada = await Empresa.findByIdAndUpdate(id, data, { new: true });

      if (!empresaActualizada) {
        throw new Error('Empresa no encontrada');
      }

      return empresaActualizada;
    } catch (error: any) {
      throw new Error(error.message || 'Error al actualizar la empresa');
    }
  }
    
  

  /**
   * ESTOS NO LOS USAMOS TODAVIA
   * Busca una empresa por su ID.
   * @param id El ObjectId (string) de la empresa en MongoDB.
   * @returns La empresa encontrada, o null si no existe.
   */
  public async getEmpresaById(id: string) {
    const empresa = await Empresa.findById(id);
    return empresa;
  }

  /**
   * Busca una empresa por su código de invitación.
   * @param codigoInvitacion Código único de invitación.
   * @returns La empresa encontrada, o null si no existe.
   */
  public async getEmpresaByCodigo(codigoInvitacion: string) {
    const empresa = await Empresa.findOne({ codigoInvitacion });
    return empresa;
  }
}
  // Agrega otros métodos según tus necesidades:
  // updateEmpresa, deleteEmpresa, etc.

// Exportas una instancia para usar en tus controladores
export const empresaService = new EmpresaService();
