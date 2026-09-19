const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav nav');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('stalwart-theme');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('stalwart-theme', theme);
  setTheme(theme);
});

const brandIntro = document.querySelector('.brand-intro');
const finishBrandIntro = () => {
  window.setTimeout(() => {
    brandIntro.classList.add('is-complete');
    document.body.classList.remove('intro-pending');
  }, 2800);
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', finishBrandIntro, { once: true });
} else {
  finishBrandIntro();
}

const enquiryForm = document.querySelector('.enquiry-form');
const enquiryThankYou = document.querySelector('.enquiry-thank-you');
const cancelEnquiry = document.querySelector('.form-cancel');
cancelEnquiry?.addEventListener('click', () => {
  enquiryForm.reset();
  cancelEnquiry.blur();
});

enquiryForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    return;
  }

  const submitButton = enquiryForm.querySelector('button[type="submit"]');
  const originalLabel = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';

  try {
    await fetch(enquiryForm.dataset.googleSheetEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.fromEntries(new FormData(enquiryForm)))
    });
    enquiryForm.reset();
    enquiryForm.classList.add('is-showing-success');
    enquiryThankYou.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => {
      enquiryForm.classList.remove('is-showing-success');
      enquiryThankYou.setAttribute('aria-hidden', 'true');
    }, 5000);
  } catch {
    window.alert('We could not submit your enquiry. Please try again or contact us directly.');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});

const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => backToTop?.classList.toggle('is-visible', window.scrollY > 360);
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

const lhpProductCards = document.querySelectorAll('.lhp-product-card[data-lhp-product]');
lhpProductCards.forEach(card => card.addEventListener('click', () => {
  const panel = document.getElementById(`lhp-${card.dataset.lhpProduct}`);
  const willOpen = panel.hidden;
  lhpProductCards.forEach(item => item.setAttribute('aria-expanded', 'false'));
  document.querySelectorAll('.lhp-product-detail').forEach(item => { item.hidden = true; });
  if (willOpen) {
    panel.hidden = false;
    card.setAttribute('aria-expanded', 'true');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}));

const compactProductCards = document.querySelectorAll('.lhp-product-card[data-compact-product]');
compactProductCards.forEach(card => card.addEventListener('click', () => {
  const panel = document.getElementById(`compact-${card.dataset.compactProduct}`);
  const willOpen = panel.hidden;
  compactProductCards.forEach(item => item.setAttribute('aria-expanded', 'false'));
  document.querySelectorAll('.compact-range .lhp-product-detail').forEach(item => { item.hidden = true; });
  if (willOpen) {
    panel.hidden = false;
    card.setAttribute('aria-expanded', 'true');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}));

const finderForm = document.querySelector('.finder-form');
const finderThankYou = document.querySelector('.finder-thank-you');
finderForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!finderForm.checkValidity()) {
    finderForm.reportValidity();
    return;
  }

  const submitButton = finderForm.querySelector('button[type="submit"]');
  const originalLabel = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';

  try {
    await fetch(finderForm.dataset.googleSheetEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.fromEntries(new FormData(finderForm)))
    });
    finderForm.reset();
    finderForm.classList.add('is-showing-success');
    finderThankYou.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => {
      finderForm.classList.remove('is-showing-success');
      finderThankYou.setAttribute('aria-hidden', 'true');
    }, 2800);
  } catch {
    window.alert('We could not submit your request. Please try again or contact us directly.');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});
