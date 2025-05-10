import { Request, Response, NextFunction } from 'express';
import { semillaService } from '../servicios/semilla.service';

class SemillaController {
  public async getAllSemillas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idEmpresa = req.user?.idEmpresa;
      const semillas = await semillaService.getAllSemillas(idEmpresa);
      res.json(semillas);
    } catch (error) {
      next(error);
    }
  }

  public async getSemillaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idEmpresa = req.user?.idEmpresa;
      const id = req.params.id;
      const semilla = await semillaService.getSemillaById(id, idEmpresa);
      res.json(semilla);
    } catch (error) {
      next(error);
    }
  }

  public async agregarSemilla(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idEmpresa = req.user?.idEmpresa;
      const { tipoSemilla, cantidad, unidad } = req.body;

      const semilla = await semillaService.agregarSemilla(tipoSemilla, cantidad, unidad, idEmpresa);
      res.status(200).json(semilla);
    } catch (error) {
      next(error);
    }
  }

  public async updateSemilla(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const idEmpresa = req.user?.idEmpresa;
      const actualizada = await semillaService.updateSemilla(id, req.body, idEmpresa);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  }

}

export default new SemillaController();