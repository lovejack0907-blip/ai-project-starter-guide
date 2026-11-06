---
title: 專案檔案、終端機與本機預覽
description: 用 VS Code 找到專案資料夾，在終端機啟動並預覽既有 Astro 網站。
category: 06-project-management
tags:
  - 開發環境
  - 終端機
  - 本機預覽
created: '2026-11-06'
updated: '2026-11-06'
sources:
  - id: SRC-0012
    title: Get started with Visual Studio Code
    url: 'https://code.visualstudio.com/docs/getstarted/overview'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0013
    title: Getting started with the terminal
    url: 'https://code.visualstudio.com/docs/terminal/getting-started'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0014
    title: 開發與建置
    url: 'https://docs.astro.build/zh-tw/develop-and-build/'
    published: 未知
    accessed: '2026-11-05'
---

# 專案檔案、終端機與本機預覽

打開網站專案時，你會在編輯器看見檔案，在終端機執行指令，再用瀏覽器看結果。先分清楚這三個地方，就比較不會把指令貼進網頁，或在另一個專案裡操作。

## 1. 找到專案資料夾

在 VS Code 選「檔案 → 開啟資料夾」，選取整個專案。左側的檔案總管（Explorer）會顯示裡面的檔案與子資料夾。最外層稱為專案根目錄。已有的 Astro 專案可先找包含 `package.json` 的資料夾，並讀 README 或詢問建立專案的人。若一個資料夾裡有多個專案，先確認自己要啟動哪一個。[SRC-0012：Open your code、Explore the main parts of VS Code；SRC-0014：編輯專案]

## 2. 打開終端機，確認所在位置

在 VS Code 選「終端機 → 新增終端機」。終端機是輸入指令、讀取輸出的介面；解讀指令的是 shell，例如 PowerShell。VS Code 的整合終端機通常從開啟的工作區開始，實際位置仍以提示字元或查詢結果為準。若使用 Windows PowerShell，可以輸入 `Get-Location` 查看目前位置。以下是編者建議：若位置不對，先重新開啟正確資料夾，再輸入啟動指令。[SRC-0013：Run your first command in the terminal、Run commands in another shell]

## 3. 在瀏覽器預覽

以已安裝依賴、且提供標準 Astro scripts 的專案為例。[SRC-0014：啟動 Astro 開發伺服器、建置並預覽網站]

1. 在專案資料夾的終端機依專案使用的工具執行 `npm run dev` 或 `pnpm dev`，選一種即可。
2. 打開終端機實際列出的本機網址，例如 `http://localhost:4321`。保留終端機運作，試著改一行文字、存檔並確認畫面。
3. 回到該終端機按 Ctrl+C 停止開發伺服器。
4. 要檢查建置版時，執行 `npm run build` 或 `pnpm build`，完成後再執行同一工具的 preview script（`npm run preview` 或 `pnpm preview`）。Astro 預設輸出到 `dist/`。preview 查看的是最近一次建置結果，改檔後需重新建置才能在該預覽看到變更。

## 常見卡關

- **找不到指令或 script**：先抄下完整錯誤，確認資料夾、README 與專案使用的工具。請 AI 解釋指令用途及適用環境，再決定下一步。
- **網址打不開**：先看終端機是否還在運作、有無錯誤，以及你打開的是不是它列出的網址。
- **看見改動就算完成嗎？** 開發預覽與建置預覽回答不同問題。若專案另有型別檢查或測試，分別執行並查看結果。以上是編者的排查建議；指令與適用範圍以專案設定為準。

## 相關知識

- [第一次做網站：從小型練習開始](../01-ai-development/first-website-learning-path.md)
- [GitHub 入門：建立第一個儲存庫，練習分支與合併](github-first-repository.md)
- [AI 程式錯誤排查與修正](../07-debugging-testing/debug-with-ai-step-by-step.md)

## 參考來源

- SRC-0012 · [Get started with Visual Studio Code](https://code.visualstudio.com/docs/getstarted/overview) · [官方原文](https://code.visualstudio.com/docs/getstarted/overview)
- SRC-0013 · [Getting started with the terminal](https://code.visualstudio.com/docs/terminal/getting-started) · [官方原文](https://code.visualstudio.com/docs/terminal/getting-started)
- SRC-0014 · [開發與建置](https://docs.astro.build/zh-tw/develop-and-build/) · [官方原文](https://docs.astro.build/zh-tw/develop-and-build/)

原始文件擷取於 2026-11-05。來源署名與授權見[公開來源與署名](../../REFERENCES.md)。
