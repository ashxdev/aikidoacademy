document.addEventListener('DOMContentLoaded', async function () {

  const res = await fetch('/search-index.json');
  const searchIndex = await res.json();

  const btn = document.getElementById('open-search');
  const box = document.getElementById('search-box');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (!btn || !box || !input || !results) return;

  btn.addEventListener('click', function () {
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
    input.focus();
  });

  input.addEventListener('input', function () {
    const q = input.value.toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) return;

    const filtered = searchIndex.filter(function(item) {
      return item.title.toLowerCase().includes(q) ||
             item.content.includes(q);
    });

    filtered.slice(0, 10).forEach(function(item) {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      results.appendChild(a);
    });
  });

});
