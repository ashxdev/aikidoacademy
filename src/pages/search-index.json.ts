import { buildSearchIndex } from '../data/buildSearchIndex';

export async function GET() {
  const data = await buildSearchIndex();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
