document.addEventListener('click', function (e) {
  const btn = e.target.closest('.kmw-submit, .submit, .send, .quote, button, input[type=""submit""], a');
  if (!btn) return;

  // Only act on obvious "submit-like" controls
  const text = (btn.textContent || '').toLowerCase();
  const looks = btn.matches('.kmw-submit, .submit, .send, .quote')
             || btn.matches('button[type=""submit""], input[type=""submit""]')
             || /send|submit|request|quote/.test(text);
  if (!looks) return;

  // Prefer a form inside the home contact section
  let form = btn.closest('form')
           || document.querySelector('section[id*=""contact""] form')
           || document.querySelector('form');
  if (!form) return;

  // Prevent anchors from navigating elsewhere
  if (btn.tagName === 'A') e.preventDefault();

  // Ensure Formspree attributes exist
  if (!form.getAttribute('action')) form.setAttribute('action', 'https://formspree.io/f/mwprebdr');
  if (!form.getAttribute('method')) form.setAttribute('method', 'POST');
  if (!form.getAttribute('accept-charset')) form.setAttribute('accept-charset', 'UTF-8');

  try { form.requestSubmit ? form.requestSubmit() : form.submit(); }
  catch (_err) { form.submit(); }
});
