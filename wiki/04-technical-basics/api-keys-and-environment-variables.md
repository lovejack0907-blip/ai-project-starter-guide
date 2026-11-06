---
title: 需要串接外部服務時：API Key、環境變數與基本安全
description: 理解憑證與設定的差異，保護 API Key，並知道外洩時的處理順序。
category: 04-technical-basics
tags:
  - API Key
  - 環境變數
  - 安全
created: '2026-11-06'
updated: '2026-11-06'
sources:
  - id: SRC-0032
    title: Storing your secrets safely
    url: >-
      https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0033
    title: Secret leakage risks
    url: >-
      https://docs.github.com/en/code-security/concepts/secret-security/secret-leakage-risks
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0034
    title: API Overview — Authentication
    url: 'https://developers.openai.com/api/reference/overview#authentication'
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0035
    title: Using environment variables
    url: 'https://docs.astro.build/en/guides/environment-variables/'
    published: 未知
    accessed: '2026-11-06'
---

# 需要串接外部服務時：API Key、環境變數與基本安全

API Key 是用來驗證程式呼叫服務的憑證。環境變數則是提供給程式的命名設定值，可放公開設定，也可由受控的伺服器環境提供密鑰。兩者的安全性取決於誰能讀取、程式在哪裡執行，以及資料有沒有進入公開產物。[SRC-0032、SRC-0034、SRC-0035]

## 先確認金鑰由誰讀取

以 OpenAI API 為例，官方要求金鑰由伺服器環境變數或密鑰管理服務提供，避免出現在瀏覽器或應用程式的用戶端程式碼。若網站只有靜態檔案，可先用假資料驗收介面；需要用密鑰串接時，再規劃受控的伺服器端處理。[SRC-0034]

以 Astro 的 Vite 環境變數用法為例，`PUBLIC_` 開頭的變數可供用戶端使用，只適合能公開的設定。練習可把 `PUBLIC_SITE_NAME` 當作公開名稱，把 `SERVICE_API_KEY` 當作伺服器端使用的變數名稱。文件或範本可以示範名稱與假值，實際金鑰放在受控的執行環境。[SRC-0035]

## 提交前的安全檢查

1. 依專案規則排除含真值的本機設定檔，例如在 `.gitignore` 設定排除規則，並確認檔案目前沒有被追蹤。
2. 檢視待提交差異及建置輸出，確認沒有密鑰、帶憑證的請求標頭或包含真值的設定檔。
3. 分享錯誤截圖、日誌或交給 AI 分析前，先遮蔽憑證。能選權限時，讓憑證只具備任務需要的權限。[SRC-0032、SRC-0033]

## 發現金鑰已曝光時

先向發行服務撤銷或換發憑證，更新使用它的環境，接著查看活動和用量紀錄。只刪除目前檔案，Git 歷史或已產生的副本仍可能保留原值。處理歷史與副本時，依平台指引和團隊流程進行。[SRC-0032、SRC-0033]

## 相關知識

- [GitHub 入門：建立第一個儲存庫，練習分支與合併](../06-project-management/github-first-repository.md)
- [GitHub 帳號安全：新手檢查清單與官方入口](../08-security-deployment/github-account-security-checklist.md)
- [程式基礎：前端、後端、資料庫與 API](how-a-small-website-works.md)

## 參考來源

- SRC-0032 · [官方原文](https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely) · [Storing your secrets safely](https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely)
- SRC-0033 · [官方原文](https://docs.github.com/en/code-security/concepts/secret-security/secret-leakage-risks) · [Secret leakage risks](https://docs.github.com/en/code-security/concepts/secret-security/secret-leakage-risks)
- SRC-0034 · [官方原文](https://developers.openai.com/api/reference/overview#authentication) · [API Overview — Authentication](https://developers.openai.com/api/reference/overview#authentication)
- SRC-0035 · [官方原文](https://docs.astro.build/en/guides/environment-variables/) · [Using environment variables](https://docs.astro.build/en/guides/environment-variables/)

[公開來源與署名](../../REFERENCES.md)
