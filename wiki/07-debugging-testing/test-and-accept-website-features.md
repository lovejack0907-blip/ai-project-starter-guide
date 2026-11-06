---
title: 如何驗收 AI 製作的網站功能
description: 用操作和預期結果建立人工驗收表，了解何時適合自動化測試。
category: 07-debugging-testing
tags:
  - 驗收
  - 網站測試
  - Playwright
created: '2026-11-06'
updated: '2026-11-06'
sources:
  - id: SRC-0017
    title: Writing tests
    url: 'https://playwright.dev/docs/writing-tests'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0018
    title: Assertions
    url: 'https://playwright.dev/docs/test-assertions'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0015
    title: Prompt engineering for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
    published: 未知
    accessed: '2026-11-05'
---

# 如何驗收 AI 製作的網站功能

驗收就是用實際操作確認功能是否符合原先約定。開始前先把「可以用」改寫成你能在畫面上判斷的結果。

## 1. 寫出操作和預期結果

Playwright 的官方文件以操作（例如點按鈕）與斷言（檢查結果是否符合條件）組成測試。人工驗收也可借用這個結構。下表是編者示例，假設網站需求是搜尋活動清單，且規定查不到時會顯示提示。[SRC-0017：Actions、Assertions；SRC-0018：Auto-retrying assertions]

| 情境 | 如何操作 | 預期看到什麼 | 實際結果 |
| --- | --- | --- | --- |
| 找得到活動 | 搜尋已知活動「讀書會」 | 清單顯示讀書會 | 操作後填寫 |
| 找不到活動 | 搜尋測試資料中沒有的文字 | 出現「找不到活動」提示 | 操作後填寫 |
| 重新開始 | 清除搜尋文字 | 清單恢復到需求定義的初始狀態 | 操作後填寫 |

## 2. 用一致的起點實際操作

1. 先確認你正在看的版本、網址與測試資料。
2. 每個案例從約定的起點開始，避免上一個操作留下的搜尋字串影響下一個結果。這是借用 Playwright 測試隔離概念的人工做法。[SRC-0017：Test isolation]
3. 依表操作，記下實際結果及通過、失敗或未測。如果畫面需要等待資料，依需求定義判斷最終狀態，並記下異常等待。
4. 修正後重跑失敗案例，再確認附近原本通過的功能。編者建議在回報中附上操作、預期與實際差異。

## 3. 什麼時候考慮自動化？

若常重複驗收同一流程，可以請 AI 依這份案例寫 Playwright 測試。Playwright 能操作頁面並檢查文字、顯示狀態或網址。一些網頁斷言會等待條件成立或逾時，並非所有斷言都會重試。先檢視它是否真的測到需求，再看實際執行結果。[SRC-0017：Actions、Assertions；SRC-0018：Auto-retrying assertions、Non-retrying assertions]

一個案例通過只表示當次條件符合。編者建議依實測範圍回報，將未測裝置、功能、安全及效能項目分開記錄。

## 相關知識

- [沒有程式基礎，也能利用 AI 開發專案嗎？](../01-ai-development/ai-development-without-coding-background.md)
- [第一次做網站：從小型練習開始](../01-ai-development/first-website-learning-path.md)
- [做網站前先想清楚：目的、內容與草圖](../02-project-planning/plan-your-first-website.md)
- [如何描述需求並拆分 AI 開發任務](../05-ai-collaboration/describe-and-split-ai-tasks.md)
- [AI 程式錯誤排查與修正](debug-with-ai-step-by-step.md)

## 參考來源

- SRC-0017 · [Writing tests](https://playwright.dev/docs/writing-tests) · [官方原文](https://playwright.dev/docs/writing-tests)
- SRC-0018 · [Assertions](https://playwright.dev/docs/test-assertions) · [官方原文](https://playwright.dev/docs/test-assertions)
- SRC-0015 · [Prompt engineering for GitHub Copilot](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering) · [官方原文](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering)

原始文件擷取於 2026-11-05。來源署名與授權見[公開來源與署名](../../REFERENCES.md)。
