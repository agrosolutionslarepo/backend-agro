import { Request, Response, NextFunction } from 'express';
import { cultivoService } from '../servicios/cultivo.service';

class CultivoController {
  public async getAllCultivos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cultivos = await cultivoService.getAllCultivos(req.user.idEmpresa);
      res.json(cultivos);
    } catch (error) {
      next(error);
    }
  }

  public async getCultivoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cultivo = await cultivoService.getCultivoById(req.params.id, req.user.idEmpresa);
      res.json(cultivo);
    } catch (error) {
      next(error);
    }
  }

  public async createCultivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empresaId = req.user?.idEmpresa;

      if (!empresaId) {
        res.status(401).json({ error: 'ID de empresa no encontrado en el token' });
        return;
      }

      const cultivo = await cultivoService.createCultivo(req.body, empresaId);
      res.status(201).json(cultivo);
    } catch (error) {
      next(error);
    }
  }

  public async updateCultivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actualizado = await cultivoService.updateCultivo(req.params.id, req.body, req.user.idEmpresa);
      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }

  public async deleteCultivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eliminado = await cultivoService.deleteCultivo(req.params.id, req.user.idEmpresa);

      if (!eliminado) {
        res.status(404).json({ message: 'Cultivo no encontrado' });
        return;
      }

      res.status(200).json({
        message: 'Cultivo eliminado correctamente',
        cultivo: eliminado,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CultivoController();