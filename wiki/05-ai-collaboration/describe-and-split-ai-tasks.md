---
title: 如何描述需求並拆分 AI 開發任務
description: 用需求模板寫清目標、限制與驗收條件，將網站工作拆成可確認的小步。
category: 05-ai-collaboration
tags:
  - AI 協作
  - 需求描述
  - 任務拆分
created: '2026-11-06'
updated: '2026-11-06'
sources:
  - id: SRC-0015
    title: Prompt engineering for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0016
    title: Optimizing your AI usage to maximize efficiency and reduce cost
    url: 'https://docs.github.com/en/copilot/tutorials/optimize-ai-usage'
    published: 未知
    accessed: '2026-11-05'
---

# 如何描述需求並拆分 AI 開發任務

把「幫我做一個好看的網站」交給 AI，它還需要猜使用者、功能和完成標準。先寫清楚這些條件，再把工作拆成一項一項能驗收的任務。

## 1. 把想法寫成需求

GitHub 的 Copilot 提示文件建議從整體目標收斂到具體要求，給範例與相關上下文，並拆開複雜任務。下一段是編者模板，可用來組織材料。[SRC-0015：Start general, then get specific、Give examples、Break complex tasks into simpler tasks、Provide relevant context]

- **目標與讀者**：做一個社團活動頁，讓第一次來的人找到時間與地點。
- **現況與材料**：已有首頁和活動文字。提供相關檔案名稱與目前畫面。
- **範圍與限制**：這次只做首頁的活動資訊和跳轉。沿用既有樣式。
- **驗收條件**：點「查看活動」會跳到活動區。區塊顯示日期與地點。
- **停下時機**：需要改其他頁面或缺少資料時，先列出問題和影響。

## 2. 拆成能獨立確認的小步

先請 AI 說明它對需求的理解並提出計畫，再逐項實作。GitHub 的最佳化文件也建議定義目標、上下文及限制，安排規劃與執行，並使用明確的驗證條件。下表是編者示例。[SRC-0016：Provide clear guidance in your prompts、Research, plan, then implement、Add deterministic guardrails]

| 任務 | 一個可驗收結果 |
| --- | --- |
| 顯示活動資訊 | 頁面上看得到指定的日期與地點 |
| 加入跳轉按鈕 | 點按鈕後可以看到活動區 |
| 檢查小螢幕呈現 | 用窄視窗操作，文字與按鈕仍可讀、可點 |

一次交付一項，請 AI 回報改了哪些檔案、做了什麼檢查、哪些還需要你試。先自己操作，再決定是否進入下一項。Copilot 文件提醒應檢視產出，並在結果不符時補充上下文、修正提示再試。[SRC-0015：Experiment and iterate、Review Copilot's output]

## 常見卡關

- **描述到什麼程度才夠？** 編者建議以另一個人能照條件判斷「完成」為起點。若重要細節仍有歧義，先要求列出待澄清事項。
- **AI 提議順便重做整個網站？** 回到本次範圍，請它指出目前工作需要的最小修改與驗證方式。

## 相關知識

- [ChatGPT、Codex、Claude Code、Cursor：初學者怎麼選起步方式？](../03-ai-tools/choose-an-ai-development-workflow.md)
- [沒有程式基礎，也能利用 AI 開發專案嗎？](../01-ai-development/ai-development-without-coding-background.md)
- [做網站前先想清楚：目的、內容與草圖](../02-project-planning/plan-your-first-website.md)
- [如何驗收 AI 製作的網站功能](../07-debugging-testing/test-and-accept-website-features.md)
- [AI 程式錯誤排查與修正](../07-debugging-testing/debug-with-ai-step-by-step.md)

## 參考來源

- SRC-0015 · [Prompt engineering for GitHub Copilot](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering) · [官方原文](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering)
- SRC-0016 · [Optimizing your AI usage to maximize efficiency and reduce cost](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage) · [官方原文](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage)

原始文件擷取於 2026-11-05。來源署名與授權見[公開來源與署名](../../REFERENCES.md)。
