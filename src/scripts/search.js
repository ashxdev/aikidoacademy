const searchIndex = window.__SEARCH_INDEX__;

const btn = document.getElementById('open-search');
const box = document.getElementById('search-box');
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');

if (btn && box && input && results) {
  btn.addEventListener('click', () => {
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
    input.focus();
  });

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) return;

    const filtered = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.content.includes(q)
    );

    filtered.slice(0, 10).forEach(item => {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      results.appendChild(a);
    });
  });

  document.addEventListener('click', (e) => {
    if (!box.contains(e.target) && !btn.contains(e.target)) {
      box.style.display = 'none';
    }
  });
}
