// ── LANGUAGE SWITCHER ──
let currentLang = localStorage.getItem('chp_lang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('chp_lang', lang);
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else if (el.dataset.i18nHtml) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update lang switcher button highlight
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang;
}

function initLangSwitcher() {
  // Build the switcher UI
  const switcher = document.getElementById('langSwitcher');
  if (!switcher) return;
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' },
    { code: 'vi', label: 'Tiếng Việt' },
  ];
  switcher.innerHTML = langs.map(l => `
    <button class="lang-btn${l.code === currentLang ? ' active' : ''}" 
            data-lang="${l.code}" 
            onclick="applyLanguage('${l.code}')"
            title="${l.label}">
      ${l.label}
    </button>
  `).join('');
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  initLangSwitcher();
  applyLanguage(currentLang);
});
