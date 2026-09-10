# Tusky Chapter 4 — Implementation QA

Date: 2026-09-10. Phase: 2D-A8-B. Status: PHASE_2D_A8_B_REVIEW_READY (implementation ready for Product Owner review; copy not approved).

## Scope and source preservation

Only Chapter 4 is implemented in `prototypes/phase-2d-a5-3/tusky_phoenix/index.html`, with scoped `assets/tusky_phoenix_reading.css`, `assets/tusky_phoenix_reading.js` and `assets/fonts/noto-sans-sc-reading.woff2`. Removing the new section and its two resource references reproduces the pre-task HTML exactly after newline normalization. SHA-256 comparison preserved 18 existing asset/A8-A documentation files. C1–C3, accepted A7/P09 choreography, media and claims are unchanged. No Chapter 5, framework, dependency, API, persistence, deployment, commit or push was introduced.

## Content and evidence

The single semantic H2 is **从标识读到产品信息**. Responsive spans supply presentation breaks without duplicated headings or punctuation hacks. The section carries `PROTOTYPE_COPY_NOT_APPROVED` internally; that token is not visible. The visible example identity is “产品信息示例 / 历史展示数据”.

Concrete values were re-inspected directly in the current-machine historical source `D:\Project\SealIndustry\SealIndustry\Resources\Views\Sample\trace.zh-hans.resx` before implementation:

| Visible field | Exact historical example | Source key / lines |
|---|---|---|
| 产品名 | 热转印碳带 | ProductNameArticle, 192–193 |
| 识别码 | DFWE2CDSDF2EC332C | CodeArticle, 141–142 |
| 生产日期 | 2020-03-15 | ProduceDateArticle, 186–187 |
| 批号 | 2020031525 | BatchArticle, 129–130 |

`Views/Sample/trace.cshtml:10–31` reads localized static values; `SampleController.trace:14–18` returns the view. The historical statement at resource lines 201–202 limits the sample to an example and application-specific design. The old product “TryTrace” entry supports the historical product-information reading story, not a current operational service.

Strategy: source-backed historical carbon-ribbon examples, not fabricated values. No personal name, phone, IP, location or logistics contact was copied. The explicit carbon-ribbon name and historical label separate this data from the C2/C3 bottle illustration; no visual connection claims that they are the same real object. Optional model/specification/brand fields were omitted to keep the four required facts primary.

The public boundary reads “信息内容与读取方式需按具体应用确认。信息可查不等同于真伪判定。” Internal `HISTORICAL_STATIC_SAMPLE` and `NEEDS_VERIFICATION` attributes retain the evidence distinction. No live query, successful lookup, matching database, public endpoint, login policy, authenticity, first/repeated query count or anti-copy guarantee is implemented or asserted. No green verification semantics occur.

## Composition and motion

APPLICATION + DECISION, using TYPOGRAPHY_STORYTELLING with LAYOUT_STORYTELLING support. An open information field uses typography, whitespace and one separator; there is no device/browser mockup, result card, form, dashboard, grid, split, network or timeline. Four semantic `dt/dd` pairs and a `time` element are the visual content. No C4 SVG, canvas, image, input or action button exists. New AI media: 0.

The inherited tone roles separate eyebrow, heading, lead, labels, values and boundary note. Variable Noto Sans SC supports true weight 350; the new 21,144-byte subset covers all C4 text without missing glyphs and retains font license metadata. Existing `OFL.txt` ships with the complete package. This is a local font asset, not an application dependency.

Above 700px with no reduced-motion preference, a short natural-scroll attention handoff runs identity → production date/batch → complete field. Only text tone and a 6px translation change, over 360/420ms. Values exist before script execution and never populate, count or change. No sticky tunnel, scroll interception, scan/loading/success effect or network request is added. A scoped IntersectionObserver and coalesced requestAnimationFrame update only `data-attention`; reverse scroll is supported. Mobile defaults to the complete static field.

## Verification and limits

| Evidence | Result and boundary |
|---|---|
| INSPECTED | C4 selectors/script scope; one semantic copy; exact historical values; no forbidden query/authenticity UI; unchanged baseline hashes and HTML |
| TESTED | `node --check` for the new module; `git diff --check`; targeted simulated attention transitions and preference changes passed |
| LOCAL_INTERACTIVE_TESTED | Six required viewports, real scroll attention changes with unchanged values, actual image loading, no horizontal/text overflow; independent extracted package desktop/mobile |
| VERIFIED no-JS | HTTP CSP `script-src 'none'` actually blocks scripts at 1440×900 and 390×844. All four fields remain complete and naturally readable, without a C4 empty rail |
| SIMULATED reduced motion | DOM/matchMedia harness passed identity/facts/complete/reverse, removing attention on preference change, pending scroll while reduced, restoring motion. CSS media guard inspected |
| NOT_VERIFIED | Actual OS/browser reduced-motion preference, other browser engines, physical mobile hardware, production query systems. CUA exposes no preference-emulation control; the simulation is not reported as a real preference test |

The normal independent-package browser console had no warnings/errors. Expected CSP script-block messages belong only to the explicit no-JS test. This static prototype does not have an application build step; no solution-wide build or production capability verification is claimed.

The 7.1s desktop WebM records actual browser scrolling and attention transitions; it was compressed to VP8, 1280×812, 171,043 bytes. Browser playback advanced to 4.507s and displayed the later information state. A complete decode also succeeded before the compatible re-encode; final VP8 metadata and playback were checked. Mobile has no C4 motion, so no mobile motion video is needed.

## Complete delivery

`Tusky-A8-B-Full-Web.zip`: 6,393,081 bytes, 19 entries. Includes current HTML/CSS/JS, all seven existing runtime/source images, three local fonts, OFL license, portable `preview.py`, README and SHA-256 manifest. It was independently extracted to `C:\Users\Admin\AppData\Local\Temp\seal-tusky-a8b-20260910\full-extracted`, outside the project. ZIP CRC and all extracted hashes passed. All 18 manifested files returned HTTP 200 with matching hashes from port 8769. Desktop and mobile browser checks passed; `picture.currentSrc` selected the mobile lifecycle WebP at 390px. Desktop reverse scroll changed attention to identity with unchanged values. No dependency on the original directory was observed.

Evidence: `evidence/package-source-checks.json`, `independent-package-measurements.json`, `viewport-measurements.json`, `no-js-measurements.json`, screenshots and WebM listed in REVIEW-MANIFEST. Delta excludes unchanged media and is separate from the complete website package.
