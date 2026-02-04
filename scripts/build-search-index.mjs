import fs from 'fs';
import path from 'path';

const distDir = './dist';
const pages = [];

function detectSection(url) {
  if (url.startsWith('/blog')) return 'Новини';
  if (url.startsWith('/video')) return 'Відео';
  if (url.startsWith('/about')) return 'Про нас';
  if (url.startsWith('/projects')) return 'Проєкти';
  if (url.startsWith('/rozklad-seminariv')) return 'Семінари';
  return 'Сторінка';
}

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
    }

    if (file === 'index.html') {
      const html = fs.readFileSync(full, 'utf-8');

      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      if (!titleMatch) return;

      const title = titleMatch[1]
        .replace(/\s*\|\s*.*$/, '')
        .trim();

      const text = html
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .toLowerCase();

      const url = full
  .split('dist')[1]
  .replace(/index.html$/, '')
  .replace(/\\/g, '/');

      pages.push({
        title,
        url,
        content: text,
        section: detectSection(url)
      });
    }
  }
}

walk(distDir);

fs.writeFileSync(
  './dist/searchIndex.json',
  JSON.stringify(pages, null, 2)
);

console.log('Search index built:', pages.length);
