
// Helper: respect prefers-reduced-motion for smooth scroll
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme handling with localStorage
(function themeInit() {
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const el = document.documentElement;
  const next = el.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  el.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.querySelector('.theme-icon').textContent = next === 'dark' ? '🌙' : '🌞';
}

document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle?.addEventListener('click', () => {
  const open = siteNav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(!!open));
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav__link').forEach(a => {
  a.addEventListener('click', () => {
    if (siteNav?.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Smooth scroll for in-page links
function smoothScrollTo(target) {
  const el = document.querySelector(target);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
      history.pushState(null, '', href);
    }
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple form validation + pretend submit
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let valid = true;
    // Clear errors
    ['nameError','emailError','messageError'].forEach(id => document.getElementById(id).textContent = '');

    if (!name.value || name.value.trim().length < 2) {
      document.getElementById('nameError').textContent = 'Please enter at least 2 characters.';
      valid = false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      valid = false;
    }
    if (!message.value || message.value.trim().length < 10) {
      document.getElementById('messageError').textContent = 'Message should be at least 10 characters.';
      valid = false;
    }

    if (!valid) return;

    const status = document.getElementById('formStatus');
    status.textContent = 'Sending…';

    // Simulate async submission
    setTimeout(() => {
      status.textContent = 'Thanks! Your message has been sent (demo).';
      form.reset();
    }, 1000);
  });
}

(function(n,u){
    window.CXoneDfo=n,
    window[n]=window[n]||function(){(window[n].q=window[n].q||[]).push(arguments)},window[n].u=u,
    e=document.createElement("script"),e.type="module",e.src=u+"?"+Math.round(Date.now()/1e3/3600),
    document.head.appendChild(e)
})('cxone','https://web-modules-de-na1.niceincontact.com/loader/1/loader.js');

cxone('init', '5066');
cxone('guide','init');
