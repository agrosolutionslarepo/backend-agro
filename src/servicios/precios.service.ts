import Price from '../models/precios';

export async function savePrice(doc: { symbol: string; price: number; ts: Date }) {
  // Evita duplicar dentro de la misma ventana de 40 min
  return Price.findOneAndUpdate(
    { symbol: doc.symbol, ts: { $lte: doc.ts, $gte: new Date(doc.ts.getTime() - 40 * 60000) } },
    doc,
    { upsert: true, new: true }
  );
}

export async function getLatest(symbol: string) {
  return Price.findOne({ symbol }).sort({ ts: -1 }).lean();
}

export async function getHistory(symbol: string, limit = 100) {
  return Price.find({ symbol }).sort({ ts: -1 }).limit(limit).lean();
}