import { Types } from 'mongoose';
import Empresa, { IEmpresa } from '../models/empresa';
import Usuario from '../models/usuario';

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
    
  public async deleteEmpresa(id: String): Promise<IEmpresa | null> { //funciona
    try {
        const empresaEliminada = await Empresa.findByIdAndUpdate(
            id, 
            { estado: false }, 
            { new: true }
        );

        if (!empresaEliminada) {
            throw new Error("Empresa no encontrada");
        }

        // Desactivar usuarios asociados a la empresa
        await Usuario.updateMany({ empresa: id }, { estado: false });

        return empresaEliminada;
    } catch (error: any) {
        throw new Error(error.message || "Error al eliminar la empresa");
    }
  }

  public async getEmpresaById(id: string | Types.ObjectId) {
    const empresa = await Empresa.findById(id);
    return empresa;
  }

  public async getEmpresaByCodigo(codigoInvitacion: string) {
    const empresa = await Empresa.findOne({ codigoInvitacion });
    return empresa;
  }
  
}



export const empresaService = new EmpresaService();
