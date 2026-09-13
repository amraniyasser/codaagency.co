const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const showcase = document.querySelector('.showcase');
const menuButton = document.querySelector('.menu-toggle');

if (showcase && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('pointermove', (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 5;
    targetY = (event.clientY / window.innerHeight - 0.5) * 5;
  }, { passive: true });

  const animate = () => {
    currentX += (targetX - currentX) * 0.035;
    currentY += (targetY - currentY) * 0.035;
    showcase.style.translate = `${currentX}px ${currentY}px`;
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });
}
