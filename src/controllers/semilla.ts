import { Request, Response } from 'express';
import Semilla, { ISemilla } from '../models/semilla';

class SemillaController {
  // Obtener todas las semillas
  public async getAllSemillas(_req: Request, res: Response): Promise<void> {
    try {
      const semillas: ISemilla[] = await Semilla.find();
      res.json(semillas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las semillas' });
    }
  }

  // Obtener una semilla por su ID
  public async getSemillaById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const semilla: ISemilla | null = await Semilla.findOne({ idSemilla: id });

      if (semilla) {
        res.json(semilla);
      } else {
        res.status(404).json({ error: 'Semilla no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la semilla' });
    }
  }

  // Crear una nueva semilla
  public async createSemilla(req: Request, res: Response): Promise<Response> {
    const nuevaSemilla: ISemilla = req.body;

    // Validar los datos de entrada
    if (
      !nuevaSemilla ||
      typeof nuevaSemilla.idSemilla !== 'number' ||
      typeof nuevaSemilla.nombreSemilla !== 'string' ||
      typeof nuevaSemilla.tipoSemilla !== 'string' ||
      typeof nuevaSemilla.cantidadSemilla !== 'number' ||
      typeof nuevaSemilla.estado !== 'boolean'
    ) {
      return res.status(400).json({ error: 'Los datos de entrada son inválidos' });
    }

    try {
      const semillaCreada: ISemilla = await Semilla.create(nuevaSemilla);
      return res.status(201).json(semillaCreada);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la semilla' });
    }
  }

  // Actualizar una semilla por su ID
  public async updateSemilla(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const datosActualizados: ISemilla = req.body;

    try {
      const semillaActualizada: ISemilla | null = await Semilla.findOneAndUpdate(
        { idSemilla: id },
        datosActualizados,
        { new: true }
      );

      if (semillaActualizada) {
        res.json(semillaActualizada);
      } else {
        res.status(404).json({ error: 'Semilla no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la semilla' });
    }
  }

  // Eliminar una semilla por su ID
  public async deleteSemilla(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const semillaEliminada: ISemilla | null = await Semilla.findOneAndDelete({
        idSemilla: id,
      });

      if (semillaEliminada) {
        res.json({ message: 'Semilla eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Semilla no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la semilla' });
    }
  }
}

export default new SemillaController();
