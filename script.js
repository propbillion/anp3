/* ═══════════════════════════════════════════
   ANP PRIVADO — script.js
   ═══════════════════════════════════════════ */

// Mark JS as active (enables reveal animations)
document.body.classList.add('js-on');

/* ── STICKY NAV ── */
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

function updateNav() {
  const heroH = hero ? hero.offsetHeight : 600;
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 80);
  nav.classList.toggle('hero-mode', y < heroH - 120);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ── MOBILE HAMBURGER ── */
const hamburger = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(250,247,242,.96)';
    navLinks.style.backdropFilter = 'blur(20px)';
    navLinks.style.padding = '1.5rem 2rem';
    navLinks.style.borderBottom = '1px solid rgba(10,10,10,.08)';
    navLinks.style.gap = '1.25rem';
  });
}

/* ── FLOAT WA: SHOW AFTER HERO ── */
const floatWA = document.getElementById('floatWA');
if (floatWA && hero) {
  function checkFloat() {
    const past = window.scrollY > hero.offsetHeight * 0.5;
    floatWA.style.opacity = past ? '1' : '0';
    floatWA.style.pointerEvents = past ? 'all' : 'none';
    floatWA.style.transform = past ? 'scale(1)' : 'scale(0.7)';
    floatWA.style.transition = 'opacity .4s, transform .4s';
  }
  window.addEventListener('scroll', checkFloat, { passive: true });
  checkFloat();
}

/* ── MOBILE CTA BAR: HIDE WHEN HERO VISIBLE ── */
const mobileBar = document.getElementById('mobileCTABar');
if (mobileBar && hero) {
  function checkMobileBar() {
    const past = window.scrollY > hero.offsetHeight * 0.6;
    mobileBar.style.transform = past ? 'translateY(0)' : 'translateY(100%)';
    mobileBar.style.transition = 'transform .4s cubic-bezier(0.65, 0, 0.35, 1)';
  }
  window.addEventListener('scroll', checkMobileBar, { passive: true });
  checkMobileBar();
}

/* ── TOP BAR: CLOSE BUTTON (optional UX) ── */
// If you want to allow users to dismiss the top bar:
// const topBar = document.getElementById('topBar');
// ...
