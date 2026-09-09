# 凰牙 P06 完整网页包

这是当前P06可独立运行的完整网站，包含HTML/CSS/JS、Hero及批准的A/B/C（PNG原图与WebP运行图，共7个图片文件）、两份字体、字体许可、预览助手与文件校验清单。素材和源码均在包内，无需访问原项目目录。可以直接上传本ZIP供ChatGPT检查源码和素材。

## 本地交互预览

解压完整ZIP，保持assets目录结构。使用Python 3运行 `python preview.py`，浏览器打开 http://127.0.0.1:8768/ 。端口被占用时可运行 `python preview.py --port 8870` 再打开对应端口。助手仅用标准库、只监听127.0.0.1；按Ctrl+C停止。

LOCAL_INTERACTIVE_TESTED：实际网站的scroll、sticky、动画和响应式以HTTP预览为准。直接双击index.html的file协议可能阻止module导入；开启系统reduced-motion时完整静态布局是预期行为。

## 远程评审

GitHub repository/tree/blob只展示源码，不能执行网站动效。ChatGPT的REMOTE_STATIC_REVIEW使用本包源码/素材及另交付的P06 Delta Review（diff、截图、QA、带标注节奏图和两段短WebM）。WebM是实际运行录像，不能代替交互预览。

## 当前状态

P06 REVIEW_READY，仍待Product Owner接受。Hero首屏内包含上下空隙；C2新增早期同画面空间展开，既有累计关系和回撤保持；C3保留完整六条路线并增加内部上下呼吸。没有Chapter4、产品claim提升或媒体生成。PACKAGE-CONTENTS.json列出全部其他文件的大小与SHA-256。未commit或push。
