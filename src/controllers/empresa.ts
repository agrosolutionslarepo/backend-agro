import { Request, Response, NextFunction } from 'express';
import Empresa, { IEmpresa } from '../models/empresa';
import {CustRequest} from '../custrequest';
import { empresaService } from '../servicios/empresa.service';

class EmpresaController {

  public async updateEmpresa(req: Request, res: Response): Promise<Response> { // funciona
    const { id } = req.params; // Obtener el ID de la empresa desde la URL
    const data = req.body;
  
    try {
      const empresaActualizada = await empresaService.updateEmpresa(id, data);
      return res.status(200).json(empresaActualizada);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
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

  public async deleteEmpresa(req: Request, res: Response, next: NextFunction) { // funciona
    try {
        const { id } = req.params;
        const empresaEliminada = await empresaService.deleteEmpresa(id);

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
