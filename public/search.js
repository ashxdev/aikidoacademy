document.addEventListener('DOMContentLoaded', async function () {

  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (!input || !results) return;

  // беремо всі посилання сайту
  const links = Array.from(document.querySelectorAll('a'))
    .map(a => ({
      title: a.textContent.trim(),
      url: a.href
    }))
    .filter(l =>
      l.title.length > 3 &&
      l.url.startsWith(location.origin) &&
      !l.url.includes('#')
    );

  input.addEventListener('input', function () {
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
      a.style.padding = '6px 0';
      results.appendChild(a);
    });
  });

});
