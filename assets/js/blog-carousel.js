// Build a button-controlled blog carousel from assets/data/blog.json
document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('blogCarousel');
  if (!host) return;

  const controls = document.createElement('div');
  controls.className = 'blog-controls';
  const prev = document.createElement('button'); prev.className='blog-btn'; prev.type='button'; prev.textContent='‹';
  const next = document.createElement('button'); next.className='blog-btn'; next.type='button'; next.textContent='›';
  controls.appendChild(prev); controls.appendChild(next);

  const wrap = document.createElement('div');
  wrap.className = 'blog-carousel';
  const track = document.createElement('div');
  track.className = 'blog-track';
  wrap.appendChild(track);

  host.appendChild(controls);
  host.appendChild(wrap);

  fetch('assets/data/blog.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(posts => {
      posts.forEach(p => {
        const slide = document.createElement('article');
        slide.className = 'blog-slide';
        slide.innerHTML = 
          <img src="assets/img/blog/" alt="">
          <div class="body">
            <div class="meta"></div>
            <h3></h3>
            <p></p>
          </div>
        ;
        track.appendChild(slide);
      });

      let index = 0;
      const slideEl = track.querySelector('.blog-slide');
      const step = slideEl ? (slideEl.getBoundingClientRect().width + 16) : 320; // width + gap
      function update() { track.style.transform = 	ranslateX(px); }
      prev.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
      next.addEventListener('click', () => { index = Math.min(posts.length - 1, index + 1); update(); });
    })
    .catch(() => {});
});
