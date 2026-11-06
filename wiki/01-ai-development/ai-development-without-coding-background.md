---
title: 沒有程式基礎，也能利用 AI 開發專案嗎？
description: 從小型練習開始，了解 AI 能協助的開發工作、人與 AI 的分工，以及必須保留的檢查責任。
category: 01-ai-development
tags:
  - AI 輔助開發
  - 新手入門
  - AI 協作
created: '2026-11-05'
updated: '2026-11-06'
sources:
  - id: SRC-0003
    title: Prompting
    url: 'https://learn.chatgpt.com/docs/prompting'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0004
    title: Overview
    url: 'https://code.claude.com/docs/en/overview'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0005
    title: 'Application card: GitHub Copilot Agents'
    url: 'https://docs.github.com/en/copilot/responsible-use/agents'
    published: 未知
    accessed: '2026-11-05'
---

# 沒有程式基礎，也能利用 AI 開發專案嗎？

**可以從小型練習開始嘗試，但不能把 AI 當成保證完成、完全不用理解或檢查的工具。** 這是本指南根據官方能力說明與風險文件整理的起步建議，不是官方對零經驗使用者成功率的承諾。

Claude Code 文件示範用一般語言描述需求，讓工具規劃、修改程式與檢查；OpenAI 的 Codex 提示文件則要求說清楚預期行為、相關材料、限制與驗證方式。GitHub 也提醒，Copilot 產生的程式可能不正確或不安全，需要檢視與測試。[SRC-0004：Build features and fix bugs；SRC-0003：Prompting Codex；SRC-0005：7. Limitations]

## 1. AI 輔助開發是什麼？

本篇用「AI 輔助開發」描述這種工作方式：你提出要解決的問題、提供專案材料，讓 AI 協助理解、修改與檢查程式，再依結果繼續調整。這是為本指南整理的說法，不是對所有產品的統一定義。

本篇來源中的 Codex、Claude Code、Copilot 代理功能，都涉及程式開發工作；各自的功能、執行環境與權限仍不同。不要把它們的專屬能力，自動套用到任何一般聊天工具。[SRC-0003：Prompting Codex；SRC-0004：Overview；SRC-0005：1. Overview]

## 2. 沒有程式基礎，可以先嘗試什麼？

本指南建議先挑一個容易描述、容易檢查的小目標，例如：

- 一頁興趣介紹：列出要呈現的標題、文字與圖片位置。
- 一個簡單互動：按鈕按下後，顯示你事先寫好的說明。
- 一項既有頁面調整：修改某段文字或一個區塊的排列。

這些是**編者建議的練習題目**，不是供應商保證可完成的任務清單。官方文件支持自然語言提出開發任務及修改程式的工作方式，但沒有提供「完全零基礎的人都能獨立完成正式網站或應用」的證據。[SRC-0003：Prompting Codex；SRC-0004：Build features and fix bugs]

本篇不提供通用的完成時數、成功率或工具排名。能否完成你的專案，仍要依實際需求、工具條件及驗證結果判斷。

## 3. AI 在開發過程中能幫哪些忙？

| 工作 | 可以怎麼交代 | 官方依據及界線 |
| --- | --- | --- |
| 理解既有程式 | 請說明指定檔案做什麼、彼此如何配合。 | SRC-0003 的 Explain a codebase 範例；說明仍需核對。 |
| 製作或調整功能 | 描述希望出現的行為與不能改動的部分。 | SRC-0004 的 Build features and fix bugs；不是每項需求都保證成功。 |
| 排除問題 | 提供錯誤訊息、重現步驟與預期結果。 | SRC-0003 的 Fix a bug、SRC-0004 的修錯說明。 |
| 協助測試 | 說明要驗證什麼，請回報執行方式與結果。 | SRC-0003 的 Write a test；測試通過不代表所有問題都不存在。 |

表中的交代方式是本指南的表達建議；功能依據限於所列產品文件，不代表每個 AI 工具都具有相同能力。若工具只能回覆文字，也不能據此宣稱它已經修改你的專案或實際執行測試。

## 4. 使用者與 AI 應該如何分工？

OpenAI 文件建議在提示中交代想要的行為、相關程式或重現方式、重要限制，以及如何驗證修改。可以把它整理成四個問題：[SRC-0003：Prompting Codex]

1. **要做什麼？** 具體描述希望出現的結果。
2. **依據在哪裡？** 提供相關檔案、畫面或問題步驟。
3. **哪些不能動？** 說清楚保留內容與操作邊界。
4. **怎樣才算完成？** 列出可以實際檢查的條件。

AI 可協助實作與解釋；你仍需檢視結果。GitHub 明確提醒應檢查及測試產生的程式，不能只因 AI 提供了答案，就當作已通過審核。[SRC-0005：7. Limitations]

對看不懂的變更，本指南建議先請 AI 用簡單文字說明；若涉及你無法判斷的安全或重要資料風險，再請有能力的人協助審查。後者是編者建議，不是把另一個 AI 回答當成獨立專業保證。

## 5. 限制與風險：看起來完成，不等於已驗證

GitHub 的 Copilot 代理功能文件列出：可能漏掉問題、提出不存在的問題，或產生外觀合理但實際不正確、不符合需求或有安全弱點的程式。這些是該產品文件記錄的限制；不能直接把每項細節當成所有工具的完整規格。[SRC-0005：7. Limitations]

本指南因此建議保留以下做法：

- 請 AI 分清楚「實際做過的檢查」與「建議你自己測的項目」。
- 依自己的需求清單操作一次，不只看 AI 的完成摘要。
- 沒有驗證的重要行為，先記為未驗證；不要用「應該可以」當通過。
- 未經你決定，不把練習自動擴大成公開發布、付款或處理重要資料的專案。

