# Phase 2D-A7-B Patch 07

2026-09-09 · **PHASE_2D_A7_B_P07_REVIEW_READY**

P06方向部分接受，P07取代其当前视觉评审状态；Owner已接受的本地C2累计关系动效保留。REVIEW_READY表示可评审，不表示Owner已接受或已发布。

## 实际交付

- LOCAL_INTERACTIVE_PREVIEW / LOCAL_INTERACTIVE_TESTED：本机 http://127.0.0.1:8767/ 。完整包解压后使用自带preview.py运行HTTP预览。
- [完整网页包](Tusky-A7-B-Patch-07-Full-Web.zip)：源码、7张图片文件（Hero及A/B/C原图与WebP）、两份字体与许可、预览助手与哈希清单。
- [远程增量评审](Tusky-A7-B-Patch-07-Delta-Review.zip)：当前源码快照、P06→P07 diff、41张截图、两段5–8秒WebM、测量和本报告；不重复包装未变媒体母图/字体/历史交付。
- [离线证据入口](START-HERE.html)：DELTA_REMOTE_REVIEW / REMOTE_STATIC_REVIEW。GitHub tree/blob是源码浏览，不作为动效运行验证。

## Shared frame与展开

Hero保持现有宽度和裁切；无需为了对齐而放大。根级story-gutter、story-max-width、story-radius是共同权威，Hero宽度与C2入口inset从它们导出。max-width上限也参与计算，不是两个独立常数。

| Desktop viewport | Hero left/right/width/radius | C2 entry left/right/width/radius |
|---|---|---|
|1440×900|40 / 1400 / 1360 / 26px|40 / 1400 / 1360 / 26px|
|1024×900|28 / 996 / 968 / 22px|28 / 996 / 968 / 22px|
|1920×1080|160 / 1760 / 1600 / 26px|160 / 1760 / 1600 / 26px|

MEASURED：相应边缘/宽度/圆角误差<0.1px；实际截图像素检查了左右边缘与圆角外侧白区。C2入口视觉高度为88svh（1440×900时792px），同一entry进度同步展开宽度、高度和圆角；progress .07时半展开、圆角13px，.14时到达1440×900且圆角0。对比帧图和实际录像确认“框打开进入故事”的连续性。

使用已有clip-path handoff，图片本身无transform、无缩放/换图/滤镜，阶段结构始终为100svh。未新增每帧layout属性或JS：**整份关系JS与P06逐字节一致**，原.14展开窗口、关系区间[0,.27]/[.34,.60]/[.67,.93]、原生回撤、layout-fit gate、passive scroll和单RAF保留。Tablet95svh，Mobile86svh/top7svh与210svh rail仍保留；共享圆角契约仅适用于Desktop，手机不增加卡片外框。

## 文字层级与六路线

六个轻量角色：DISPLAY、SECTION_HEADING、IDENTITY/EYEBROW、LEAD、DETAIL、SECONDARY/SCOPE。页面默认分别#202124/#252b25/#716c66/#596058/#60665f/#696f68。Hero字体、字号、字重和裁切保持，仅辅助颜色接入角色。

C2照片底色有阴影，不能照搬白底的浅灰。其角色局部采用#595247（eyebrow）、#495247（lead）、#4b5249（detail）、#514938（scope）；标题保持深色，完成H3为#414a40，未来H3较轻。没有使用opacity作为层级。

1440×900实际层级：H2 56.16px/350；lead 16px/400；H3 30.24px/350；detail 14px/400；resolution 21.6px/350→400；scope 12px/400。Eyebrow13px/400。大小、灰度/褐色、字重、间距共同区分标题、局部阶段、信息与条件句。C3 H2 46.08px/350、lead16px、route21px/350、description13px、scope13px，并使用同一白底角色。

视觉对照已包含P06与P07的C2和C3，分别比较headline/lead、local heading/detail、detail/scope。C2主标题和关系焦点先被看见，细节明显缩小并退后；scope为小号褐灰。C3从六个等价格子改为三条赋码路线、两个独立载体、RFID独立一行，route名称仍明显高于描述。

证据审查：P02“保留内容与证据边界”段及P01来源表支持既有六术语/描述；公开组名未被逐字批准，因此采用**无标题的3/2/1空间分组**。顺序为喷码、激光标识、TTO / 标签、金属标牌 / RFID。六个dt/dd与scope逐字保持；没有增加RFID接入、金属加工/耐久、通用兼容或当前能力承诺。C的圆形挂片仍不被认定为RFID。

33个真实照片文字行区域的最终状态抽样，最小背景对比值4.52；方法及范围见contrast-samples.json。这只支持所测1440/390/320最终状态，不宣称全站WCAG认证。视觉审查同时覆盖入口和中间状态。

## 真实章节距离

