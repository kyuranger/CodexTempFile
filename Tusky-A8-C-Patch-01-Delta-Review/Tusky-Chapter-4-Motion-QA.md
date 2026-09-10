# Tusky Chapter 4 Motion QA — A8-C P01

A8-C“动效有意义”的判断已被 PO 否决。本补丁使用可见的 PHYSICAL → INFORMATION HANDOFF，并保持 C2 为最强动效章节。

## 桌面交接

桌面以 composition 顶部到达视口 40% 为起点，用 28% 视口的滚动距离完成。信息区从 scale .94、x −28px、y 44px，回到 scale 1 / 原位；文字由辅助色回到章节主色。媒体从 scale 1.055 与轻微横移，回到原构图。图片和遮罩同层移动，遮罩始终覆盖验证区域。

1440×900 的真实测量：

| 状态 | scrollY | progress | 信息区 scale / x / y | 图片 scale |
|---|---:|---:|---|---:|
| physical | 4578 | 0 | .94 / −28 / 44 | 1.055 |
| handoff | 4704 | .4983 | .9699 / −14.05 / 22.07 | 1.0276 |
| information | 4830 | .9983 | .9999 / −.05 / .07 | 1.0001 |

到达标准窗口前，包装标识仍是注意入口；结束时信息区获得更强视觉份量。六项文字始终存在，不靠文字逐个出现制造交互，也没有扫描线、加载、网络追踪、认证成功或数值变化。

1024×900 的自然章节只有 968.39px 高，若机械采用标准距离，页尾仅到 .4945。本补丁取“标准距离”与“自然章节终点前可用距离”较小值：真实页尾 .9969 / information，无新增滚动空间。VM 中不受整数滚动影响的精确终点为 1。

## 手机／平板

宽度 ≤960 时，进度锚定信息区而非图片。信息区顶部到达视口 72% 后，在 22% 视口高度内完成；仅 20px 纵向回位与对比变化，图片保持静止。仍受自然章节终点限制。

390×844 实录：scrollY 3848 → 4034，progress 0 → .9984；信息区 y 20 → .032px，图片 transform none。没有横移、缩放、横向溢出或 sticky trap。顺序与正常阅读一致。

## 轻量实现与降级

原生 IntersectionObserver、passive scroll、单个合并 RAF；读稳定几何后写 CSS 变量，没有持续帧循环、动画框架或 Blazor 渲染。CSS 默认完整静态态；只有 no-preference 与已写入状态同时满足才变换。

- TESTED：脚本语法与 VM 检查，覆盖标准／短章节范围、合并事件、取消排队帧、删除两章状态、关闭／重新开启偏好和视口离开后停止。
- VERIFIED：真实 no-JS CSP 的 1440 / 390 阅读与媒体。
- SIMULATED_BROWSER_REDUCED_MOTION：HTTP 测试响应交换偏好查询条件，实际渲染完整静态分支。真实 OS 设置切换 NOT_VERIFIED；VM 不能替代该证据。

## 动态证据

- [C4 Desktop WebM](evidence-a8c-p01/c4-desktop.webm)：7.209s，1280×812，257,755 字节。
- [C4 Mobile WebM](evidence-a8c-p01/c4-mobile.webm)：7.209s，375×812，199,011 字节。
- [起点](evidence-a8c-p01/1440x900-c4-physical.webp)、[中点](evidence-a8c-p01/1440x900-c4-handoff.webp)、[终点](evidence-a8c-p01/1440x900-c4-information.webp)
- [桌面状态](evidence-a8c-p01/c4-desktop-motion-states.json)、[手机状态](evidence-a8c-p01/c4-mobile-motion-states.json)、[页尾状态](evidence-a8c-p01/1024x900-c4-end.json)
- [编码／完整解码记录](evidence-a8c-p01/motion-recordings.json)、[偏好切换与终点回归](evidence-a8c-p01/preference-switch-check.json)

录像来自实际浏览器滚动的时间戳截图，VP8 / 24fps / 无声，未生成插值画面。1440×900 和 390×844 是测试的 CSS 视口；录像像素按浏览器返回截图编码，并不把编码大小当作测试视口。完整解码和起／中／终状态检查通过。
