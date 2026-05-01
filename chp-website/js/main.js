// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => { navLinks.classList.toggle('open'); });
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── HERO MOUSE SPOTLIGHT ──
const spotlight = document.getElementById('heroSpotlight');
const heroSection = document.getElementById('hero');
if (heroSection && spotlight) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    spotlight.style.background = `radial-gradient(circle 700px at ${x}% ${y}%, rgba(201,169,110,0.09) 0%, transparent 65%)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    spotlight.style.background = 'radial-gradient(circle 600px at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)';
  });
}

// ── FADE UP ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ──
const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0; const inc = target / 60;
      const t = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(t); }
        el.textContent = Math.floor(current) + suffix;
      }, 25);
    });
    statsObserver.disconnect();
  }
}, { threshold: 0.3 });
if (statsSection) statsObserver.observe(statsSection);

// ── INQUIRY MODAL ──
const modal = document.getElementById('inquiryModal');
document.querySelectorAll('[data-modal="inquiry"]').forEach(btn => {
  btn.addEventListener('click', () => { modal?.classList.add('open'); document.body.style.overflow = 'hidden'; });
});
document.getElementById('closeModal')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
function closeModal() { modal?.classList.remove('open'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); } });

// ── INQUIRY FORM ──
document.getElementById('inquiryForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  btn.textContent = 'Sending...'; btn.disabled = true;
  const data = Object.fromEntries(new FormData(e.target).entries());
  const msgs = JSON.parse(localStorage.getItem('chp_messages') || '[]');
  msgs.unshift({ ...data, id: Date.now(), status: 'new', time: new Date().toISOString() });
  localStorage.setItem('chp_messages', JSON.stringify(msgs));
  await new Promise(r => setTimeout(r, 900));
  e.target.style.display = 'none';
  document.getElementById('successMsg').style.display = 'block';
  setTimeout(() => {
    closeModal();
    e.target.style.display = ''; document.getElementById('successMsg').style.display = 'none';
    e.target.reset(); btn.textContent = 'Send Inquiry →'; btn.disabled = false;
  }, 3000);
});

// ── CONTACT FORM ──
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sending...'; btn.disabled = true;
  const data = Object.fromEntries(new FormData(e.target).entries());
  const msgs = JSON.parse(localStorage.getItem('chp_messages') || '[]');
  msgs.unshift({ ...data, id: Date.now(), status: 'new', time: new Date().toISOString() });
  localStorage.setItem('chp_messages', JSON.stringify(msgs));
  await new Promise(r => setTimeout(r, 900));
  btn.textContent = '✓ Sent'; btn.style.background = '#4caf50';
  setTimeout(() => { e.target.reset(); btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
});

// ── FILE UPLOAD LABEL ──
document.querySelectorAll('input[type="file"]').forEach(input => {
  input.addEventListener('change', () => {
    const sp = input.closest('.form-group')?.querySelector('.file-upload span');
    if (sp && input.files[0]) sp.textContent = input.files[0].name;
  });
});