這些是編者整理的風險控制建議。本篇不提供完整安全審核流程，也不保證採取它們就沒有風險。

## 6. 新手先了解哪些基本概念？

本篇先用工作情境理解三個詞，不要求背誦大量術語：

| 概念 | 在這個練習中的意思 |
| --- | --- |
| 提示／需求描述 | 告訴 AI 希望做什麼、保留什麼，以及如何檢查。 |
| 上下文 | 這次任務需要的相關材料，例如指定檔案與重現步驟。 |
| 測試／驗收 | 實際檢查行為是否符合你列出的條件，並區分已測與未測。 |

這是依 SRC-0003 的任務、材料與驗證要求整理的入門解釋，不是完整技術定義。

另一個值得逐步理解的是版本管理：如何記錄變更、在分支中修改、檢查差異再合併，可直接閱讀[GitHub 入門：建立第一個儲存庫，練習分支與合併](../06-project-management/github-first-repository.md)。該文以 SRC-0001、SRC-0002 說明相關概念；本篇不重複撰寫 Git 操作教學。

## 7. 第一次使用 AI 開發專案，建議如何開始？

以下是**本指南依來源整理的建議流程**，不是任何產品的官方安裝步驟：

1. 選一個小目標，例如前面的單頁介紹。
2. 寫出必要內容、暫不處理的事與驗收條件。
3. 先請 AI 提出方案，確認它理解你的範圍。
4. 一次完成一小部分，查看實際結果再往下做。
5. 出錯時提供重現步驟、錯誤訊息與預期行為，再請 AI 修正。
6. 檢查變更與實際測試結果，需要版本紀錄時依既有 GitHub 教學練習。

這個流程的提示與驗證方向依 SRC-0003，實作與修錯能力依 SRC-0004，檢視及測試的必要性依 SRC-0005；步驟安排與練習難度是編者建議。

### 可直接改寫的需求模板

以下為本指南自訂範例，不是官方原文，也不是要求目前 Codex 真的製作網站：

```text
我想做什麼：一頁介紹我的攝影興趣。
給誰看：想了解我作品的朋友。
必要內容：標題、兩段介紹，以及我有使用權的圖片。
這次先不做：會員、付款、公開發布。
怎麼確認完成：文字完整、排列符合草圖；若有按鈕，行為符合說明。
請先提出製作方案，讓我確認後再修改檔案。
完成後列出改了什麼、實際測了什麼，以及尚未驗證的項目。
```

## 8. 常見問題與相關知識

**一定要先學完一門程式語言嗎？** 這些來源示範可用一般語言提出開發任務，但沒有建立適用所有人的學習門檻。知識庫資料不足以替你下「完全不用學」或「必須先學完」的定論；本指南建議邊做小練習、邊理解需要的概念。

**AI 說完成，就可以直接發布嗎？** 不能把這句話當作檢查證據。先核對實際驗證結果；GitHub 文件仍要求檢視與測試產出。[SRC-0005：7. Limitations] 是否發布應另行決定，本文沒有替你執行發布。

**ChatGPT、Codex、Claude、Claude Code、Copilot、Cursor 都一樣嗎？** 本篇沒有足夠來源提供完整比較。來源中的專屬開發工具能力不能自動套用至一般聊天產品；Cursor 的詳細功能、價格與適用性未在本篇核對，不做推薦排名。

**為什麼還要理解基本概念？** 本指南建議把基本理解用在描述需求、判斷變更及檢查結果，避免只能等待 AI 宣稱完成；這是依本篇分工與驗證要求整理的學習建議，不是成效研究結論。

- [如何描述需求並拆分 AI 開發任務](../05-ai-collaboration/describe-and-split-ai-tasks.md)
- [如何驗收 AI 製作的網站功能](../07-debugging-testing/test-and-accept-website-features.md)
- [AI 程式錯誤排查與修正](../07-debugging-testing/debug-with-ai-step-by-step.md)
- [ChatGPT、Codex、Claude Code、Cursor：初學者怎麼選起步方式？](../03-ai-tools/choose-an-ai-development-workflow.md)
- [GitHub 入門：儲存庫、分支、Commit 與合併](../06-project-management/github-first-repository.md)
- [返回專案首頁](../../README.md) · [公開來源與署名](../../REFERENCES.md)

## 參考來源與保存限制

- **SRC-0003｜OpenAI — Prompting**：[官方文件](https://learn.chatgpt.com/docs/prompting)；[官方原文](https://learn.chatgpt.com/docs/prompting)。依據章節：Prompting Codex、Explain a codebase、Fix a bug、Write a test。
- **SRC-0004｜Anthropic — Claude Code Overview**：[官方文件](https://code.claude.com/docs/en/overview)；[官方原文](https://code.claude.com/docs/en/overview)。依據章節：Overview、What you can do、Build features and fix bugs。
- **SRC-0005｜GitHub — Application card: GitHub Copilot Agents**：[官方文件](https://docs.github.com/en/copilot/responsible-use/agents)；[官方原文](https://docs.github.com/en/copilot/responsible-use/agents)。依據章節：Overview、7. Limitations。

三份來源個別作者及發布日期未知；摘錄擷取日期與本次原頁核對日期皆為 2026-11-05。本地只保存短原文，不是完整離線文件；未包含的依據以原始網址及上述章節定位追溯。本篇重新整理相關概念，不大段複製原文，也不宣稱取得完整原文重製或各產品功能全面驗證的授權。官方說法與編者例子、流程、建議已分開標示。
