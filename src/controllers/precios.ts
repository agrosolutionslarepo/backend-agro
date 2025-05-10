import { Request, Response, NextFunction } from 'express';
import { preciosService } from '../servicios/precios.service';

export async function latest(req: Request, res: Response, next: NextFunction) {
  try {
    const { symbol } = req.params;
    const doc = await preciosService.getLatest(symbol.toUpperCase());
    if (!doc) return res.status(404).json({ error: 'not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

export async function history(req: Request, res: Response, next: NextFunction) {
  try {
    const { symbol } = req.params;
    const limit = Number(req.query.limit) || 100;
    const docs = await preciosService.getHistory(symbol.toUpperCase(), limit);
    res.json(docs);
  } catch (err) {
    next(err);
  }
}
