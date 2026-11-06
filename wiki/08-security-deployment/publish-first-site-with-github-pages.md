---
title: 用 GitHub Pages 發布第一個網站：概念與快速入門
description: 依官方快速入門說明 GitHub Pages 的使用者網站與分支發布設定，區分舊教學及未涵蓋情境。
category: 08-security-deployment
tags:
  - 新手入門
created: '2026-11-05'
updated: '2026-11-05'
license: CC-BY-SA-4.0
sources:
  - id: SRC-0010
    title: Quickstart for GitHub Pages
    url: 'https://docs.github.com/en/pages/quickstart'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0011
    title: 將你的網站發佈上線
    url: >-
      https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website
    published: 未知
    accessed: '2026-11-05'
---

# 用 GitHub Pages 發布第一個網站：概念與快速入門

把檔案做好，與讓其他人在網路上看到它，是兩個階段。MDN 的發布篇介紹將網站內容放上網路供人瀏覽的概念；GitHub Pages 快速入門則提供一條建立 `username.github.io` 使用者網站的具體路線。[SRC-0011：開頭與有哪些選項？；SRC-0010：Introduction]

本篇採 **GitHub 官方快速入門的 README／Jekyll 路線**。它不是任意 HTML 專案、前端框架或伺服器應用的通用部署流程；也沒有教你建立 GitHub Actions 工作流程。本文只是知識教學，不會替目前知識庫發布網站。

## 開始前先分清楚

- 先能找到儲存庫及 README；還不熟悉時，閱讀[GitHub 入門](../06-project-management/github-first-repository.md)。
- 本次網站使用 `username.github.io` 名稱，`username` 要換成你的 GitHub 使用者名稱。[SRC-0010：Introduction、Creating your website]
- 可用方案與儲存庫可見性有條件。擷取時官方網頁說明 Free 的公開儲存庫可用 Pages，部分付費方案支援私人儲存庫；不能因此推論「任何私人儲存庫都能免費發布」。實際條件請在開始前核對[官方快速入門頁](https://docs.github.com/en/pages/quickstart)的 Who can use this feature?。這項提示來自同頁 HTML，原始 Markdown 本文不含方案區塊，來源索引另記此差異。[SRC-0010：同頁方案區塊]

介面依 2026-11-05 擷取快照整理，尚未在帳號中逐步實測。以下保留英文按鈕名稱方便對照，實際畫面不同時先看官方文件，不猜測替代步驟。

## 步驟一：建立使用者網站儲存庫

1. 在 GitHub 頁面右上角新增選單選 **New repository**。
2. 名稱填 `username.github.io`；例如使用者名稱是 `octocat`，就填 `octocat.github.io`。
3. 選擇儲存庫可見性；確認你的方案符合官方頁的使用條件。
4. 將 **Add README** 切換為 **On**。
5. 按 **Create repository**。[SRC-0010：Creating your website]

名稱中的 `username` 是替換用的文字，不是叫所有人建立相同名稱。建立儲存庫本身與完成下方發布來源設定也不能混為一談。

## 步驟二：設定 Pages 發布來源

1. 在儲存庫名稱下方開啟 **Settings**。若看不到該分頁，依官方文件從下拉選單找 **Settings**。
2. 在側邊欄 **Code, planning, and automation** 區域選 **Pages**。
3. 在 **Build and deployment → Source** 選 **Deploy from a branch**。
4. 在 **Branch** 選擇發布來源分支。[SRC-0010：Creating your website]

來源沒有在這個快速入門步驟中完整展開所有分支／資料夾選擇情境，本篇不自行指定對每個專案都正確的組合。若畫面要求額外設定而你不確定用途，先核對對應官方文件。

## 步驟三：查看內容與結果

這條快速入門可開啟 `README.md` 撰寫網站內容，也可暫時保留預設內容。接著瀏覽 `username.github.io` 查看結果；官方指出變更推送到 GitHub 後，發布最多可能需要約 10 分鐘。[SRC-0010：Creating your website]

這不等於「本機 Commit 後網站就立即更新」。本篇是 GitHub 文件中的分支發布情境，提交、推送與合併的差異可回看[GitHub 入門](../06-project-management/github-first-repository.md)。如果超過預期仍沒有結果，現有來源不足以診斷所有原因，不任意改設定或提供保證有效的修復方式。

## 想調整網站標題與說明？

官方快速入門以 `_config.yml` 調整標題與說明：到 **Code** 檢查是否存在此檔，不存在時建立，再加入 `title:` 與 `description:` 對應文字，編輯完成後按 **Commit changes**。[SRC-0010：Changing the title and description]

這是該文件的 Jekyll 設定情境，不能把 `_config.yml` 當成所有網站或前端框架的通用設定檔。本篇不擴寫自訂主題、建置工具或 Actions 的設定。

## 舊教學與常見誤會

**MDN 的發布篇可以直接照做嗎？** 它保留的舊流程偏向建立儲存庫與上傳檔案，沒有完整反映本篇官方快速入門的 Pages 發布來源設定。因此只採 MDN 的發布概念；實際步驟依 SRC-0010，不把兩份步驟任意拼接。MDN 中的舊服務推薦、泛稱免費及把 GitHub 程式碼概括為全部公開的說法不納入本篇。[SRC-0011；SRC-0010]

**這就是上傳自己的任意 HTML 網站嗎？** 這份快速入門是 README／Jekyll 使用者網站的起步路線。任意 HTML 網站、框架輸出、伺服器功能或自動部署需要其他依據，知識庫資料不足，不能直接套用或自行補寫。

**可以直接把所有檔案公開嗎？** 本指南建議先檢查要公開的內容、素材權利及帳號存取方式，再決定是否發布。這是編者的發布前檢查建議；可搭配[帳號安全檢查清單](github-account-security-checklist.md)，不是本篇已完成全面安全審核的保證。

## 相關知識

- [第一次做網站：從小型練習開始](../01-ai-development/first-website-learning-path.md)
- [GitHub 入門：儲存庫、分支與合併](../06-project-management/github-first-repository.md)
- [GitHub 帳號安全檢查清單](github-account-security-checklist.md)
- [返回專案首頁](../../README.md) · [公開來源與署名](../../REFERENCES.md)


## 參考來源與授權

- **SRC-0010｜Quickstart for GitHub Pages**：[官方頁面](https://docs.github.com/en/pages/quickstart)；[官方原文](https://docs.github.com/en/pages/quickstart)。發布日期未知；擷取日期 2026-11-05。GitHub；文件 CC BY 4.0。
- **SRC-0011｜將你的網站發佈上線**：[官方頁面](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website)；[官方原文](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Getting_started/Your_first_website/Publishing_your_website)。發布日期未知；擷取日期 2026-11-05。Mozilla Contributors；原文件 CC BY-SA 2.5 或更新版本。

本文為依來源重新整理的繁體中文教學；已標示的清單、需求例子及檢查建議為編者新增，非官方逐字內容。
MDN 內容署名 Mozilla Contributors，原標題與頁面連結如上；改動為重組、中文表述與加入標示的練習建議。本文依核准計畫以 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 提供；僅適用本篇，不改變其他知識庫文章或原始來源的授權。
