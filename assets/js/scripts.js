// Mobile menu toggle
const mobBtn = document.getElementById('openMobile');
const mobileMenu = document.getElementById('mobileMenu');
if (mobBtn && mobileMenu) {
  mobBtn.addEventListener('click', () => {
    const hidden = mobileMenu.hasAttribute('hidden');
    if (hidden) mobileMenu.removeAttribute('hidden');
    else mobileMenu.setAttribute('hidden', '');
    mobBtn.setAttribute('aria-expanded', hidden.toString());
  });
  document.addEventListener('click', (e)=>{
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobBtn.contains(e.target)) {
      mobileMenu.setAttribute('hidden','');
      mobBtn.setAttribute('aria-expanded','false');
    }
  });
}

// Contact form mailto fallback
function handleFormSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const org = document.getElementById('org')?.value.trim() || '';
  const service = document.getElementById('service')?.value || '';
  const message = document.getElementById('message')?.value.trim() || '';
  const formMsg = document.getElementById('formMsg');
  if(!name || !email){ formMsg.textContent = 'Please complete required fields.'; return false; }
  const subject = encodeURIComponent('Website Inquiry');
  const body = encodeURIComponent(`Name: ${name}
Email: ${email}
Org: ${org}
Service: ${service}

${message}`);
  window.location.href = `mailto:info@kingsmobilewelding.com?subject=${subject}&body=${body}`;
  formMsg.textContent = 'Thanks — opening your mail app to finish sending.';
  return false;
}
