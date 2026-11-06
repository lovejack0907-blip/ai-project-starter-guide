---
title: AI 程式錯誤排查與修正
description: 重現問題、從瀏覽器收集線索，與 AI 合作修正並重新驗收。
category: 07-debugging-testing
tags:
  - 錯誤排查
  - Chrome DevTools
  - 網站測試
created: '2026-11-06'
updated: '2026-11-06'
sources:
  - id: SRC-0019
    title: Run JavaScript in the Console
    url: 'https://developer.chrome.com/docs/devtools/console/javascript'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0020
    title: 'Network panel: Analyze network load and resources'
    url: 'https://developer.chrome.com/docs/devtools/network/overview/'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0021
    title: Core editor features
    url: 'https://code.visualstudio.com/docs/editing/getting-started/overview'
    published: 未知
    accessed: '2026-11-05'
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

# AI 程式錯誤排查與修正

網站出錯時，先找出可以重現的步驟，再請 AI 根據證據提出小範圍修正。以下是編者整理的排查順序。

## 1. 記錄怎麼重現

先保留畫面與錯誤訊息。記下網址或頁面、使用的版本、點了什麼、預期和實際結果。若問題不是每次發生，也把頻率記下來。從相同起點再試一次，看看能否重現。

## 2. 用瀏覽器工具觀察證據

- **Console（主控台）**：在 Chrome DevTools 選 Console，查看重現時有沒有相關訊息。指定官方頁主要介紹 Console 的 JavaScript 執行環境及如何開啟。初學者排查時先讀現有訊息，勿貼上來路不明的程式碼。[SRC-0019：Overview、Set up DevTools]
- **Network（網路）**：先開啟 Network，再重新載入頁面或操作以重現。此面板能記錄請求並查看請求清單及詳情。若某筆請求和問題時間吻合，先記下必要線索，再請 AI 說明可能關係。單一請求的畫面不足以證明根因。[SRC-0020：Record network activity、Inspect network requests]
- **編輯器**：回到 VS Code 找出相關檔案並檢視 AI 的修改。若專案使用版本控制，可在編輯器檢視檔案差異，核對是否符合預期範圍。若無法判斷改動是否合理，先要求解釋，不要同時套用多個猜測。[SRC-0021：Manage source control]

分享前先遮蔽帳密、金鑰、Cookie、個資及敏感請求內容。以下是編者提供的問題描述範例。

> 在活動頁搜尋「讀書會」後，預期顯示一筆活動，實際一直顯示載入中。步驟是開啟活動頁、輸入文字、點搜尋。我已提供去識別化的錯誤訊息。請先列出已知事實、還缺的證據、最小修正計畫及驗證步驟。

## 3. 一次修一件事，再重跑驗收

請 AI 分開說明觀察到的證據和推測、列出打算修改的檔案及預期結果。先核對範圍，再請它實作一個小改動。用原步驟重試，也測附近原本正常的功能。如果結果仍不符，把新增證據和已試方法記下來。這是依明確上下文、拆解任務與檢視產出整理的編者流程。[SRC-0015：Break complex tasks into simpler tasks、Provide relevant context、Review Copilot's output；SRC-0016：Provide clear guidance in your prompts、Add deterministic guardrails]

## 相關知識

- [沒有程式基礎，也能利用 AI 開發專案嗎？](../01-ai-development/ai-development-without-coding-background.md)
- [專案檔案、終端機與本機預覽](../06-project-management/project-files-terminal-and-preview.md)
- [如何描述需求並拆分 AI 開發任務](../05-ai-collaboration/describe-and-split-ai-tasks.md)
- [如何驗收 AI 製作的網站功能](test-and-accept-website-features.md)

## 參考來源

- SRC-0019 · [Run JavaScript in the Console](https://developer.chrome.com/docs/devtools/console/javascript) · [官方原文](https://developer.chrome.com/docs/devtools/console/javascript)
- SRC-0020 · [Network panel: Analyze network load and resources](https://developer.chrome.com/docs/devtools/network/overview/) · [官方原文](https://developer.chrome.com/docs/devtools/network/overview/)
- SRC-0021 · [Core editor features](https://code.visualstudio.com/docs/editing/getting-started/overview) · [官方原文](https://code.visualstudio.com/docs/editing/getting-started/overview)
- SRC-0015 · [Prompt engineering for GitHub Copilot](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering) · [官方原文](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering)
- SRC-0016 · [Optimizing your AI usage to maximize efficiency and reduce cost](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage) · [官方原文](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage)

原始文件擷取於 2026-11-05。來源署名與授權見[公開來源與署名](../../REFERENCES.md)。
