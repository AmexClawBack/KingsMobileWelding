document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#homeContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    // If you add a real endpoint later, set form.action to it and remove this fallback.
    const hasEndpoint = form.action && !/YOUR_FORMSPREE_ID/i.test(form.action);
    if (hasEndpoint) return; // let the browser submit

    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString();
    const email = (fd.get('email') || '').toString();
    const phone = (fd.get('phone') || '').toString();
    const company = (fd.get('company') || '').toString();
    const message = (fd.get('message') || '').toString();

    const subject = encodeURIComponent('Website Contact  Kings Mobile Welding');
    const body = encodeURIComponent(
      Name: terms.html\nEmail: \nPhone: \nCompany: \n\nMessage:\n
    );

    // Update this email if needed:
    const mailto = mailto:DillonKing@kingsmobilewelding.com?subject=&body=;
    window.location.href = mailto;
  });
});
