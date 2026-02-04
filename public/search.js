console.log('SEARCH JS WORKS');

let pages = [];

async function loadIndex() {
  const res = await fetch('/searchIndex.json');
  pages = await res.json();
}

function attachSearch() {
  const input = document.getElementById('search-input');
  const box = document.getElementById('search-results');
  const searchBox = document.getElementById('search-box');

  if (!input || !box || input.dataset.searchAttached) return;
  input.dataset.searchAttached = 'true';

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    box.innerHTML = '';

    if (!q) {
      box.style.display = 'none';
      return;
    }

    const results = pages
      .filter(p =>
        p.title && (
          p.title.toLowerCase().includes(q) ||
          p.content.includes(q)
        )
      )
      .slice(0, 20);

    results.forEach(p => {
      const a = document.createElement('a');
      a.href = p.url;
      a.textContent = p.title;
      a.className = 'search-result-item';
      box.appendChild(a);
    });

    box.style.display = results.length ? 'block' : 'none';
  });

  // Закриття ВСЬОГО пошуку по кліку збоку
  document.addEventListener('click', e => {
    if (!searchBox.contains(e.target)) {
      searchBox.style.display = 'none';
      box.style.display = 'none';
      input.value = '';
    }
  });
}

function attachOpenButton() {
  const btn = document.getElementById('open-search');
  const searchBox = document.getElementById('search-box');
  const input = document.getElementById('search-input');

  if (!btn || !searchBox || !input || btn.dataset.searchAttached) return;
  btn.dataset.searchAttached = 'true';

  btn.addEventListener('click', e => {
    e.stopPropagation();
    searchBox.style.display = 'block';
    setTimeout(() => input.focus(), 50);
  });
}

function setup() {
  attachSearch();
  attachOpenButton();
}

document.addEventListener('astro:page-load', setup);
document.addEventListener('DOMContentLoaded', setup);

loadIndex();
