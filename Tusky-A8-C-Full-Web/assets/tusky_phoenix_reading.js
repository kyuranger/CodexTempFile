// A8-C: C3 framing and C4 reading attention. No query, value changes or scroll rail.
const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
const stories = [
  { root: document.querySelector('.carriers'), anchor: '.carriers__media', property: '--carrier-progress', attribute: 'data-carrier-stage' },
  { root: document.querySelector('.reading'), anchor: '.reading__composition', property: '--reading-progress', attribute: 'data-handoff' }
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
    if (compact && story.attribute === 'data-handoff') {
      const field = story.root.querySelector('.reading__field');
      top += field.offsetTop - anchor.offsetTop;
    }
    return { story, progress: Math.max(0, Math.min(1, (height * 0.86 - top) / (height * (compact ? 0.4 : 0.46)))) };
  });
  for (const { story, progress } of samples) {
    const state = story.attribute === 'data-carrier-stage'
      ? progress >= 0.98 ? 'complete' : progress < 0.36 ? 'process' : progress < 0.7 ? 'carrier' : 'reading'
      : progress >= 0.98 ? 'information' : progress < 0.35 ? 'physical' : 'handoff';
    story.root.style.setProperty(story.property, progress.toFixed(4));
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
