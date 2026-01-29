import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  const distDir = path.resolve('dist');
  const pages: { title: string; url: string; content: string }[] = [];

  function walk(dir: string) {
    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file);

      if (fs.statSync(full).isDirectory()) {
        walk(full);
      }

      if (file === 'index.html') {
        const html = fs.readFileSync(full, 'utf-8');

        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'Без назви';

        const text = html
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .toLowerCase();

        const url = full
          .replace(distDir, '')
          .replace('index.html', '')
          .replace(/\\/g, '/');

        pages.push({ title, url, content: text });
      }
    }
  }

  walk(distDir);

  return new Response(JSON.stringify(pages), {
    headers: { 'Content-Type': 'application/json' },
  });
};
