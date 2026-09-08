# Tusky A7 Implementation QA

2026-09-08 · P02当前有效 · **PHASE_2D_A7_B_P02_REVIEW_READY**

## 真实验证环境与范围

TESTED：Windows / Edge 152.0.4191.66 headless / Playwright 隔离context / DPR1 / localhost HTTP，等待字体与媒体decode。只验证当前静态三章原型；未运行全站Solution Build或生产Publish。机器记录：`media-integration/patch-02/validation.json`。

源码改动仅为 `prototypes/phase-2d-a5-3/tusky_phoenix/assets/tusky_phoenix_lifecycle.css`、同目录JS及 `index.html` 两处内部phase。HTML除phase外与P01原样一致；没有改Hero、文案、路径几何、语义顺序、alt或图片文件。

## 响应式与容器

| Viewport | Hero宽 | C2画面宽×高 | C2整章高（正常） | C3画布宽 | C3静物宽 | C3整章高 |
|---|---:|---:|---:|---:|---:|---:|
| 1440×900 | 1360 | 1360×607.2 | 1706.8 | 1360 | 810.9 | 760.2 |
| 1024×900 | 968 | 944×421.5 | 1505.9 | 944 | 562.3 | 727.4 |
| 820×1180 | 780 | 780×348.2 | 738.7 | 780 | 686.4 | 1086.8 |
| 430×932 | 398 | 398×497.3 | 898.8 | 398 | 430.0 | 937.0 |
| 390×844 | 358 | 358×447.3 | 848.8 | 358 | 390.0 | 907.0 |
| 320×740 | 296 | 296×369.9 | 797.2 | 296 | 320.0 | 902.5 |

MEASURED：六尺寸overflow=0；C2照片/关系场宽高与位置相同；手机C2高度及内容位置与P01一致。C2/C3 radius=0；前三章宽高均大于150px且圆角大于8px的所有元素都在Hero内，未全站移除圆角。路线文字盒无背景、边框、阴影或溢出，DOM仍为单一dl；只有1个H1、2个H2，不复制移动语义内容。

C3桌面静物占整章约59.6%，不对半；820px静物686.4px、画布780px且左右错位排版；三个手机尺寸静物宽度等于viewport、边缘x=0。完整4:3图像不裁二维码或物体。六路线与描述齐全，公开文字无prototype/demo/概念示意/内部状态泄漏。

## 冻结项、功能与观察

VERIFIED：Hero源码前缀与输入基线完全一致，批准媒体和字体hash不变；六尺寸同浏览器稳定截图pixel channel diff均0。比较使用基线HTML/CSS/JS拦截对照、fonts.ready + decode + 500ms等待、预截图与200ms等待，控制先前遇到的异步图片栅格差异。新CSS只作用C2/C3。

TESTED：无JS异常/HTTP资源错误；正确A/B断点；六尺寸三关系终态均1且可回撤；桌面释放正常；每个手机终态三组标签同时可见。12组reduced/no-JS静态完整、无sticky/额外行程；7组resize含700/701、961、短桌面1024×819；动态reduced切换与原生PageDown通过；闲置500ms新增RAF均0。照片文字保守像素采样最低5.50:1，属于该底图/文本颜色的局部检查。

INSPECTED：六尺寸完整长页及桌面/手机正常三态、交接、C3构图。大圆角Hero → 方直开放C2 → 非对半C3可在全页判断。22张证据由gallery链接原始尺寸：6全页reduced、9正常C2三态（1440/1024/390）、4整章C3（1440/1024/820/390）、2交接、1 no-JS全页。C3截图为整章页坐标裁框、覆盖viewport全宽，可能高于一屏；不冒充单屏截图。

REVIEW_READY 不等于 Product Owner 已接受。尚未验证真机、Safari/Firefox、真人读屏、系统文字放大和生产服务；沿用原型字体子集，跨平台字体覆盖未验证。AI 图片与 QR 不构成生产结果、真实客户案例、可扫码性、材料/设备兼容性或 RFID 接入证据。

Git：main；HEAD 与 fresh origin/main 均为 `2e62e4eb9bf8ed72a91c22ab7a8e2498bc754c5f`；Ahead 0 / Behind 0。保留已授权的既有 dirty 工作区；未 commit，尚未推送。
