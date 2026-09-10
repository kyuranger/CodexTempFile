# Tusky Chapter 4 Implementation QA — A8-C P01

A8-C 未被 PO 接受。本版替代旧的 C4 故事／层级判断，保留批准媒体及既有事实边界。

## 一条故事与可读信息层

主线：产品上存在标识 → 标识作为读取入口 → 可以读到产品具体信息。

页面仍使用单一 H2“从标识读到产品信息”。引导文字为“以产品标识为入口，读取名称、生产日期、批号与规格。”图片说明为“产品上的标识”，信息区只保留“产品信息示例”。去掉“历史展示数据”的副标签，没有 tab、按钮、记录导航、仪表盘或查询表单。

语义 HTML 的 dt/dd 是可读信息层；值始终不随动画变化：

| 字段 | 独立示例值 |
|---|---|
| 产品名称 | 热转印碳带 |
| 识别码 | DFWE2CDSDF2EC332C |
| 生产日期 | 2020-03-15 |
| 批号 | 2020031525 |
| 型号 | SNE-207 |
| 规格 | 55mm × 600m |

这些是既有静态样本，不是批准图片中同一商品的真实记录。样本 provenance 仍为内部 `HISTORICAL_STATIC_SAMPLE`：旧站 `D:\Project\SealIndustry\SealIndustry\Resources\Views\Sample\trace.zh-hans.resx` 的 ProductName／Code／ProduceDate／Batch／Mode／Specifications；旧样本 Controller 只返回 View。P01 没有新增查询、网络请求或证据升级。

范围说明：“信息内容为独立示例，具体字段与读取方式需按应用确认。”“信息可查不等同于真伪判定。”

## 媒体与层级

批准的碳带 PNG/WebP 字节完全不变；已包装碳带带标签、裸卷不套用包装标签。PNG 原始 SHA256：`44ca33c566bed1b10cf1caf14a2c14ab92ab9333a8dd387b744194bf1e84faf7`。手机只作概念陪衬，烘焙的状态／验证区域由固定遮罩覆盖，始终不作为生产证明。

新增 reading__image 包住图片与遮罩，使两者共同移动。没有重新生成或修改图片几何。HTML 产品名称为主值，日期／批号为次层，字段标签与范围说明为辅助层。字体采用真实可变字重；C4 子集更新后 21,536 字节，没有新增应用依赖。

## 响应式验证

| 视口 | C4 高度 px | 布局 | 六字段／资源／溢出 |
|---|---:|---|---|
| 1440×900 | 1157.30 | 双列 | 完整／已加载／0 |
| 1024×900 | 968.39 | 双列 | 完整／已加载／0 |
| 820×1180 | 1606.70 | 自然重组 | 完整／已加载／0 |
| 430×932 | 1368.55 | 纵向 | 完整／已加载／0 |
| 390×844 | 1331.38 | 纵向 | 完整／已加载／0 |
| 320×740 | 1332.64 | 纵向 | 完整／已加载／0 |

另测 820×700 横屏。手机顺序：眉题、标题、导语、媒体、信息区、范围说明。没有复制语义内容、横向滚动或新增 sticky。1024 页尾完成状态单独真实复核。

1440 / 390 no-JS 与模拟 reduced 静态分支均完整可读，资源加载正常，无横向溢出。独立源码复核与脚本检查通过；不是全站回归或生产系统验证。

- [桌面](evidence-a8c-p01/1440x900-c4.webp)、[窄桌面最终状态](evidence-a8c-p01/1024x900-c4.webp)
- [平板](evidence-a8c-p01/820x1180-c4.webp)、[手机](evidence-a8c-p01/390x844-c4.webp)、[窄手机](evidence-a8c-p01/320x740-c4.webp)
- [视口数据](evidence-a8c-p01/viewport-measurements.json)、[静态分支](evidence-a8c-p01/fallback-measurements.json)、[源文件保护检查](evidence-a8c-p01/source-checks.json)

LOCAL_INTERACTIVE_TESTED / REMOTE_STATIC_REVIEW。视觉与文案最终接受仍由 PO 判断。
