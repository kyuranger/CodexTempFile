// Presentation only: no query, no value changes, no motion-only scroll space.
const chapter = document.querySelector('.reading');
const facts = chapter?.querySelector('.reading__facts');
const motion = window.matchMedia('(min-width: 701px) and (prefers-reduced-motion: no-preference)');

if (chapter && facts) {
  let inView = false;
  let pending = 0;

  function update() {
    pending = 0;
    if (!motion.matches) {
      chapter.removeAttribute('data-attention');
      return;
    }
    const bounds = chapter.getBoundingClientRect();
    const factsTop = facts.getBoundingClientRect().top;
    const next = bounds.bottom <= window.innerHeight + 16
      ? 'complete'
      : factsTop <= window.innerHeight * 0.8 ? 'facts' : 'identity';
    if (chapter.dataset.attention !== next) chapter.dataset.attention = next;
  }

  function schedule() {
    if (pending || (!inView && motion.matches)) return;
    pending = requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) schedule();
  });
  observer.observe(chapter);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  motion.addEventListener('change', update);
}
