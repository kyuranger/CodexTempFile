# 凰牙 P05 完整网页包

本包是 Phase 2D-A7-B Patch 05 的完整可运行网页。无需原项目目录，也无需另找图片或字体；可直接上传本ZIP给ChatGPT评审。

包含：当前index.html、CSS/JavaScript、整个assets目录（Hero、批准的A/B/C原始PNG和WebP、历史同图别名）、两份字体和字体许可、preview.py及校验清单。素材不变，代码与P05实际预览一致。

## 预览

1. 解压整个ZIP，保留assets目录结构。
2. 使用Python 3，在解压目录运行：`python preview.py`。
3. 浏览器打开 http://127.0.0.1:8768/ 。按Ctrl+C停止服务。

如果端口占用，运行 `python preview.py --port 8870`，再打开 http://127.0.0.1:8870/ 。预览助手只使用Python标准库。

请通过HTTP预览完整动效。直接双击index.html使用file协议可能阻止JavaScript模块加载，此时只显示完整静态内容，不能用于判断动效是否正常。系统开启“减少动态效果”时，静态完整模式是预期行为。

## 版本与评审边界

P05为REVIEW_READY，待Product Owner接受。包含Hero、C2生命周期故事和C3标识/载体故事；没有Chapter4。C2保留原生滚动、累计关系和回撤；Desktop 100svh、Tablet 95svh、Mobile 86svh舞台。图片属于已批准AI概念媒体，不是产品能力或真实使用证据。

PACKAGE-CONTENTS.json提供除自身以外全部文件的字节数和SHA-256。网页实现未因本次打包改变；没有提交或推送。
