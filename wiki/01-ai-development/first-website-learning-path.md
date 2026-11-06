---
title: 第一次做網站：從小型練習開始
description: 用一個簡單網頁認識規劃、內容、樣式、互動與發布，並找到 AI 工具的官方文件入口。
category: 01-ai-development
tags:
  - 新手入門
created: '2026-11-05'
updated: '2026-11-06'
license: CC-BY-SA-4.0
sources:
  - id: SRC-0007
    title: Web 入門
    url: >-
      https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0006
    title: GitHub Copilot documentation
    url: 'https://docs.github.com/en/copilot'
    published: 未知
    accessed: '2026-11-05'
---

# 第一次做網站：從小型練習開始

第一次做網站，先選一個能說清楚的小題目，例如介紹一項興趣。MDN 的 Web 入門建議從小地方開始，依序接觸規劃、檔案、內容、樣式、互動與發布，而不是一開始就做大型平台。[SRC-0007：替你的第一個網站說故事]

## 什麼時候適合讀這篇？

當你想做網站，卻還分不清該先學什麼，這篇提供一張路線圖。它不保證看完就能完成正式產品，也不是完整程式課程。使用 AI 協助時，可以把這些階段拿來描述需求與檢查成果；這是本指南的使用建議，不是 MDN 對 AI 效果的保證。

## 先認識網站的幾個部分

| 部分 | 可以先這樣理解 | 小型練習例子 |
| --- | --- | --- |
| 內容與 HTML | 安排內容的結構及意義。 | 標題、介紹段落、清單與圖片。 |
| 外觀與 CSS | 控制內容呈現的風格與位置。 | 字體、文字顏色、背景與版面。 |
| 互動與 JavaScript | 加入互動行為。 | 按鈕按下後改變內容。 |
| 檔案安排 | 將文字、程式碼與媒體組織成能互相配合的結構。 | 分清楚頁面檔案與圖片位置。 |
| 發布 | 將整理好的網站放上網路供人瀏覽。 | 完成練習後閱讀發布教學。 |

概念依據為 SRC-0007 對系列文章的介紹；右欄是依概念整理的練習例子。本篇沒有取得各子篇全文，因此不進一步補寫 HTML 語法、CSS 規則或 JavaScript 程式碼。

## 第一次可以怎麼開始？

以下是本指南依 MDN 路線整理的建議流程：

1. **定一個小題目**：先做一頁興趣介紹，不同時加入會員、購物與付款功能。
2. **先準備內容與草圖**：寫出標題、幾段介紹與預期圖片位置。詳見[網站規劃與草圖](../02-project-planning/plan-your-first-website.md)。
3. **讓內容先出現**：先確認頁面有要呈現的資訊，再逐步調整外觀。
4. **只加入需要的互動**：若目前沒有互動需求，可以先完成內容與樣式練習。
5. **逐項核對自己的目標**：例如標題是否正確、文字是否完整、圖片是否為你有權使用的素材。這是編者建議的檢查方式。
6. **最後才處理發布**：閱讀[GitHub Pages 快速入門](../08-security-deployment/publish-first-site-with-github-pages.md)，並注意該篇是官方 README／Jekyll 路線，不代表所有 HTML 或框架專案都能套用相同細節。

## 想請 AI 協助時，怎麼描述？

以下是本指南自訂的需求範例，不是官方產品指令：

```text
我想練習做一頁介紹登山興趣的網站。
內容需要標題、兩段介紹與一張我有使用權的圖片。
先不要加入登入、付款或公開發布。
請先說明檔案安排與製作步驟，讓我確認後再修改。
完成後告訴我如何檢查內容與外觀。
```

GitHub Copilot 文件首頁說明它可協助程式工作，並列出認識工具及開始使用的入口。[SRC-0006：首頁與 Getting started]

你可以從[Copilot 官方文件](https://docs.github.com/en/copilot)了解工具。這份來源是文件索引，本篇沒有據此比較工具好壞、保證免費、指定安裝方式，或宣稱不懂程式就不需檢查結果。Codex 與其他工具的完整比較仍屬知識庫資料不足。

## 常見問題

**一定要一次學完所有內容嗎？** 本指南建議先用小題目逐步練習；來源沒有提供通用的學習時數或零基礎成功率，不替你設定保證完成的期限。

**這篇就是「沒有程式基礎也能用 AI 開發」的完整答案嗎？** 不是。本篇聚焦第一個網站的學習路線與工具入口；AI 的能力、風險及分工仍需有對應來源支持，不能用工具首頁推論全部能力。

## 相關知識

- [程式基礎：前端、後端、資料庫與 API](../04-technical-basics/how-a-small-website-works.md)
- [專案檔案、終端機與本機預覽](../06-project-management/project-files-terminal-and-preview.md)
- [如何驗收 AI 製作的網站功能](../07-debugging-testing/test-and-accept-website-features.md)
- [做網站前先想清楚：目的、內容與草圖](../02-project-planning/plan-your-first-website.md)
- [用 GitHub Pages 發布第一個網站](../08-security-deployment/publish-first-site-with-github-pages.md)
- [返回專案首頁](../../README.md) · [公開來源與署名](../../REFERENCES.md)


## 參考來源與授權

- **SRC-0007｜Web 入門**：[官方頁面](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website)；[官方原文](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website)。發布日期未知；擷取日期 2026-11-05。Mozilla Contributors；原文件 CC BY-SA 2.5 或更新版本。
- **SRC-0006｜GitHub Copilot documentation**：[官方頁面](https://docs.github.com/en/copilot)；[官方原文](https://docs.github.com/en/copilot)。發布日期未知；擷取日期 2026-11-05。GitHub；文件 CC BY 4.0。

本文為依來源重新整理的繁體中文教學；已標示的清單、需求例子及檢查建議為編者新增，非官方逐字內容。
MDN 內容署名 Mozilla Contributors，原標題與頁面連結如上；改動為重組、中文表述與加入標示的練習建議。本文依核准計畫以 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 提供；僅適用本篇，不改變其他知識庫文章或原始來源的授權。
