document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('openMobile');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  function toggle(open) {
    const willOpen = (open !== undefined) ? open : !btn.classList.contains('open');
    btn.classList.toggle('open', willOpen);
    menu.hidden = !willOpen;
    btn.setAttribute('aria-expanded', String(willOpen));
  }
  btn.addEventListener('click', () => toggle());
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) toggle(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', () => toggle(false));
});
