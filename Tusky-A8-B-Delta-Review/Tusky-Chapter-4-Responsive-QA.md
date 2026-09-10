# Tusky Chapter 4 — Responsive QA

Date: 2026-09-10. Evidence mode: LOCAL_INTERACTIVE_TESTED with real in-app browser viewport resizing, native scrolling, DOM measurements and screenshots. No physical-device or cross-engine test is claimed.

| Viewport | C4 height (CSS px) | C3→C4 margin | C4 top / bottom padding | Result |
|---|---:|---:|---|---|
| 1440×900 | 917.47 | 108 | 90 / 90 | Large single-line heading, product identity anchor, adjacent date/batch, short attention handoff |
| 1024×900 | 900 | 108 | 90 / 90 | Maintains chapter scale and readable field spacing |
| 820×1180 | 1180 | 118 | 94.4 / 94.4 | Intentional two-line heading and taller sequence; generous identity area, adjacent facts |
| 430×932 | 962.02 | 74.56 | 65.24 / 83.88 | Natural vertical reading, static complete facts |
| 390×844 | 930.53 | 67.52 | 59.08 / 75.96 | Two-line heading, code below label, date then batch |
| 320×740 | 935.05 | 59.2 | 51.8 / 66.6 | Natural chapter over one viewport, no horizontal scrolling |

Every viewport: four required fields and exact example values present; measured document overflow 0px; no overflowing heading/paragraph/label/value; no duplicate responsive semantic content. Information remains selectable HTML. All three displayed images from the preceding chapters loaded. Fonts remain light-to-regular with actual variable weight 350 for the heading.

Desktop/tablet min-height is approximately 100svh or greater. These are natural-content heights, not sticky rails. The desktop code field follows the product name; date and batch share a baseline-aligned row separated by whitespace. At 820px the heading re-composes into two intentional lines and the lead has a shorter measure. At mobile sizes all information follows one vertical order: heading and explanation → example identity → product name and code → date → batch → boundary. The short leading explanation remains close to its heading; application limitations follow the facts. The layout allows natural vertical length rather than compressing facts into one screen.

## Chapter rhythm and visual inspection

`1440x900-c2-c3-c4.webp` is one crop from a real full-page screenshot, not a stitched layout. It starts at C2's rendered final stage, then includes all C3 and C4. The earlier unchanged C2 sticky-scroll rail is intentionally outside this crop. The physical carrier composition resolves before C4's open information field begins; deliberate chapter margin and internal padding maintain breathing space. C4 introduces neither C2's relationship-line language nor C3's image/text split. Large product-name and date typography gives it major-chapter presence.

Required desktop, tablet and mobile C4 screenshots are complete-chapter crops from the respective viewport renders; a chapter taller than its viewport is not presented as fitting one screen. The 15px desktop/browser scrollbar means content screenshots are 15px narrower than the requested outer viewport. Files retain the tested viewport in their names; no screenshot was stretched to hide this distinction.

The C3→C4 transition view, full C4 desktop/tablet/mobile views and 320px narrow view were visually inspected. No awkward comma or CSS punctuation hiding is used. The canonical heading has one text source. Body/labels/secondary notes use distinct inherited neutral tones rather than uniform black or verification green.

## Fallback and portable-package verification

Actual no-JS HTTP tests at 1440×900 and 390×844 preserved all facts, no overflow and static C4. C4 dimensions were respectively 917.47px and 930.53px, the same as normal layouts. C2's earlier script-dependent rail changes its own height when scripts are blocked; C4 creates no replacement empty space. `1440x900-no-js-c4.webp` and `390x844-no-js-c4.webp` show the results.

Reduced-motion CSS and preference transitions were inspected/simulated, not tested by changing an actual OS/browser preference. That evidence limitation is retained in Implementation QA. The full field is the default HTML/CSS state; neither this fallback nor no-JS depends on hiding/removing facts.

The complete ZIP was extracted outside the repository and served from its own `preview.py`. Real 1440×900 and 390×844 browser tests passed content/overflow/image checks. Mobile `currentSrc` selected `tusky_phoenix_lifecycle_mobile.webp`; desktop selected its desktop counterpart. All packaged files were separately fetched and matched against SHA-256. The normal console was empty of warnings/errors. See `independent-package-measurements.json`.

## Review status

PHASE_2D_A8_B_REVIEW_READY. The eight hard rejection categories are absent in the inspected implementation and visual evidence: the four facts are concrete, historical example identity is visible, no authenticity or fake-current-service semantics are present, no mockup/card grid/relationship-line/split repetition was introduced, mobile hierarchy is clear, and C4 retains major-chapter scale. Product Owner visual/copy acceptance remains pending.
