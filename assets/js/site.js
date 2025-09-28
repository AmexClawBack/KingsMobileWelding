document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('openMobile');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (menu.hasAttribute('hidden')) {
      menu.removeAttribute('hidden');
    } else {
      menu.setAttribute('hidden', '');
    }
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('hidden', '');
    });
  });
});
;/* KMW_TRAILING_SLASH_SERVICES */
(function(){
  try{
    var p = (location && location.pathname) || '';
    if (p === '/services') { location.replace('/services/'); }
  }catch(e){}
})();
