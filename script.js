(() => {
  const hero = document.getElementById('approved-hero');
  if (!hero || !window.__codaHero) return;

  hero.src = `data:image/webp;base64,${window.__codaHero}`;
  hero.addEventListener('load', () => {
    window.__codaHero = '';
    document.documentElement.classList.add('hero-ready');
  }, { once: true });
})();
