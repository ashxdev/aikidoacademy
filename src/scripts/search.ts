document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/search-index.json');
  const searchIndex = await res.json();

  const input = document.getElementById('search-input') as HTMLInputElement | null;
  const results = document.getElementById('search-results');

  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) return;

    const filtered = searchIndex.filter((item: any) =>
      item.title.toLowerCase().includes(q) ||
      item.content.includes(q)
    );

    filtered.slice(0, 10).forEach((item: any) => {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      results.appendChild(a);
    });
  });
});
