document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#areasSearch');
  const cards = Array.from(document.querySelectorAll('.area-card'));
  if (!input || !cards.length) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    cards.forEach(c => {
      const txt = c.textContent.toLowerCase();
      c.style.display = txt.includes(q) ? '' : 'none';
    });
  });
});
