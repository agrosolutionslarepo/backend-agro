import { Request, Response } from 'express';
import Empresa, { IEmpresa } from '../models/empresa';
import {CustRequest} from '../definitrion';

class EmpresaController {
  // Obtener todas las empresas
  public async getAllEmpresas(_req: Request, res: Response, next: any): Promise<void> {
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

  // Crear una nueva empresa
  public async createEmpresa(req: Request, res: Response): Promise<Response> {
    const nuevaEmpresa: IEmpresa = req.body;

    // Validar los datos de entrada
    if (!nuevaEmpresa || typeof nuevaEmpresa.idNombreEmpresa !== 'number' || typeof nuevaEmpresa.nombreEmpresa !== 'string') {
      return res.status(400).json({ error: 'Los datos de entrada son inválidos' });
    }

    try {
      const empresaCreada: IEmpresa = await Empresa.create(nuevaEmpresa);
      return res.status(201).json(empresaCreada);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la empresa' });
    }
  }

  // Actualizar una empresa por su ID
  public async updateEmpresa(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const datosActualizados: IEmpresa = req.body;

    try {
      const empresaActualizada: IEmpresa | null = await Empresa.findOneAndUpdate(
        { idNombreEmpresa: id },
        datosActualizados,
        { new: true }
      );

      if (empresaActualizada) {
        res.json(empresaActualizada);
      } else {
        res.status(404).json({ error: 'Empresa no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
  }

  // Eliminar una empresa por su ID
  public async deleteEmpresa(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const empresaEliminada: IEmpresa | null = await Empresa.findOneAndDelete({
        idNombreEmpresa: id,
      });

      if (empresaEliminada) {
        res.json({ message: 'Empresa eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Empresa no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la empresa' });
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
