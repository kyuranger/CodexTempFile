// A7-B P03. Native scrolling reveals three relations in one persistent canvas.
const chapter = document.querySelector('.lifecycle');
if (chapter) {
  const track = chapter.querySelector('.lifecycle__track');
  const scene = chapter.querySelector('.lifecycle__scene');
  const contexts = [...chapter.querySelectorAll('.lifecycle__context')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 700px)');
  const ranges = [[0, .27], [.34, .60], [.67, .93]];
  const clamp = value => Math.max(0, Math.min(1, value));
  let frame = 0;
  let inView = true;
  let listening = false;

  function geometry() {
    const { width, height } = scene.getBoundingClientRect();
    const mobile = narrow.matches;
    const [sourceWidth, sourceHeight, qrX, qrY, position] = mobile
      ? [1122, 1402, 696, 976, .5] : [1877, 838, 1390, 612, .7];
    const scale = Math.max(width / sourceWidth, height / sourceHeight);
    // Map the unchanged image's QR edge through object-fit: cover. The origin
    // stays just outside the QR, including after orientation/viewport changes.
    const x = ((width - sourceWidth * scale) * position + qrX * scale - 10) / width * 1000;
    const y = ((height - sourceHeight * scale) / 2 + qrY * scale) / height * 1000;
    const svg = chapter.querySelector(mobile ? '.lifecycle__connections--compact' : '.lifecycle__connections--wide');
    const origin = svg.querySelector('.lifecycle__origin');
    origin.setAttribute('cx', x.toFixed(2));
    origin.setAttribute('cy', y.toFixed(2));
    const ends = mobile ? [[445, 200], [445, 400], [445, 600]] : [[240, 210], [405, 430], [285, 680]];
    svg.querySelectorAll('.lifecycle__connection').forEach((path, i) => {
      const [endX, endY] = ends[i];
      path.setAttribute('d', mobile
        ? `M${x} ${y}H570Q500 ${y} 500 ${y - 70}V${endY + 30}Q500 ${endY} 470 ${endY}H${endX}`
        : `M${x} ${y}H${Math.min(x - 24, 650)}C550 ${y} 550 ${endY} ${endX} ${endY}`);
    });
  }
  function paint() {
    frame = 0;
    if (reduced.matches) return;
    const bounds = track.getBoundingClientRect();
    const stageHeight = scene.getBoundingClientRect().height;
    const stickyTop = parseFloat(getComputedStyle(scene).top) || 0;
    const progress = clamp((stickyTop - bounds.top) / Math.max(1, bounds.height - stageHeight));
    const current = progress < .34 ? 0 : progress < .67 ? 1 : 2;
    ranges.forEach(([from, to], index) => {
      chapter.style.setProperty(`--relation-${index}`, clamp((progress - from) / (to - from)).toFixed(4));
      contexts[index].dataset.emphasis = index === current ? 'current' : index < current ? 'completed' : 'future';
      if (narrow.matches && index === current) contexts[index].setAttribute('aria-current', 'step');
      else contexts[index].removeAttribute('aria-current');
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
      contexts.forEach((context, index) => {
        chapter.style.removeProperty(`--relation-${index}`);
        delete context.dataset.emphasis;
        context.removeAttribute('aria-current');
      });
      if (listening) removeEventListener('scroll', schedule);
      listening = false;
    } else {
      chapter.dataset.motion = narrow.matches ? 'mobile' : 'desktop';
      if (!listening) addEventListener('scroll', schedule, { passive: true });
      listening = true;
    }
    geometry();
    if (!reduced.matches) paint();
  }
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (inView) schedule();
  }, { rootMargin: '160px 0px' }).observe(chapter);
  new ResizeObserver(() => { geometry(); schedule(); }).observe(scene);
  reduced.addEventListener('change', configure);
  narrow.addEventListener('change', configure);
  addEventListener('resize', configure, { passive: true });
  addEventListener('pageshow', configure);
  document.fonts.ready.then(configure);
  configure();
}
