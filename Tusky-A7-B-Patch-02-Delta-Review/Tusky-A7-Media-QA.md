# Tusky A7 Media QA

2026-09-08 · P02当前有效 · **PHASE_2D_A7_B_P02_REVIEW_READY**

VERIFIED：A/B/C批准PNG与现有WebP均与P02输入基线hash相同，未重新生成、编码、放大原图、翻转、擦码或写入像素。Hero图/字体亦不变。页面只改变开放边缘/版式；C3从旧宽屏16:10取景恢复全尺寸比例4:3。delta包不含未变媒体或字体。

| ID | 像素 | 比例 | 页面用途 |
|---|---|---|---|
| A | 1877×838 | 2.2399:1 | C2 >700px，完整横图，radius0 |
| B | 1122×1402 | 0.8003:1 | C2 ≤700px，同一竖图共享关系场，radius0 |
| C | 1448×1086 | 4:3 | C3所有断点完整比例，radius0；桌面非对半、平板错位、手机通栏 |

下列文件都在 `prototypes/phase-2d-a5-3/tusky_phoenix/assets/`：

| ID | assets文件 | bytes | SHA-256 |
|---|---|---:|---|
| A | `tusky_phoenix_lifecycle_desktop.png` | 1413564 | `32c71981fff2b57a4bdde1d102fb000fd942a53a31fd4ee8370342d075ad9082` |
| A | `tusky_phoenix_lifecycle_desktop.webp` | 48948 | `7d876f49ca86724bc6a128a69072624dd9bfaee900d1d84e0aebd96611262308` |
| B | `tusky_phoenix_lifecycle_mobile.png` | 1475577 | `ff3b8c221ccc3eb7c33fbcc1a7070ca7aaec2394eb15de02a3834311b2596616` |
| B | `tusky_phoenix_lifecycle_mobile.webp` | 57894 | `75740b572be3f32224fa71ae5695e8e36ea6712aad9ddf8c9c9024e2c4b90800` |
| C | `tusky_phoenix_alternative_carriers.png` | 1739159 | `1632315557a1345bf55d6208bad116d9d39409ead48f726e2c2cb87b3e356cf4` |
| C | `tusky_phoenix_alternative_carriers.webp` | 93466 | `2d54d2d27b8704eb9addd6a7d502188095dae9f92498a16ea9f179f8fa9c1e1a` |

TESTED：六尺寸实际HTTP读取和decode成功、A/B资源选择正确，无404；WebP总量仍200308 bytes。C2文字/关系路径位于图片留白、没有跨入瓶体；保守文字底图对比采样最低5.50:1。改变圆角没有改变底图或文字相对位置。

INSPECTED：A/B瓶身QR保持可见。C中白瓶、纸标签、金属牌与圆形挂片完整；前三者QR保留，圆形挂片没有QR且不标为RFID。移动C3整章截图按完整viewport宽度取景，未用仅包含窄文字容器的元素截图裁掉通栏图边缘。

所有媒体仍为 `AI_GENERATED_REALISTIC_CONCEPT_MEDIA / NOT_ALLOWED_AS_EVIDENCE`。P01中性alt、两章条件句、当前能力NEEDS_VERIFICATION和金属标牌载体概念边界均原样保留。未添加公开“概念示意”caption、客户案例、结果或兼容承诺。

REVIEW_READY 不等于 Product Owner 已接受。尚未验证真机、Safari/Firefox、真人读屏、系统文字放大和生产服务；沿用原型字体子集，跨平台字体覆盖未验证。AI 图片与 QR 不构成生产结果、真实客户案例、可扫码性、材料/设备兼容性或 RFID 接入证据。
