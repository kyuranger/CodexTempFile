# Phase 2D A7-B Patch 03 — C2 Canvas

2026-09-09 · **PHASE_2D_A7_B_P03_REVIEW_READY** · 待 Product Owner 视觉评审。

本轮落实 C2 Canvas Owner Override。只替代 P02 的 C2 尺寸、手机叙事和关系几何；Hero 与 C3 保持当前仓库输入，原图和文案事实边界不变。P02 的手机同时强调三组信息已被 Owner 否决，不能再作为当前移动方向。未进入下一章或其他 Phase。

## 实际实现

- 桌面（≥961px）C2 画面铺满可用 viewport 宽度，100vh 高，无圆角、卡片、边框、阴影；A 以 object-fit:cover / 70% 横向定位呈现，文件和像素不加工。三组信息可以同时存在，原生滚动依次描出三条关系；轨道180vh。平板701–960px保留 A，72svh 舞台、145svh轨道。
- 手机（≤700px）保留一个 Image B、一个 picture、一个语义内容列表。舞台 **86svh**，sticky top **7svh**，轨道 **210svh**；图片在同一舞台中的位置始终一致。宽度用100% viewport容器实现实际100vw效果，避免滚动条导致横向溢出。
- 三态范围：Production在0–34%主导，Distribution在34–67%主导，Service在67–100%主导。三条关系分别在0–27%、34–60%、67–93%生长；完成后留存，反向滚动可回撤。末尾7%保留完整第三态，然后自然释放。
- 当前标题30px、信息14px；其他标题17px、信息12px，保留可读深灰（#4b4d46）。已完成标题略深。内容不透明、不隐藏、不移动，无 fade-up；只有关系描线承担叙事动效。单一列表始终进入 accessibility tree，当前项标注 aria-current=step，无 live announcement。
- 手机三支短分支共用左侧窄干线，起点根据 A/B 原图二维码边缘、object-fit 和实际舞台尺寸映射到二维码左侧10px。重设 viewport 时重算，滚动时图片和几何均不改变。
- 标题只有一个 h2 和一份文字，手机显示“同一个码 / 关联不同阶段”。逗号仅视觉裁藏，语义全文仍为“同一个码，关联不同阶段”。
- reduced-motion / no-JS 不设置长轨道：手机按 B 原始1122:1402比例展现紧凑整合画面，三组文字等待读取，全部关系完整。JS仅增强滚动，无重绘循环、滚动拦截、图片变形、重绘二维码或新增依赖。

三组内容仍为：生产时—日期 · 批次 / 工序 · 操作员；流转中—出库 · 物流 / 渠道 · 销售；售后时—保修记录 / 售后信息。AI概念媒体仍为 NOT_ALLOWED_AS_EVIDENCE，QR不构成真实结果或可扫描性证明。

## 实测尺寸与阅读节奏

| viewport | 画面高度86svh | 故事轨道210svh | sticky实际行程124svh | 整个C2（含标题和结语） |
|---|---:|---:|---:|---:|
| 320×740 | 636.4px | 1554.0px | 917.6px | 1981.4px |
| 390×844 | 725.8px | 1772.4px | 1046.6px | 2173.9px |
| 430×932 | 801.5px | 1957.2px | 1155.7px | 2358.7px |

保留86svh而非100vh：每侧约7svh留出页面边缘；首入与退出截图能看到章节衔接。轨道210svh包含画面本身，额外停留只有124svh。截图与键盘退出检查未见长距离空白延迟；“是否感觉被困住”仍属真实设备与 Owner 阅读体验评审，不能由截图自动判定。

## VERIFIED / MEASURED

Edge 152.0.4191.66、DPR1 的真实浏览器 viewport 渲染。证据见 [图库](START-HERE.html)、[validation.json](media-integration/patch-03/validation.json) 和 [integrity.json](media-integration/patch-03/integrity.json)。

- 指定6张实际 viewport 截图：390×844三态、320×740第一/第三态、430×932中点。另含1440/1024/820末态、390标题/退出/reduced、320 no-JS，共13张。
- 共18个状态检查：画面全宽无溢出，三态共用固定画面，当前强调正确，已完成关系为1、未来为0；图片/路径几何在三态不变。六尺寸支持反向滚动与 PageDown 自然退出。
- 十二个 reduced / no-JS 回退、动态切换动效偏好，以及五次宽高/横竖尺寸切换通过。accessibility snapshot 中三个标题及正文均存在。
- Hero 六尺寸截图像素通道差异均为0；Hero源码前缀与 C3 源码尾部逐字节一致。C3 六尺寸相对几何及计算样式一致。所有已跟踪媒体和字体与基线 Git blob 相同；SHA-256完整记录。
- 三个手机 viewport、全部三态的正文背景取样共81项，最小文字对比度 **4.84:1**。次要文字加深后，仅更新相关8张手机截图并重测对比度；布局/回退/冻结验证证据仍适用。
- JavaScript语法与Git diff检查通过。纯静态原型验证，不宣称 .NET build、正式站部署或全面无障碍认证。

## 视觉检查

当前阶段标题明显较大；完成信息仍能阅读，三态均没有同时获得相同视觉强调。320px下文字与瓶身分离，瓶盖、瓶底及QR在三个指定手机尺寸内均可见；路径起点不压住QR。关系几何集中在文字与瓶身之间，未复制桌面大网络。静态回退约400–537px高，三组内容与照片构成一个画面，未恢复长竖信息图。

## 边界、Git与下一步

本机交互：[Hero → C2 → C3](http://127.0.0.1:8767/)。当前工程源位于 `prototypes/phase-2d-a5-3/tusky_phoenix/`，仅 index.html 和 assets/tusky_phoenix_lifecycle.css / .js 三个实现文件改变。

浏览器viewport已实测；手机真机、真实浏览器地址栏伸缩、iOS Safari、真人读屏尚未验证。Owner override确定方向，不等于本次实现已被接受。待视觉评审后再进入后续任务。

基线 main：`e5ef0adba73ceed0bbe7d20573575a891f317182`。结束时Git Guard -Fetch核对：main与fresh origin/main均为上述提交，Ahead 0 / Behind 0，DirtyUpToDate，无进行中的Git操作。本轮未commit、尚未推送，工作区保留当前补丁。
