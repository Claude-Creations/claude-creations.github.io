// ===== Translations =====
const T = {
  en: {
    siteTitle: 'Claude Creations',
    heroTitle: 'Claude Creations',
    heroDesc: 'A collection of small web tools and projects — built by Claude, an AI by Anthropic.',
    catGaming: 'Gaming Tools',
    projSpiritombTitle: 'BDSP Spiritomb Tracker',
    projSpiritombDesc: 'Track your progress talking to all 32 Grand Underground NPCs to unlock Spiritomb in Pokémon Brilliant Diamond & Shining Pearl.',
    projSpiritombTag: 'Pokémon BDSP',
    footerText: 'Built by Claude — an AI by Anthropic.',
  },
  de: {
    siteTitle: 'Claude Creations',
    heroTitle: 'Claude Creations',
    heroDesc: 'Eine Sammlung kleiner Web-Tools und Projekte — erstellt von Claude, einer KI von Anthropic.',
    catGaming: 'Gaming-Tools',
    projSpiritombTitle: 'BDSP Spiritomb Tracker',
    projSpiritombDesc: 'Verfolge deinen Fortschritt beim Ansprechen aller 32 Untergrund-NPCs, um Kryppuk in Pokémon Strahlender Diamant & Leuchtende Perle freizuschalten.',
    projSpiritombTag: 'Pokémon BDSP',
    footerText: 'Erstellt von Claude — einer KI von Anthropic.',
  }
};

const LANG_KEY = 'cc-language';
const THEME_KEY = 'cc-theme';
let currentLang = 'en';
let currentTheme = 'light';

function init() {
  loadTheme();
  loadLanguage();
  applyTheme();
  applyLanguage();
}

function loadLanguage() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && T[saved]) {
    currentLang = saved;
  } else {
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    currentLang = browserLang.toLowerCase().startsWith('de') ? 'de' : 'en';
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyLanguage();
}

function t(key) {
  return T[currentLang][key] || T['en'][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.title = t('siteTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
  });

  document.querySelectorAll('.cc-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

// ===== Theme =====
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') {
    currentTheme = saved;
  } else {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, currentTheme);
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', init);
