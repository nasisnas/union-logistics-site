// ── Theme Switcher ───────────────────────────────────────────
const THEMES = ['dark', 'minimal', 'geo', 'luxury', 'sbg', 'dhl', 'express'];
const THEME_LABELS = { dark: 'Dark Navy', minimal: 'Minimal', geo: 'Geometric', luxury: 'Luxury', sbg: 'SBG', dhl: 'DHL', express: 'Express' };
const THEME_DOTS   = { dark: 'theme-dot-dark', minimal: 'theme-dot-minimal', geo: 'theme-dot-geo', luxury: 'theme-dot-luxury', sbg: 'theme-dot-sbg', dhl: 'theme-dot-dhl', express: 'theme-dot-express' };

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('ul-theme', theme);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function buildThemeBar() {
  const bar = document.createElement('div');
  bar.className = 'theme-bar';
  bar.innerHTML = '<span class="theme-bar-label">Theme</span>' +
    THEMES.map(t => `
      <button class="theme-btn" data-theme="${t}" aria-label="${THEME_LABELS[t]}">
        <span class="theme-dot ${THEME_DOTS[t]}"></span>${THEME_LABELS[t]}
      </button>`).join('');
  document.body.prepend(bar);
  bar.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
}

buildThemeBar();
const savedTheme = localStorage.getItem('ul-theme') || 'express';
applyTheme(savedTheme);

// ── Navbar scroll effect ─────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile menu ──────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Animated stat counters ───────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounter(entry.target); statObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el));

// ── Active nav link ──────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Globe Sun/Moon ───────────────────────────────────────────
function initGlobeCelestial() {
  document.querySelectorAll('.logo-globe').forEach(globe => {
    if (globe.querySelector('.globe-celestial')) return;
    const el = document.createElement('div');
    el.className = 'globe-celestial';
    globe.appendChild(el);
  });
  updateCelestial();
  setInterval(updateCelestial, 60000);
}

function updateCelestial() {
  const now = new Date();
  // Use viewer's local hour; JS Date always gives local time
  const hour = now.getHours() + now.getMinutes() / 60;
  const isDay = hour >= 6 && hour < 19;

  document.querySelectorAll('.globe-celestial').forEach(el => {
    // Map hour to angle (0h = bottom, 12h = top, full circle = 24h)
    const angle = ((hour / 24) * 360 - 90) * (Math.PI / 180);
    const radius = 26; // orbit radius in px
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    el.style.transform = `translate(${x}px, ${y}px)`;
    el.className = isDay
      ? 'globe-celestial globe-sun'
      : 'globe-celestial globe-moon';
  });
}

initGlobeCelestial();