1440×900：Hero视觉底部y868 → C2入口视觉顶部y1138，**270px / 30svh**。其中section margin216px/24svh，加C2入口顶部inset54px/6svh。C2最终release底部y2704 → C3第一个可见内容顶部y2974，**270px / 30svh**；其中C3 margin180px/20svh，加内部entry90px/10svh。

P06对应可见距离216px/24svh、180px/20svh；P07分别增加25%和50%。截图同时容纳上一章尾部、白色停顿和下一章开头，能看到章节已结束再进入下一章；白区约占桌面窗口三成，两边内容仍同屏可见。没有空spacer元素。Hero首屏底部32px呼吸保持。

| viewport | Hero底部→C2入口 | C2 release→C3可见开头 | C3高度 |
|---|---|---|---|
| 1440×900 | 270.00px / 30.00svh | 270.00px / 30.00svh | 900.00px |
| 1024×900 | 270.00px / 30.00svh | 270.00px / 30.00svh | 900.00px |
| 1920×1080 | 323.99px / 30.00svh | 324.00px / 30.00svh | 1080.00px |
| 820×1180 | 256.06px / 21.70svh | 259.58px / 22.00svh | 1261.30px |
| 390×844 | 115.78px / 13.72svh | 135.02px / 16.00svh | 920.98px |
| 320×740 | 101.52px / 13.72svh | 118.39px / 16.00svh | 904.09px |
| 430×932 | 127.86px / 13.72svh | 149.09px / 16.00svh | 941.16px |
| 1440×699 | 209.69px / 30.00svh | 209.69px / 30.00svh | 767.72px |
| 1440×650 | 195.00px / 30.00svh | 195.00px / 30.00svh | 757.94px |

选定section spacing为Desktop24/20svh、Tablet16/14svh、Mobile12/10svh。表中可见距离另包括C2入口inset和C3内部padding，不能把结构margin与可见距离混用。1440整页3784px，C2 native rail1620px/180svh，实际sticky travel仍720px，未靠延长动效隧道制造章节停顿。

原生long-page截图会把sticky轨道的文档占位拍成空区：它在真实滚动时由固定舞台持续占据，不能把它误认成额外留白。另附同尺寸reduced-motion整页，展示没有轨道占位的内容节奏；实际两处距离以transition截图、测量和WebM判断。

## 验证与边界

TESTED：Chrome 152.0.7977.76 / DPR1，9组实际浏览器窗口，每组entry/.07/.14/.47/.98/reverse共54状态；无内容出框、重叠、横向溢出或正常运行错误。含1440×900、1024×900、1920×1080、820×1180、390×844、320×740、430×932、1440×699/650。

三章手机逗号视觉隐藏且保留在单一语义标题中。C2所有essential内容保留在辅助语义树。8组reduce/no-JS完整静态组合：无clip、无长sticky rail、关系全展示；动态reduce切换、390×600布局fallback及恢复、PageDown释放和无idle RAF循环通过。三个代表窗口与P06对照：内容集合一致、Hero字体/裁切/静态行为一致、累计关系与emphasis一致（整数滚动容差<.007）。

INSPECTED / VERIFIED：批准Hero/A/B/C、WebP、字体、许可共13个既有文件hash未变（含历史别名）；完整包包含所需7个规范图片文件，不带冗余别名。QR、瓶体与关系起点在实际截图保持可见；没有宣称二维码可扫码。只补充既有Product Detail规则，没有新规则文件或新框架。

NOT_VERIFIED：真实iOS/Safari浏览器栏、真机、系统文字放大、人工屏幕阅读器以及Owner主观最终接受。未运行.NET构建，本轮为独立静态原型。

## Git与范围

Preflight fresh main/origin/main：e5ef0adba73ceed0bbe7d20573575a891f317182，Ahead0/Behind0，DirtyUpToDate。保留已有P03–P06改动；本轮只改原型HTML/CSS、既有设计规则及当前评审交付。JS未改。未commit，未push，没有Chapter4、claim提升、媒体生成、品牌架构变化或旧项目访问。


最终交付 VERIFIED：完整ZIP含16个文件（7张规范图片、两份字体及许可、源码与预览），约6.37 MB；增量约2.93 MB，低于5 MB。CRC及各文件精确字节比对通过。完整包在独立解压目录使用包内preview.py启动；1440×900、390×844展开首/中/末态、累计关系与回撤、媒体/字体加载通过，无外部请求或错误，原8767预览亦通过。离线评审41张截图+1张坐标图全部加载，1440/390宽无横溢；Desktop 7.50秒、Mobile 7.292秒录像实际解码播放通过。详见media-integration/patch-07/delivery-validation.json。JS语法检查及git diff --check通过。

结束时fresh Guard：main与origin/main仍为e5ef0adba73ceed0bbe7d20573575a891f317182，Ahead0/Behind0，DirtyUpToDate，无进行中的Git操作。未commit，未push；完成P07后停止。
