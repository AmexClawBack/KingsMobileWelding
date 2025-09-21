(function(){
  const root = document.querySelector('#testimonials');
  if(!root) return;
  const row = root.querySelector('.testi-row');
  const slides = Array.from(root.querySelectorAll('.testi-card'));
  const dotsWrap = root.querySelector('.testi-dots');
  const prev = root.querySelector('[data-test-prev]');
  const next = root.querySelector('[data-test-next]');
  let i = 0, timer = null;

  function go(n){
    i = (n + slides.length) % slides.length;
    row.style.transform = 	ranslateX(%);
    dotsWrap.querySelectorAll('.testi-dot').forEach((d,idx)=>d.classList.toggle('active', idx===i));
  }
  function auto(){ clearInterval(timer); timer = setInterval(()=>go(i+1), 5000); } // 5s per slide

  // dots
  if (dotsWrap && !dotsWrap.childElementCount) {
    slides.forEach((_,idx)=>{
      const d = document.createElement('span');
      d.className = 'testi-dot' + (idx===0 ? ' active':'');
      d.addEventListener('click', ()=>{ go(idx); auto(); });
      dotsWrap.appendChild(d);
    });
  }

  prev && prev.addEventListener('click', ()=>{ go(i-1); auto(); });
  next && next.addEventListener('click', ()=>{ go(i+1); auto(); });

  // init
  go(0); auto();
})();
