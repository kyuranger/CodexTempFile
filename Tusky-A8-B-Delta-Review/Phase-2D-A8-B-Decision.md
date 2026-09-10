# Phase 2D-A8-B Decision

Date: 2026-09-10. Status: PHASE_2D_A8_B_REVIEW_READY.

The accepted A8-A product-information reading direction is implemented as Chapter 4 only. It answers what someone can read after using a product identifier by showing product name, identifier, production date and batch. APPLICATION + DECISION remains the story classification; TYPOGRAPHY_STORYTELLING primary / LAYOUT_STORYTELLING supporting remains the motion taxonomy. No new top-level pattern or new value claim is introduced.

## Heading exploration performed before implementation

All candidates are internal `PROTOTYPE_COPY_NOT_APPROVED` copy, not approved final wording.

| Candidate | Disposition |
|---|---|
| 从标识读到产品信息 | Selected: states entry and concrete reading outcome; no comma or punctuation workaround |
| 读到这件产品的信息 | Less explicit about the identifier as entry |
| 产品信息从标识开始 | Could suggest that information itself originates in the mark |
| 让标识成为阅读入口 | Clear entry but incomplete information payoff in isolation |
| 从产品上的码读起 | Omits the concrete information outcome |
| 看见标识背后的信息 | More abstract than the selected reading verb |
| 产品信息有迹可查 | Repeats broader tracing language from earlier chapters |
| 产品的来历从这里读起 | Expands provenance beyond the four demonstrated facts |

Canonical H2: **从标识读到产品信息**. Desktop may keep one line; tablet/mobile place “从标识” and “读到产品信息” on separate lines using the same H2 and source. No trailing comma, duplicated heading or CSS punctuation trick.

## Implementation decisions

Use an OPEN INFORMATION READING FIELD. Product name anchors the composition, identifier establishes identity, date and batch expose concrete information meaning. A single quiet divider separates identity from the two facts. No card, mockup, query form, result dashboard, image/copy split or new relationship line is used. C4 has >=100svh desktop/tablet presence with explicit top/bottom padding and C3 transition margin; mobile permits natural length.

Use exact historical static carbon-ribbon values: 热转印碳带 / DFWE2CDSDF2EC332C / 2020-03-15 / 2020031525. Their source keys and current-machine legacy paths are recorded in Implementation QA. Visible “产品信息示例 / 历史展示数据” makes example status understandable. No personal data is copied and no connection claims that these are the bottle illustration's data.

Limit motion to reading attention: identity → date/batch → complete field, with a small translation and neutral tonal changes. All values exist in semantic HTML from the start. Mobile is static; reduced/no-JS retains the complete field. No current query service, authentication/access policy, database match, QR-decoding success, authenticity decision, first/repeated-query state or anti-copy capability is claimed.

## Validation, acceptance and handoff

Six prescribed browser sizes passed concrete-content and overflow checks and produced visual evidence. C2→C3→C4 rhythm and transition were inspected. Actual CSP no-JS tests passed desktop/mobile. Reduced-motion preference switching passed a simulated harness and CSS inspection; actual OS preference emulation was unavailable and is NOT_VERIFIED. Independent extracted Full-Web assets, desktop/mobile rendering and relevant scroll behavior passed. Desktop WebM is 7.1s actual browser recording, with compatible VP8 playback observed. C4 mobile has no motion requiring a separate clip.

All eight hard rejection gates were checked against implementation and rendered evidence; none was found. This readiness decision is not Product Owner approval or production readiness. Remaining decision: approve or revise prototype copy/composition in the localhost review. Current operational query capability remains NEEDS_VERIFICATION and is outside this implementation. No scope blocker prevents reviewing the prototype.

A8-A remains the accepted direction and source audit; this B decision adds implementation/QA evidence and does not supersede its product truth boundaries. A7/P09 remains the unchanged C1–C3 baseline. The three pre-existing A8-A documents and 15 pre-existing assets were preserved by hash. Only C4 plus its resources, four requested B documents and delivery evidence/packages were added. No Chapter 5 was started.

Git: `main`, HEAD `80b4a79e5d96163185081e193b37c06ce8bfa550`; fresh guard fetch returned origin/main at the same commit, Ahead 0 / Behind 0, DirtyUpToDate. Existing A8-A and current B artifacts remain uncommitted. No commit; no push; no remote deployment. Work stops at this phase boundary.
