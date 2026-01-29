let pages = [];

async function loadIndex() {
  const res = await fetch('/searchIndex.json');
  pages = await res.json();
}

function createResultItem(page) {
  const a = document.createElement('a');
  a.href = page.url;
  a.style.display = 'block';
  a.style.padding = '8px 10px';
  a.style.borderBottom = '1px solid #eee';
  a.style.textDecoration = 'none';
  a.style.color = '#222';

  const title = document.createElement('div');
  title.textContent = page.title;
  title.style.fontWeight = '600';

   a.appendChild(title);

  return a;
}

function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  const box = document.createElement('div');
  box.style.position = 'absolute';
  box.style.top = '100%';
  box.style.left = '0';
  box.style.right = '0';
  box.style.background = '#fff';
  box.style.border = '1px solid #ddd';
  box.style.maxHeight = '300px';
  box.style.overflowY = 'auto';
  box.style.zIndex = '9999';
  box.style.display = 'none';

  input.parentElement.style.position = 'relative';
  input.parentElement.appendChild(box);

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    box.innerHTML = '';

    if (!q) {
      box.style.display = 'none';
      return;
    }

    const results = pages.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.content.includes(q)
    ).slice(0, 20);

    results.forEach(p => {
      box.appendChild(createResultItem(p));
    });

    box.style.display = results.length ? 'block' : 'none';
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target)) {
      box.style.display = 'none';
    }
  });
}

loadIndex().then(initSearch);

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('open-search');
  const searchBox = document.getElementById('search-box');
  const input = document.getElementById('search-input');

  if (!btn || !searchBox || !input) return;

  btn.addEventListener('click', () => {
    const isHidden = searchBox.style.display === 'none' || !searchBox.style.display;
    searchBox.style.display = isHidden ? 'block' : 'none';
    input.focus();
  });

  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && !btn.contains(e.target)) {
      searchBox.style.display = 'none';
    }
  });
});

