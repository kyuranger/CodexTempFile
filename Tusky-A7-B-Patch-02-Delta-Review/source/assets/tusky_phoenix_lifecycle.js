// A7-B P02. Preserve the accumulating trace inside a centered open field.
const chapter = document.querySelector('.lifecycle');
if (chapter) {
  const track = chapter.querySelector('.lifecycle__track');
  const scene = chapter.querySelector('.lifecycle__scene');
  const lastHeading = chapter.querySelector('.lifecycle__context--service h3');
  const masthead = document.querySelector('.masthead');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 961px) and (min-height: 820px)');
  const narrow = matchMedia('(max-width: 700px)');
  const ranges = [[0, .38], [.30, .71], [.65, 1]];
  const clamp = value => Math.max(0, Math.min(1, value));
  let frame = 0;
  let inView = true;
  let listening = false;

  function paint() {
    frame = 0;
    if (reduced.matches) return;
    // All readings precede writes. Natural track position remains measurable
    // while the desktop scene is pinned; mobile/tablet need no extra scroll rail.
    const trackBounds = track.getBoundingClientRect();
    const bounds = scene.getBoundingClientRect();
    const origin = chapter.querySelector(narrow.matches ? '.lifecycle__origin--compact' : '.lifecycle__origin--wide');
    const anchor = origin.getBoundingClientRect();
    const originOffset = anchor.top + anchor.height / 2 - bounds.top;
    // A normal-flow masthead has scrolled away before this scene pins.
    // Only a visible fixed/sticky masthead occupies the usable viewport.
    const headerPosition = masthead ? getComputedStyle(masthead).position : 'static';
    const topInset = /^(fixed|sticky)$/.test(headerPosition)
      ? Math.max(0, Math.min(innerHeight, masthead.getBoundingClientRect().bottom)) : 0;
    const stickyTop = topInset + Math.max(0, (innerHeight - topInset - bounds.height) / 2);
    const start = desktop.matches
      ? trackBounds.top - stickyTop
      : trackBounds.top + originOffset - innerHeight * .80;
    const end = desktop.matches
      ? trackBounds.bottom - bounds.height - stickyTop - 24
      : trackBounds.top + lastHeading.getBoundingClientRect().top - bounds.top - innerHeight * .42;
    const progress = clamp(-start / Math.max(1, end - start));
    if (desktop.matches) chapter.style.setProperty('--story-top', `${stickyTop}px`);
    ranges.forEach(([from, to], index) => {
      chapter.style.setProperty(`--relation-${index}`, clamp((progress - from) / (to - from)).toFixed(4));
    });
  }
  function schedule() {
    if (inView && !reduced.matches && !frame) frame = requestAnimationFrame(paint);
  }
  function configure() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (reduced.matches) {
      delete chapter.dataset.motion;
      ranges.forEach((_, index) => chapter.style.removeProperty(`--relation-${index}`));
      if (listening) removeEventListener('scroll', schedule);
      listening = false;
      return;
    }
    chapter.dataset.motion = desktop.matches ? 'desktop' : 'flow';
    if (!listening) addEventListener('scroll', schedule, { passive: true });
    listening = true;
    paint();
  }
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (inView) schedule();
  }, { rootMargin: '160px 0px' }).observe(chapter);
  new ResizeObserver(schedule).observe(scene);
  reduced.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  narrow.addEventListener('change', configure);
  addEventListener('resize', schedule, { passive: true });
  addEventListener('pageshow', configure);
  document.fonts.ready.then(configure);
  configure();
}
