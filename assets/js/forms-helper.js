document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[action="https://formspree.io/f/mwprebdr"]').forEach(f => {
    // ensure method + charset
    if (!f.getAttribute('method')) f.setAttribute('method','POST');
    if (!f.getAttribute('accept-charset')) f.setAttribute('accept-charset','UTF-8');
    // ensure submit button actually submits
    const submitBtn = f.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitBtn) {
      const b = document.createElement('button');
      b.type = 'submit';
      b.className = 'kmw-submit';
      b.textContent = 'Send Message';
      f.appendChild(b);
    }
  });
});
