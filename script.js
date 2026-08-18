const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const languageButton = document.querySelector('.language');
let language = localStorage.getItem('portfolio-language') || 'es';

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-es][data-en]').forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageButton.textContent = language === 'es' ? 'EN' : 'ES';
  languageButton.setAttribute('aria-label', language === 'es' ? 'Change language to English' : 'Cambiar idioma a español');
  document.title = language === 'es' ? 'Francisco Ramos — Ingeniero en Informática' : 'Francisco Ramos — Computer Engineer';
  localStorage.setItem('portfolio-language', language);
}

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

languageButton.addEventListener('click', () => setLanguage(language === 'es' ? 'en' : 'es'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();
setLanguage(language);
