document.addEventListener('click', function (e) {
  const btn = e.target.closest('.kmw-submit, .submit, .send, .quote, button, input[type="submit"], a');
  if (!btn) return;

  // Only act on things that look like submit buttons
  const text = (btn.textContent || '').toLowerCase();
  const looksSubmit = btn.matches('.kmw-submit, .submit, .send, .quote')
                   || btn.matches('button[type="submit"], input[type="submit"]')
                   || /send|submit|request|quote/.test(text);

  if (!looksSubmit) return;

  // If it's an <a>, prevent navigation; we'll submit instead
  if (btn.tagName === 'A') e.preventDefault();

  // Find closest form; if none, try common contact selectors
  let form = btn.closest('form') ||
             document.querySelector('section[id*="contact"] form') ||
             document.querySelector('form');

  if (!form) return;

  // Ensure action/method for Formspree if missing
  if (!form.getAttribute('action')) form.setAttribute('action', 'https://formspree.io/f/mwprebdr');
  if (!form.getAttribute('method')) form.setAttribute('method', 'POST');
  if (!form.getAttribute('accept-charset')) form.setAttribute('accept-charset', 'UTF-8');

  // Submit!
  try { form.requestSubmit ? form.requestSubmit() : form.submit(); }
  catch (err) { form.submit(); }
});
