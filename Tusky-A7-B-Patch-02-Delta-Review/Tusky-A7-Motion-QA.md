# Tusky A7 Motion QA

2026-09-08 · P02当前有效 · **PHASE_2D_A7_B_P02_REVIEW_READY**

## 改动与冻结

C2 Accumulating Relationship Trace保留同源累积、三条逐步完成、反向回撤；HTML中的所有SVG路径、标签及其几何不变。`[0,.38] / [.30,.71] / [.65,1]`三个归一化区间未变。仅桌面定位、开始/结束范围与对应停留时长调整；手机/平板仍按原可见起点80%和最后标题42%位置，未新增延长行程。C3保持静态。

桌面条件仍宽≥961、高≥820、no-preference。用实际scene高度和实际固定/粘性页头遮挡计算居中top；当前masthead是static，遮挡0。C2在scene到达该位置后开始展开，结束在释放前24px。自然scroll行程 `clamp(560px,74vh,740px)` 让900px高时实际展开642px，接近P01的1440基线643.6px；没有为居中将已接受节奏压成318px。

## 真实测量与视觉检查

| Viewport | 页头定位 / 遮挡高 | 画面高 | sticky top | entry中心 | midpoint中心 | final中心 | 最大中心误差 | 动画行程 |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 1440×900 | static / 0 | 607.172 | 146.414 | 449.992 | 449.992 | 449.992 | 0.008px | 642.0px |
| 1024×900 | static / 0 | 421.453 | 239.273 | 449.992 | 449.992 | 449.992 | 0.008px | 642.0px |


TESTED：两个桌面尺寸的entry(6%)/midpoint(50%)/final(100%+2px)均完整在viewport内且中心误差<0.1px；终态三值均1，过释放点后scene向上继续滚动、终态保持。反向回滚第一条恢复未满、第三条归零。所有六尺寸起点在屏内时有初段，三个手机的终态三组标签同时可见。

INSPECTED：1440三态与1024中态确认画面不再贴顶，上下留白相称；最终线条确实延伸到标签方向，没有只凭CSS变量判断完成。正常交接截图确认从宽关系场进入不同结构的C3。具体截图和scrollY/scene bounds/关系值均在 `media-integration/patch-02/validation.json`。

TESTED：12组reduced/no-JS均显示最终路径与完整正文、无sticky/额外行程；动态偏好切换、7组断点resize通过；PageDown正常、闲置500ms新增RAF为0。仍为事件驱动单帧排队/被动scroll，无持续RAF循环、滚动接管、图片变形、视频序列或C3附加动效。

全页长图是明确标记的reduced静态回退，动态停留的entry/midpoint/final另提供viewport证据。REVIEW_READY 不等于 Product Owner 已接受。尚未验证真机、Safari/Firefox、真人读屏、系统文字放大和生产服务；沿用原型字体子集，跨平台字体覆盖未验证。AI 图片与 QR 不构成生产结果、真实客户案例、可扫码性、材料/设备兼容性或 RFID 接入证据。
