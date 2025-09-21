document.addEventListener('DOMContentLoaded', () => {
  const q = document.querySelector('#blogSearch');
  const posts = Array.from(document.querySelectorAll('.post'));
  if (!q || !posts.length) return;

  q.addEventListener('input', () => {
    const s = q.value.toLowerCase().trim();
    posts.forEach(p => {
      const txt = p.textContent.toLowerCase();
      p.style.display = txt.includes(s) ? '' : 'none';
    });
  });
});
