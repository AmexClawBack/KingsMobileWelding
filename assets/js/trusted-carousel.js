// Build a looping "Trusted By" logo carousel from assets/img/trusted/manifest.json
document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('trustedCarousel');
  if (!host) return;

  fetch('assets/img/trusted/manifest.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(files => {
      const container = document.createElement('div');
      container.className = 'logo-carousel';

      const track1 = document.createElement('div'); track1.className = 'logo-track';
      const track2 = document.createElement('div'); track2.className = 'logo-track';

      const makeItems = () => files.map(name => {
        const item = document.createElement('div');
        item.className = 'logo-item';
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = 'Client logo';
        img.src = 'assets/img/trusted/' + name;
        item.appendChild(img);
        return item;
      });

      makeItems().forEach(el => track1.appendChild(el));
      makeItems().forEach(el => track2.appendChild(el));

      const wrap = document.createElement('div');
      wrap.style.display = 'flex';
      wrap.style.width = '200%';
      wrap.appendChild(track1);
      wrap.appendChild(track2);

      container.appendChild(wrap);
      host.appendChild(container);
    })
    .catch(() => {});
});
