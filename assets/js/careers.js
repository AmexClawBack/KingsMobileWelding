document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('rolesList');
  if (!box) return;
  fetch('assets/data/careers.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(roles => {
      roles.forEach(r => {
        const el = document.createElement('div');
        el.className = 'role';
        el.innerHTML = 
          <div class="meta"></div>
          <h4></h4>
          <p></p>
          <div class="apply"><a href="">Apply / Inquire →</a></div>
        ;
        box.appendChild(el);
      });
    })
    .catch(() => {});
});
