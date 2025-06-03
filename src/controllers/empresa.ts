import { Request, Response, NextFunction } from 'express';
import { empresaService } from '../servicios/empresa.service';

class EmpresaController {

  public async updateEmpresa(req: Request, res: Response): Promise<Response> {
    const idEmpresa = req.user?.idEmpresa;

    if (!idEmpresa) {
      return res.status(400).json({ error: 'ID de empresa no encontrado en el token' });
    }

    try {
      const empresaActualizada = await empresaService.updateEmpresa(idEmpresa, req.body);
      return res.status(200).json(empresaActualizada);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async getNombreEmpresa(req: Request, res: Response): Promise<Response> {
    const idEmpresa = req.user?.idEmpresa;

    if (!idEmpresa) {
      return res.status(400).json({ error: 'ID de empresa no encontrado en el token' });
    }

    try {
      const nombre = await empresaService.getNombreEmpresa(idEmpresa);
      return res.status(200).json({ nombreEmpresa: nombre });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Error al obtener el nombre de la empresa' });
    }
  }

  public async deleteEmpresa(req: Request, res: Response, next: NextFunction) {
    try {
      const idEmpresa = req.user?.idEmpresa;

      if (!idEmpresa) {
        return res.status(400).json({ message: 'ID de empresa no encontrado en el token' });
      }

      const empresaEliminada = await empresaService.deleteEmpresa(idEmpresa);

      if (!empresaEliminada) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
      }

      return res.status(200).json({
        message: 'Empresa eliminada correctamente',
        empresa: empresaEliminada,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new EmpresaController();
