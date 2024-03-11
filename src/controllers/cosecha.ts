import { Request, Response } from 'express';
import Cosecha, { ICosecha } from '../models/cosecha';

class CosechaController {
  // Obtener todas las cosechas
  public async getAllCosechas(_req: Request, res: Response): Promise<void> {
    try {
      const cosechas: ICosecha[] = await Cosecha.find();
      res.json(cosechas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las cosechas' });
    }
  }

  // Obtener una cosecha por su ID
  public async getCosechaById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const cosecha: ICosecha | null = await Cosecha.findOne({ idCosecha: id });

      if (cosecha) {
        res.json(cosecha);
      } else {
        res.status(404).json({ error: 'Cosecha no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la cosecha' });
    }
  }

  // Crear una nueva cosecha
  public async createCosecha(req: Request, res: Response): Promise<Response> {
    const nuevaCosecha: ICosecha = req.body;

    // Validar los datos de entrada
    if (
      !nuevaCosecha ||
      typeof nuevaCosecha.idCosecha !== 'number' ||
      typeof nuevaCosecha.nombreCosecha !== 'string' ||
      typeof nuevaCosecha.tipoCultivo !== 'string' ||
      typeof nuevaCosecha.cantidadCosechado !== 'number' ||
      !(nuevaCosecha.fechaDeCosecha instanceof Date) ||
      typeof nuevaCosecha.estado !== 'boolean'
    ) {
      return res.status(400).json({ error: 'Los datos de entrada son inválidos' });
    }

    try {
      const cosechaCreada: ICosecha = await Cosecha.create(nuevaCosecha);
      return res.status(201).json(cosechaCreada);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la cosecha' });
    }
  }

  // Actualizar una cosecha por su ID
  public async updateCosecha(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const datosActualizados: ICosecha = req.body;

    try {
      const cosechaActualizada: ICosecha | null = await Cosecha.findOneAndUpdate(
        { idCosecha: id },
        datosActualizados,
        { new: true }
      );

      if (cosechaActualizada) {
        res.json(cosechaActualizada);
      } else {
        res.status(404).json({ error: 'Cosecha no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la cosecha' });
    }
  }

  // Eliminar una cosecha por su ID
  public async deleteCosecha(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const cosechaEliminada: ICosecha | null = await Cosecha.findOneAndDelete({
        idCosecha: id,
      });

      if (cosechaEliminada) {
        res.json({ message: 'Cosecha eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Cosecha no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la cosecha' });
    }
  }
}

export default new CosechaController();
