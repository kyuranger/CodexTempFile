// A8-C P02: C3's accepted window is unchanged; C4 uses scan / open / read.
const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
const stories = [
  { root: document.querySelector('.carriers'), anchor: '.carriers__media', property: '--carrier-progress', attribute: 'data-carrier-stage' },
  { root: document.querySelector('.reading'), anchor: '.reading__media', property: '--reading-progress', attribute: 'data-reading-stage' }
].filter(story => story.root);
const visible = new Set();
let pending = 0;

function update() {
  pending = 0;
  if (!motion.matches) return;
  const height = window.innerHeight;
  const compact = window.innerWidth <= 960;
  // Read stable, untransformed anchors together, then write presentation state.
  const samples = stories.map(story => {
    const anchor = story.root.querySelector(story.anchor);
    let top = anchor.getBoundingClientRect().top;
    let distance;
    let travelled;
    if (story.attribute === 'data-carrier-stage') {
      const sectionTop = story.root.getBoundingClientRect().top;
      // Both the chapter and its media must be visibly entered before advancing.
      travelled = Math.min(height * 0.2 - sectionTop, height * 0.36 - top);
      distance = height * 0.28;
    } else {
      const section = story.root.getBoundingClientRect();
      // Desktop opens during the last 30vh of native chapter entry.
      // Mobile targets the visible scan media and then yields to normal reading.
      travelled = compact ? height * 0.72 - top : height * 0.3 - section.top;
      distance = compact ? anchor.offsetHeight + height * 0.12 : height * 0.3;
    }
    return { story, progress: Math.max(0, Math.min(1, travelled / distance)) };
  });
  for (const { story, progress } of samples) {
    const state = story.attribute === 'data-carrier-stage'
      ? progress >= 0.98 ? 'complete' : progress < 0.36 ? 'process' : progress < 0.7 ? 'carrier' : 'reading'
      : progress >= 0.98 ? 'read' : progress < 0.18 ? 'scan' : 'open';
    story.root.style.setProperty(story.property, progress.toFixed(4));
    if (story.attribute === 'data-reading-stage') {
      const opening = Math.max(0, Math.min(1, (progress - 0.18) / 0.52));
      const eased = opening * opening * (3 - 2 * opening);
      story.root.style.setProperty('--reading-open', eased.toFixed(4));
      story.root.style.setProperty('--reading-ink', Math.max(0, Math.min(1, (progress - 0.42) / 0.24)).toFixed(4));
      story.root.style.setProperty('--reading-target', Math.max(0, Math.min(1, progress / 0.12, (0.6 - progress) / 0.3)).toFixed(4));
    }
    if (story.root.getAttribute(story.attribute) !== state) story.root.setAttribute(story.attribute, state);
  }
}
function schedule() {
  if (!pending && motion.matches && visible.size) pending = requestAnimationFrame(update);
}
function preferenceChanged() {
  if (pending) cancelAnimationFrame(pending);
  pending = 0;
  for (const story of stories) {
    story.root.style.removeProperty(story.property);
    story.root.removeAttribute(story.attribute);
    if (story.attribute === 'data-reading-stage') {
      story.root.style.removeProperty('--reading-open');
      story.root.style.removeProperty('--reading-ink');
      story.root.style.removeProperty('--reading-target');
    }
  }
  schedule();
}
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target);
  schedule();
});
for (const story of stories) observer.observe(story.root);
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
motion.addEventListener('change', preferenceChanged);
