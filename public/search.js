document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (!input || !results) return;

  const pages = Array.from(document.querySelectorAll('a'))
    .map(a => ({
      title: a.textContent.trim(),
      url: a.href
    }))
    .filter(p => p.title.length > 3 && p.url.includes(location.origin));

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) return;

    const filtered = pages.filter(p =>
      p.title.toLowerCase().includes(q)
    );

    filtered.slice(0, 10).forEach(p => {
      const a = document.createElement('a');
      a.href = p.url;
      a.textContent = p.title;
      results.appendChild(a);
    });
  });
});
