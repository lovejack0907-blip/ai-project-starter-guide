---
title: 程式基礎：前端、後端、資料庫與 API
description: 從活動網站範例理解瀏覽器、伺服器、資料保存和 API 如何配合。
category: 04-technical-basics
tags:
  - 前端
  - 後端
  - 資料庫
  - API
created: '2026-11-06'
updated: '2026-11-06'
license: CC BY-SA 4.0
sources:
  - id: SRC-0025
    title: Getting started modules
    url: >-
      https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0026
    title: How the web works
    url: >-
      https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0027
    title: Server-side website programming
    url: >-
      https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0028
    title: Client-side web APIs
    url: >-
      https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0007
    title: Web 入門
    url: >-
      https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website
    published: 未知
    accessed: '2026-11-06'
---

# 程式基礎：前端、後端、資料庫與 API

打開網頁時，瀏覽器通常會向伺服器請求資料，收到回應後再顯示內容。HTTP 是用來描述這類請求與回應的協定。理解這段流程，就能開始判斷問題發生在哪一層。[SRC-0026]

| 名詞 | 在小網站裡負責什麼 |
| --- | --- |
| 前端 | 使用者看到和操作的介面。HTML 提供內容結構，CSS 負責樣式，JavaScript 可加入互動。[SRC-0007、SRC-0025] |
| 後端 | 伺服器端的程式，依需要處理輸入、檢查權限、讀寫資料並產生回應。[SRC-0027] |
| 資料庫 | 保存可供日後查詢的資料，例如活動報名記錄。後端可依規則查詢或寫入。[SRC-0027] |
| API | 程式使用某項功能或資料的介面。瀏覽器本身提供 API，外部服務也能提供自己的 API。[SRC-0028] |

## 比較兩種活動網站

一個活動公告頁只展示固定日期、地點和聯絡資訊，可以由伺服器直接提供既有靜態檔案。若改成多人報名，並希望管理者隔天查得到記錄，典型做法是由前端送出報名資料，後端檢查後寫入資料庫，再把處理結果回給前端。這是編者整理的例子，實際架構依需求決定。[SRC-0026、SRC-0027]

API 可能用在這條路線的不同位置。例如，頁面可以使用瀏覽器 API 讀取操作事件，也可以透過網路請求向服務取得資料。某些外部服務需要憑證，呼叫位置應依服務文件和密鑰管理規則判斷。[SRC-0028]

## 和 AI 一起釐清需求

先問「資料重新整理後要不要保留？其他人要不要看到？誰能改？」再請 AI 說明每筆資料從畫面送到哪裡、在哪裡驗證、如何證明保存成功。測試時可以重新整理，或從另一個允許的瀏覽器工作階段查詢，確認成功提示和實際保存狀態一致。

## 相關知識

- [第一次做網站：從小型練習開始](../01-ai-development/first-website-learning-path.md)
- [需要串接外部服務時：API Key、環境變數與基本安全](api-keys-and-environment-variables.md)

## 參考來源

- SRC-0025 · [官方原文](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started) · [Getting started modules](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started)
- SRC-0026 · [官方原文](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works) · [How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
- SRC-0027 · [官方原文](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side) · [Server-side website programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side)
- SRC-0028 · [官方原文](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs) · [Client-side web APIs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs)
- SRC-0007 · [官方原文](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website) · [Web 入門](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website)

本文由編者改寫與增補範例。MDN 原文署名 Mozilla Contributors，依原文 CC BY-SA 2.5 或更新版本重用。本篇採 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)。

[公開來源與署名](../../REFERENCES.md)
