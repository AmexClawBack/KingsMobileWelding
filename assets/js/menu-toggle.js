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

  // Close when clicking any link in the mobile menu
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) toggle(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });

  // Reset state when switching to desktop width
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', () => toggle(false));
});
