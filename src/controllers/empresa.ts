import { Request, Response, NextFunction } from 'express';
import Empresa, { IEmpresa } from '../models/empresa';
import {CustRequest} from '../custrequest';
import { empresaService } from '../servicios/empresa.service';

class EmpresaController {

  public async updateEmpresa(req: CustRequest, res: Response): Promise<Response> { 
    try {
        const { idEmpresa } = req.user; // ✅ Obtener el ID de la empresa desde el token
        const data = req.body;

        if (!idEmpresa) {
            return res.status(400).json({ error: "ID de empresa no encontrado en el token" });
        }

        const empresaActualizada = await empresaService.updateEmpresa(idEmpresa, data);
        return res.status(200).json(empresaActualizada);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
  }

  public async deleteEmpresa(req: CustRequest, res: Response, next: NextFunction) { // funciona
    try {
        const { idEmpresa } = req.user; // ✅ Obtener ID de la empresa desde el token

        if (!idEmpresa) {
            return res.status(400).json({ message: "ID de empresa no encontrado en el token" });
        }

        const empresaEliminada = await empresaService.deleteEmpresa(idEmpresa);

        if (!empresaEliminada) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        res.status(200).json({ 
            message: "Empresa eliminada correctamente", 
            empresa: empresaEliminada 
        });
    } catch (error) {
        next(error);
    }
  }

  // Obtener todas las empresas
  public async getAllEmpresas(_req: Request, res: Response, next: any): Promise<void> { // funciona
    try {
      const empresas: IEmpresa[] = await Empresa.find();
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las empresas' });
      next(error);
    }
  }

  // Obtener una empresa por su ID
  public async getEmpresaById(req: Request, res: Response): Promise<void> { 
    const id: number = parseInt(req.params.id, 10);

    try {
      const empresa: IEmpresa | null = await Empresa.findOne({ idNombreEmpresa: id });

      if (empresa) {
        res.json(empresa);
      } else {
        res.status(404).json({ error: 'Empresa no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la empresa' });
    }
  }

  public async getEmpresaLogueado(req: CustRequest, res: Response): Promise<void> {

    const userId = req.user;
    console.log(userId);
    
    const id: number = parseInt(req.params.id, 10);

    try {
      const empresa: IEmpresa | null = await Empresa.findOne({ idNombreEmpresa: id });

      if (empresa) {
        res.json(empresa);
      } else {
        res.status(404).json({ error: 'Empresa no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la empresa' });
    }
  }
}

export default new EmpresaController();
