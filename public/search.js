document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (!input || !results) return;

  // Збираємо всі посилання сайту
  const links = Array.from(document.querySelectorAll('a'))
    .map(a => ({
      title: a.textContent.trim(),
      url: a.href
    }))
    .filter(l => l.title.length > 3 && l.url.includes(location.origin));

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) return;

    const filtered = links.filter(l =>
      l.title.toLowerCase().includes(q)
    );

    filtered.slice(0, 10).forEach(l => {
      const a = document.createElement('a');
      a.href = l.url;
      a.textContent = l.title;
      a.style.display = 'block';
      a.style.padding = '6px';
      results.appendChild(a);
    });
  });
});
