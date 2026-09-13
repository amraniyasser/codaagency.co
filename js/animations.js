/* Coda Agency — Global animation controller */

(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const markReady = () => {
    requestAnimationFrame(() => root.classList.add('is-ready'));
  };

  const applyStaggerIndexes = () => {
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.style.setProperty('--stagger-index', index);
      });
    });
  };

  const revealAll = () => {
    document.querySelectorAll('[data-reveal]').forEach((element) => {
      element.classList.add('is-visible');
    });
  };

  const initReveals = () => {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (!revealElements.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');

          if (!entry.target.hasAttribute('data-reveal-repeat')) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  const init = () => {
    applyStaggerIndexes();
    initReveals();
    markReady();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();