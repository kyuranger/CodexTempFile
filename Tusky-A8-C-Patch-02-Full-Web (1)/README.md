# Tusky Phoenix — A8-C Patch 02 Complete Website

This archive is the complete local prototype through Chapter 4. It includes current HTML/CSS/JS, all runtime images and fonts, approved source PNG media, and the Noto font license at assets/fonts/OFL.txt. Chapters 1–3 retain the accepted Patch 01 baseline. Chapter 4 is ready for review; its copy is not approved public copy and the scene is not a live query or production record.

## Portable localhost preview

1. Extract the entire archive into a new folder. Keep assets/ beside index.html.
2. With Node.js installed, open a terminal in that folder and run: node preview.cjs
3. Open http://127.0.0.1:8782/ in a browser. Scroll naturally through C2 → C3 → C4. Directly opening index.html from disk does not provide a reliable ES-module/motion preview.
4. Stop the server with Ctrl+C. If port 8782 is occupied, choose another with PORT (PowerShell: $env:PORT=8784; node preview.cjs / macOS or Linux: PORT=8784 node preview.cjs).

Windows users with Node.js on PATH may double-click Start-Preview.cmd. Python alternative: python -m http.server 8784 --bind 127.0.0.1 --directory . (or python3 on macOS/Linux), then visit http://127.0.0.1:8784/.

No install/build step, external font/CDN, original project path, production service, or internet connection is required to view this package after a runtime is installed. The archive intentionally excludes historical reviews, superseded result-screen media, and duplicate source aliases.

## Localization / provenance

The static page is zh-CN. Future locale architecture: /zh-cn/, /zh-tw/, /zh-hk/, /en/. Chapter 4 uses one shared language-neutral photograph and keyed semantic HTML, including alt text. These locale routes and a production translation engine are not implemented. Traditional Chinese / expanded English QA is layout testing, not translation approval.

SEAL RIBBON, SNE-303A, 30 mm × 600 m, Black (displayed as 黑色), and batch 2026032038S are transcriptions from the Owner-approved concept image's physical label. No synthetic production date or historical sample record is included. All approved source media stays in assets/; the new source PNG matches the supplied local file byte-for-byte.
