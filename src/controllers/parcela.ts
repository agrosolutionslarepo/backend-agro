import { Request, Response, NextFunction } from 'express';
import { parcelaService } from '../servicios/parcela.service';

class ParcelaController {
  public async getAllParcelas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parcelas = await parcelaService.getAllParcelas(req.user.idEmpresa);
      res.json(parcelas);
    } catch (error) {
      next(error);
    }
  }

  public async getParcelaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parcela = await parcelaService.getParcelaById(req.params.id, req.user.idEmpresa);
      res.json(parcela);
    } catch (error) {
      next(error);
    }
  }

  public async createParcela(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empresaId = req.user?.idEmpresa;
  
      if (!empresaId) {
        res.status(401).json({ error: 'ID de empresa no encontrado en el token' });
        return;
      }
  
      const parcela = await parcelaService.createParcela(req.body, empresaId);
      res.status(201).json(parcela);
    } catch (error) {
      next(error);
    }
  }

  public async updateParcela(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actualizada = await parcelaService.updateParcela(req.params.id, req.body, req.user.idEmpresa);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  }

  public async deleteParcela(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idEmpresa = req.user?.idEmpresa;
      const parcelaId = req.params.id;
  
      if (!idEmpresa) {
        res.status(400).json({ message: 'ID de empresa no encontrado en el token' });
        return;
      }
  
      const parcelaEliminada = await parcelaService.deleteParcela(parcelaId, idEmpresa);
  
      if (!parcelaEliminada) {
        res.status(404).json({ message: 'Parcela no encontrada' });
        return;
      }
  
      res.status(200).json({
        message: 'Parcela eliminada correctamente',
        parcela: parcelaEliminada,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ParcelaController();