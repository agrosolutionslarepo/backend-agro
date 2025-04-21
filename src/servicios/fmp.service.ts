import fetch from 'node-fetch';

export async function fetchQuote(symbol: string) {
  const apiKey = process.env.FMP_KEY as string;
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`FMP ${res.status}`);
  const [data] = (await res.json()) as any[];
  if (!data) throw new Error('FMP payload empty');
  return { symbol, price: data.price, ts: new Date() };
}
