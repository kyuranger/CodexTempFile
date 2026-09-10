// A7-B P08. Native scroll targets a brief, reversible visual interpolation.
const chapter = document.querySelector('.lifecycle');
if (chapter) {
  const track = chapter.querySelector('.lifecycle__track');
  const scene = chapter.querySelector('.lifecycle__story-stage');
  const contexts = [...chapter.querySelectorAll('.lifecycle__context')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 700px)');
  let pinning = false;
  const ranges = [[0, .27], [.34, .60], [.67, .93]];
  const clamp = value => Math.max(0, Math.min(1, value));
  let frame = 0;
  let listening = false;
  let start = 0;
  let distance = 1;
  let chapterTop = 0;
  let chapterBottom = 0;
  let targetProgress = 0;
  let renderedProgress = 0;
  let lastTime = 0;
  const settleEpsilon = .0002;
  const responseTime = 80;

  function geometry() {
    const { width, height } = scene.getBoundingClientRect();
    const mobile = narrow.matches;
    const [sourceWidth, sourceHeight, qrX, qrY] = mobile
      ? [1122, 1402, 696, 976] : [1877, 838, 1390, 612];
    const position = parseFloat(getComputedStyle(chapter.querySelector('.lifecycle__photo img')).objectPosition) / 100;
    const scale = Math.max(width / sourceWidth, height / sourceHeight);
    // Map the unchanged image's QR edge through object-fit: cover. The origin
    // stays just outside the QR, including after orientation/viewport changes.
    const x = ((width - sourceWidth * scale) * position + qrX * scale - 10) / width * 1000;
    const y = ((height - sourceHeight * scale) / 2 + qrY * scale) / height * 1000;
    const svg = chapter.querySelector(mobile ? '.lifecycle__connections--compact' : '.lifecycle__connections--wide');
    const origin = svg.querySelector('.lifecycle__origin');
    origin.setAttribute('cx', x.toFixed(2));
    origin.setAttribute('cy', y.toFixed(2));
    const ends = mobile ? [[445, 345], [445, 495], [445, 645]] : [[235, 370], [410, 525], [285, 680]];
    svg.querySelectorAll('.lifecycle__connection').forEach((path, i) => {
      const [endX, endY] = ends[i];
      const radius = Math.min(30, Math.max(4, (y - endY) / 2));
      path.setAttribute('d', mobile
        ? `M${x} ${y}H560Q500 ${y} 500 ${y - radius}V${endY + radius}Q500 ${endY} ${500 - radius} ${endY}H${endX}`
        : `M${x} ${y}H${Math.min(x - 24, 650)}C550 ${y} 550 ${endY} ${endX} ${endY}`);
    });
  }
  function measureScroll() {
    const bounds = track.getBoundingClientRect();
    const stageHeight = scene.getBoundingClientRect().height;
    const stickyTop = parseFloat(getComputedStyle(scene).top) || 0;
    chapterTop = bounds.top + scrollY;
    chapterBottom = chapterTop + bounds.height;
    start = chapterTop - stickyTop;
    distance = Math.max(1, bounds.height - stageHeight);
  }
  function paint(progress) {
    const entry = clamp(progress / .14);
    chapter.style.setProperty('--entry', (entry * entry * (3 - 2 * entry)).toFixed(4));
    const current = progress < .34 ? 0 : progress < .67 ? 1 : 2;
    chapter.dataset.resolved = String(progress >= .93);
    ranges.forEach(([from, to], index) => {
      chapter.style.setProperty(`--relation-${index}`, clamp((progress - from) / (to - from)).toFixed(4));
      contexts[index].dataset.emphasis = index === current ? 'current' : index < current ? 'completed' : 'future';
      if (narrow.matches && index === current) contexts[index].setAttribute('aria-current', 'step');
      else contexts[index].removeAttribute('aria-current');
    });
  }
  function settle() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    renderedProgress = targetProgress;
    paint(renderedProgress);
  }
  function interpolate(time) {
    frame = 0;
    if (!pinning) return;
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 1000 / 60;
    lastTime = time;
    // Frame-rate independent damping. No geometry reads in this loop.
    renderedProgress += (targetProgress - renderedProgress) * (1 - Math.exp(-elapsed / responseTime));
    if (Math.abs(targetProgress - renderedProgress) <= settleEpsilon) {
      settle();
      return;
    }
    paint(renderedProgress);
    frame = requestAnimationFrame(interpolate);
  }
  function schedule() {
    if (!pinning) return;
    targetProgress = clamp((scrollY - start) / distance);
    // Settle immediately outside the chapter or its pinned interval: no tail
    // after a fast page jump, and a completed field as the chapter releases.
    if (document.hidden || scrollY + innerHeight <= chapterTop || scrollY >= chapterBottom
      || scrollY <= start || scrollY >= start + distance) {
      if (renderedProgress !== targetProgress || frame) settle();
      return;
    }
    if (!frame && Math.abs(targetProgress - renderedProgress) > settleEpsilon) {
      lastTime = 0;
      frame = requestAnimationFrame(interpolate);
    }
  }
  function layoutFits() {
    const stage = scene.getBoundingClientRect();
    const top = parseFloat(getComputedStyle(scene).top) || 0;
    const intro = chapter.querySelector('.lifecycle__intro').getBoundingClientRect();
    const resolution = chapter.querySelector('.lifecycle__resolution').getBoundingClientRect();
    const boxes = contexts.map(context => context.getBoundingClientRect());
    // Check the actual pinned composition, including the largest mobile emphasis.
    return stage.height + top <= innerHeight + 1
      && [intro, ...boxes, resolution].every(box => box.top >= stage.top + 12
        && box.bottom <= stage.bottom - 12 && box.left >= stage.left && box.right <= stage.right)
      && intro.bottom + 12 <= boxes[0].top
      && boxes.every((box, index) => box.bottom + 12 <= (boxes[index + 1]?.top ?? resolution.top));
  }
  function configure() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    pinning = false;
    const capable = CSS.supports('position', 'sticky');
    if (!reduced.matches && capable) {
      chapter.dataset.motion = narrow.matches ? 'mobile' : 'desktop';
      chapter.style.setProperty('--entry', '0');
      contexts.forEach(context => { context.dataset.emphasis = 'current'; });
      pinning = layoutFits();
    }
    if (!pinning) {
      delete chapter.dataset.motion;
      delete chapter.dataset.resolved;
      chapter.style.removeProperty('--entry');
      chapter.dataset.runtime = 'static';
      chapter.dataset.fallback = reduced.matches ? 'reduced-motion' : capable ? 'layout' : 'sticky-unsupported';
      contexts.forEach((context, index) => {
        chapter.style.removeProperty(`--relation-${index}`);
        delete context.dataset.emphasis;
        context.removeAttribute('aria-current');
      });
      if (listening) removeEventListener('scroll', schedule);
      listening = false;
    } else {
      delete chapter.dataset.fallback;
      if (!listening) addEventListener('scroll', schedule, { passive: true });
      listening = true;
    }
    geometry();
    if (pinning) {
      measureScroll();
      targetProgress = clamp((scrollY - start) / distance);
      settle();
      chapter.dataset.runtime = 'active';
    }
  }
  // Layout changes refresh the cache; scrolling/interpolation never measures.
  new ResizeObserver(configure).observe(scene);
  reduced.addEventListener('change', configure);
  narrow.addEventListener('change', configure);
  addEventListener('resize', configure, { passive: true });
  addEventListener('pageshow', configure);
  document.addEventListener('visibilitychange', schedule);
  document.fonts.ready.then(configure);
  configure();
}
