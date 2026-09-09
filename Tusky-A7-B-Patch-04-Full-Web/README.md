# P04 完整网页源文件

本包包含当前完整 Hero → Chapter 2 → Chapter 3 网页、CSS、JavaScript，以及页面使用的全部图片和字体。

图片包含：Hero 批准图；批准 Image A（C2桌面）、Image B（C2手机）、Image C（C3）的原始PNG及页面使用的WebP。字体包含Hero/C2/C3使用的两份WOFF2及OFL许可证。图片未重新生成或重绘。

## 预览

安装Python 3的环境中，在解压目录运行：

    python preview.py

浏览器打开终端显示的 http://127.0.0.1:8768/ 。也可使用任何支持静态文件的本地HTTP服务器。
需要更换端口时运行：

    python preview.py --port 8870

请通过HTTP预览完整滚动交互。直接双击index.html时，浏览器可能限制JavaScript模块加载；这不是素材缺失。

## 供ChatGPT评审

可直接上传本ZIP。index.html是完整页面结构，assets内是实际引用的媒体、字体、CSS与JS。原型源码、图片和字体与已交付P04保持字节一致。PACKAGE-CONTENTS.json记录全部文件的SHA-256。

当前为PHASE_2D_A7_B_P04_REVIEW_READY，等待Owner评审；本轮仅补齐交付文件，没有修改网页实现，也未commit/push。
