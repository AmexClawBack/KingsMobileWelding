(async function () {
  const grid = document.getElementById('docGrid');
  const empty = document.getElementById('docEmpty');
  const search = document.getElementById('docSearch');
  const filter = document.getElementById('docFilter');

  let docs = [];
  try {
    const res = await fetch('/assets/docs/docs.json', { cache: 'no-store' });
    docs = await res.json();
  } catch (e) {
    console.error('Failed to load docs.json', e);
  }

  async function withSize(doc) {
    try {
      const head = await fetch(`/assets/docs/${doc.filename}`, { method: 'HEAD' });
      const len = head.headers.get('content-length');
      if (len) doc.size = humanFileSize(parseInt(len, 10));
    } catch {}
    return doc;
  }

  function humanFileSize(bytes) {
    if (!bytes && bytes !== 0) return '';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ['B','KB','MB','GB','TB'];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }

  Promise.all(docs.map(withSize)).then(render);

  function matches(doc, q, cat) {
    const hay = `${doc.title} ${doc.description} ${doc.category}`.toLowerCase();
    const okQ = !q || hay.includes(q.toLowerCase());
    const okC = !cat || doc.category === cat;
    return okQ && okC;
  }

  function render() {
    const q = (search?.value || '').trim();
    const cat = filter?.value || '';

    const visible = docs.filter(d => matches(d, q, cat));
    grid.innerHTML = '';
    visible.forEach(d => {
      const card = document.createElement('article');
      card.className = 'card';
      const action = (d.restricted)
        ? `<a class="btn-secondary" href=\"mailto:info@kingsmobilewelding.com?subject=W-9%20Request&body=Hello%2C%20I%20would%20like%20to%20request%20a%20copy%20of%20your%20W-9%20for%20vendor%20onboarding.%0A%0AOrganization%3A%20%0APO/Ref%3A%20%0AContact%3A%20\">Request W-9</a>`
        : (d.filename ? `${action}` : '');
      card.innerHTML = `
        <h3>${d.title}</h3>
        <p class="small muted">${d.description || ''}</p>
        <ul class="small muted" style="list-style:none;padding:0;margin:8px 0">
          <li><strong>Category:</strong> ${d.category}</li>
          <li><strong>Updated:</strong> ${d.updated || ''}</li>
          ${d.size ? `<li><strong>Size:</strong> ${d.size}</li>` : ''}
        </ul>
        ${action}
      `;
      grid.appendChild(card);
    });

    empty.style.display = visible.length ? 'none' : 'block';
  }

  search?.addEventListener('input', render);
  filter?.addEventListener('change', render);
})();