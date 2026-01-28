console.log('SEARCH JS WORKS');
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');

if (input && results) {
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) return;

    const allText = document.body.innerText.toLowerCase();

    if (allText.includes(q)) {
      const a = document.createElement('a');
      a.href = '/';
      a.textContent = 'Знайдено на цій сторінці — перейти';
      a.style.display = 'block';
      a.style.padding = '6px';
      results.appendChild(a);
    }
  });
}
