import Empresa, { IEmpresa } from '../models/empresa';

class EmpresaService {
  /**
   * Crea una nueva empresa en la base de datos.
   * @param data Datos necesarios para crear la empresa (nombre, dirección, etc.).
   * @returns La empresa recién creada (documento de Mongoose).
   */
  public async createEmpresa(data: any) {
    try {
    const nuevaEmpresa: IEmpresa = data;
    
        // Validar los datos de entrada
        if (!nuevaEmpresa || typeof nuevaEmpresa.idNombreEmpresa !== 'number' || typeof nuevaEmpresa.nombreEmpresa !== 'string') {
          throw new Error();
        }
          const empresaCreada: IEmpresa = await Empresa.create(nuevaEmpresa);
          return empresaCreada;
        } catch (error) {
            throw new Error();
        }
      }
    
  

  /**
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
