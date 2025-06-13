import { Request, Response, NextFunction } from 'express';
import { cosechaService } from '../services/cosecha.service';

class CosechaController {
  public async getAllCosechas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cosechas = await cosechaService.getAllCosechas(req.user.idEmpresa);
      res.json(cosechas);
    } catch (error) {
      next(error);
    }
  }

  public async getCosechaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cosecha = await cosechaService.getCosechaById(req.params.id, req.user.idEmpresa);
      res.json(cosecha);
    } catch (error) {
      next(error);
    }
  }

  public async createCosecha(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cosecha = await cosechaService.createCosecha(req.body, req.user.idEmpresa);
      res.status(201).json(cosecha);
    } catch (error) {
      next(error);
    }
  }

  public async updateCosecha(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await cosechaService.updateCosecha(req.params.id, req.body, req.user.idEmpresa);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  public async deleteCosecha(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eliminado = await cosechaService.deleteCosecha(req.params.id, req.user.idEmpresa);
      res.status(200).json({ message: 'Cosecha eliminada', cosecha: eliminado });
    } catch (error) {
      next(error);
    }
  }
}

export default new CosechaController();
