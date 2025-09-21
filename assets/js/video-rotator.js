// Background video rotator — 3s per clip, smooth crossfade, strict round-robin
(function () {
  // === Easy knobs ===
  const ROTATION_MS = 3000; // how long each clip is visible
  const FADE_MS = 600;      // crossfade duration (must match CSS transition)
  const FILES = [
    "clip1.mp4","clip2.mp4","clip3.mp4","clip4.mp4","clip5.mp4",
    "clip6.mp4","clip7.mp4","clip8.mp4","clip9.mp4","clip10.mp4"
  ];

  const container = document.getElementById('heroVideos');
  if (!container || !FILES.length) return;

  function createVideoEl(){
    const v = document.createElement('video');
    v.setAttribute('playsinline','');
    v.setAttribute('muted',''); v.muted = true;
    v.setAttribute('autoplay','');
    v.setAttribute('preload','auto'); // buffer ahead for smooth fades
    v.setAttribute('aria-hidden','true');
    v.className = ''; // will toggle .active for fade-in
    const s = document.createElement('source');
    s.type = 'video/mp4';
    v.appendChild(s);
    return v;
  }

  const a = createVideoEl();
  const b = createVideoEl();
  container.appendChild(a);
  container.appendChild(b);

  let active = a, idle = b;
  let index = 0;
  let tPre = null, tSwap = null;

  function setSource(video, filename){
    const src = video.querySelector('source');
    src.src = 'assets/video/' + filename;
    video.load();
    video.currentTime = 0;
  }

  function clearTimers(){
    if (tPre){ clearTimeout(tPre); tPre = null; }
    if (tSwap){ clearTimeout(tSwap); tSwap = null; }
  }

  function scheduleNext(){
    clearTimers();
    // Pre-play the idle video slightly before the swap so it's already moving when faded in
    tPre = setTimeout(() => {
      // Safari/iOS can delay canplay; if not ready, wait for event then play
      const ensurePlay = () => { idle.play().catch(()=>{}); };
      if (idle.readyState >= 2) ensurePlay();
      else idle.addEventListener('canplay', ensurePlay, { once: true });
    }, Math.max(0, ROTATION_MS - FADE_MS - 50)); // pre-start just before fade

    tSwap = setTimeout(() => {
      // Fade: active -> out, idle -> in
      active.classList.remove('active');
      idle.classList.add('active');

      // After fade completes, pause old active and prep its next source
      setTimeout(() => {
        try { active.pause(); } catch {}
        // swap refs
        const tmp = active; active = idle; idle = tmp;

        // Prepare the next filename in strict round-robin
        index = (index + 1) % FILES.length;
        const nextName = FILES[index];
        setSource(idle, nextName);
      }, FADE_MS);

      // Queue next cycle
      scheduleNext();
    }, ROTATION_MS);
  }

  // ==== Boot ====
  // Prime first two clips: show FILES[0], prepare FILES[1]
  setSource(active, FILES[0]);
  setSource(idle, FILES[1 % FILES.length]);

  // Show first when ready
  const startActive = () => {
    active.classList.add('active');
    active.play().catch(()=>{});
    scheduleNext();
  };
  if (active.readyState >= 2) startActive();
  else active.addEventListener('canplay', startActive, { once: true });
})();
