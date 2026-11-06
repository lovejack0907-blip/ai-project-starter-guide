---
title: GitHub 入門：建立第一個儲存庫，練習分支與合併
description: 用 README 練習 GitHub 的分支、Commit 與合併，再認識本機儲存庫與同步。
category: 06-project-management
tags:
  - GitHub
  - 版本管理
  - 新手入門
created: '2026-11-05'
updated: '2026-11-06'
sources:
  - id: SRC-0001
    title: Hello World
    url: 'https://docs.github.com/en/get-started/using-github/hello-world'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0002
    title: 1.3 Getting Started - What is Git?
    url: 'https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F'
    published: 未知
    accessed: '2026-11-05'
  - id: SRC-0029
    title: About Git
    url: 'https://docs.github.com/en/get-started/using-git/about-git'
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0030
    title: About repositories
    url: >-
      https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories
    published: 未知
    accessed: '2026-11-06'
  - id: SRC-0031
    title: Getting started with GitHub Desktop
    url: >-
      https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop
    published: 未知
    accessed: '2026-11-06'
---

# GitHub 入門：建立第一個儲存庫，練習分支與合併

做專案時，除了修改檔案，也需要知道「這次改了什麼」及「哪些修改準備放進主要版本」。GitHub 的儲存庫可以集中保存專案相關檔案，並透過分支、Commit 與 Pull Request 組織變更、討論與合併。本篇依官方 Hello World 練習重新整理，讓你先用一份 README 走過流程，不必從程式碼開始。[SRC-0001：Introduction、Step 1–4]

## 開始前：你需要準備什麼？

你需要一個 GitHub 帳號，並在瀏覽器開啟 GitHub。這個練習不要求會寫程式、使用命令列，也不需要安裝 Git；官方說明 Git 是 GitHub 所依據的版本控制軟體，兩個名稱不應混用。[SRC-0001：Prerequisites]

本篇的操作對象是你另外建立的 `hello-world` 練習儲存庫。完成後，你會走過「建立儲存庫 → 建立分支 → 修改與 Commit → 提出 Pull Request → 合併」的流程。[SRC-0001：Introduction、Step 1–5]

介面名稱依 **2026-11-05 查閱的官方文件**，保留英文按鈕文字方便對照；未在帳號內逐步操作驗證。若畫面不同，先對照文末官方來源，不要猜測替代操作。

## Git 與 GitHub 有什麼差別？

**Git 是版本控制軟體**，用來記錄專案版本。它把專案歷史保存在本地，多數操作可使用本地檔案完成，例如查看歷史與提交 Commit；完成本地 Commit 後，仍可等恢復網路連線再上傳。[SRC-0001：Prerequisites；SRC-0002：Snapshots, Not Differences、Nearly Every Operation Is Local]

**GitHub 則提供本篇使用的網頁操作與協作流程**：集中保存專案檔案，在分支中修改，透過 Pull Request 檢視、討論並合併變更。這是根據兩份來源整理的用途對照，不是 GitHub 全部功能的清單。[SRC-0001：Introduction、Step 1–5]

因此，要分清楚「在自己電腦上使用 Git 管理版本」與「在 GitHub 網頁上操作儲存庫」。本篇練習採後者，不要求安裝 Git，也沒有要你在本機執行 Git 指令；Git 多數操作可在本地進行，不表示 GitHub 網頁能離線使用。[SRC-0001：Prerequisites、Step 1–5；SRC-0002：Nearly Every Operation Is Local；情境對照]

## 先認識五個基本概念

| 名稱 | 容易理解的說法 | 本次練習中的角色 |
| --- | --- | --- |
| Repository（儲存庫） | 集中放置同一專案相關檔案的地方，可先想成專案資料夾。 | 建立名為 `hello-world` 的儲存庫。 |
| README | 說明專案的文件，使用 Markdown 編寫。 | 修改 `README.md`，作為練習內容。 |
| Branch（分支） | 從某個時間點的版本分出另一條修改路線，合併前不影響主要分支。 | 從 `main` 建立 `readme-edits`。 |
| Commit（提交／變更紀錄） | 記錄當時的專案快照，附上訊息解釋變更原因。 | 保存 README 的修改。 |
| Pull Request（PR） | 提出變更，讓人檢視、討論並決定是否合併的請求。 | 比較兩個分支的差異，再把修改合併到 `main`。 |

以上概念依據 SRC-0001 的 Step 1–4；Commit 的快照概念另依 SRC-0002 的 Snapshots, Not Differences。快照可先理解成記下專案當時的樣子；沒有改變的檔案會沿用既有參照，不是每次都重新保存一份。可以把本次練習想成：「先在另一條修改路線寫好說明，再檢查差異，最後放回主要版本。」這是為了理解流程的比喻。

## 步驟一：建立第一個儲存庫

在 GitHub 頁面右上角的新增選單（`+`）選擇 **New repository**，接著：

1. 在 **Repository name** 填入 `hello-world`。
2. 在 **Description** 寫一段簡短說明。例如：「練習 GitHub 的分支與合併流程。」這是本篇提供的練習文字。
3. 選擇 **Public** 或 **Private**。官方在這一步提供兩種選項，但本來源不足以詳細說明其權限與安全設定；有疑問時先查證再選擇。
4. 選取 **Add a README file**。
5. 按 **Create repository**。

這份 README 接下來會用來練習修改，不需要另外準備程式碼。[SRC-0001：Step 1]

## 步驟二：建立分支，再修改 README

### 從 main 建立 readme-edits

官方練習以 `main` 作為主要分支。建立新分支後，起初兩者的內容相同；接下來的修改會先留在新分支，合併後才進入 `main`。[SRC-0001：Step 2]

1. 進入 `hello-world` 儲存庫的 **Code** 分頁。
2. 在檔案清單上方，開啟標示 **main** 的分支下拉選單。
3. 輸入新分支名稱 `readme-edits`。
4. 選擇 **Create branch: readme-edits from main**。

這些步驟完成後，官方流程會帶你進入 `readme-edits` 分支。[SRC-0001：Creating a branch、Step 3]

### 編輯 README

1. 在 `readme-edits` 分支中，開啟 `README.md`。
2. 按編輯圖示（鉛筆）。
3. 在編輯器寫一點自我介紹。[SRC-0001：Step 3]

例如，以下是本篇自訂的練習文字，不是官方原文：

```text
我是第一次使用 GitHub，正在練習管理自己的數位專案。
```

## 步驟三：提交 Commit，說明這次改了什麼

編輯完畢後：

1. 按 **Commit changes**。
2. 在出現的 **Commit changes** 視窗中，填寫描述修改的 Commit 訊息，例如「補上 README 自我介紹」（本篇範例）。
3. 再按 **Commit changes** 完成這次提交。

Commit 訊息用來說明這次變更，讓之後閱讀紀錄的人理解做了什麼、為什麼修改。此時 README 的變更只在 `readme-edits`，還沒有進入 `main`。[SRC-0001：Step 3]

## 步驟四：建立 Pull Request，檢查差異

有了分支上的 Commit，就可以提出 Pull Request。它把「我已經改好」變成一份可供檢視與討論的變更請求；提出請求本身還不是合併。[SRC-0001：Step 4]

1. 開啟儲存庫的 **Pull requests** 分頁。
2. 按 **New pull request**。
3. 在 **Example Comparisons** 選擇 `readme-edits`，與原本的 `main` 比較。
4. 查看比較頁的差異（diff），確認要提出的是預期修改。新增與刪除內容會以不同顏色標示。
5. 按 **Create pull request**。
6. 填寫標題與簡短說明，例如標題「補上自我介紹」，說明「在 README 新增一段介紹，練習分支操作」（本篇範例）。
7. 再按 **Create pull request** 送出。

這些操作依據 SRC-0001 的 Step 4。與他人合作時，可以在合併前請對方檢視變更；這份入門來源沒有完整教授審查流程，本篇也不補寫進階設定。[SRC-0001：Reviewing a pull request]

## 步驟五：合併並確認主要分支的內容

這次練習由你自己提出 PR，再自己合併：

1. 在 PR 頁面底部按 **Merge pull request**。
2. 按 **Confirm merge**；依官方流程，成功後會顯示已合併且請求已關閉。
3. 這個練習分支已完成任務，可以依官方練習按 **Delete branch** 刪除 `readme-edits`。
4. 回到 **Code** 分頁，查看 `main` 上的變更。[SRC-0001：Step 5]

合併後，`readme-edits` 的修改會進入 `main`。分支刪除的說明只適用於這個已完成合併的練習，不應當作刪除其他專案分支的通用指示。[SRC-0001：Step 5；適用範圍提醒]

## 下一步：在本機修改並同步

GitHub 上的儲存庫和電腦上的工作副本可以各自有變更。使用 GitHub Desktop 時，可以透過圖形介面查看檔案差異與歷史，並決定何時同步。[SRC-0029、SRC-0030、SRC-0031]

| 動作 | 方向與用途 |
| --- | --- |
| Clone | 從遠端建立本機副本，適合第一次將儲存庫取到電腦。 |
| Fetch | 從遠端取得更新資訊及物件，先了解遠端變動，工作分支不會因此合併。 |
| Pull | 取得遠端變更並整合到目前分支，適合要把遠端進度帶入本機時。 |
| Push | 將本機提交傳送到遠端，讓遠端取得這些提交。 |

以上是 Git 同步概念。[SRC-0029] Fetch 與 Pull 的差異可參考 [GitHub 官方遠端同步說明](https://docs.github.com/en/get-started/using-git/getting-changes-from-a-remote-repository#fetching-changes-from-a-remote-repository)。

用你有權限的練習儲存庫試一次。登入 GitHub Desktop 後，使用 Clone Repository 把儲存庫複製到電腦。確認儲存庫和分支後修改一行 README，先查看差異，再建立本機 Commit。準備同步時，核對要送出的分支與提交，再使用推送功能。如果尚未發布過這個分支，依應用程式顯示的發布分支選項與官方指引操作。最後到 GitHub 核對同一分支的提交是否出現。[SRC-0031]

公開和私有儲存庫的可見性不同，提交前仍要檢查內容，避免把密鑰存進歷史。[SRC-0030]

## 常見問題與注意事項

### 為什麼修改 README 後，main 還沒有變？

在這個流程中，修改與 Commit 都先發生在 `readme-edits`；完成合併後，內容才會進入 `main`。先確認自己正在查看哪個分支。[SRC-0001：Step 2、Step 3、Step 5]

### Commit 和 Pull Request 是同一件事嗎？

不是。Commit 保存一次變更並附上訊息；Pull Request 則提出分支的變更，供檢視與合併。依本次練習，順序是先 Commit，再建立 PR，最後合併。[SRC-0001：Step 3–5]

### 本地 Commit 是否代表已上傳到 GitHub？

**不代表。** 在自己電腦上使用 Git 時，Commit 可以先記錄在本地；SRC-0002 說明可以離線提交，等有網路連線時再上傳。因此，「已在本地 Commit」和「已上傳到 GitHub」不能畫上等號。本篇不教授上傳或同步指令。[SRC-0002：Nearly Every Operation Is Local；The Three States 對 committed 的說明]

但本篇步驟三是**直接在 GitHub 網頁**編輯 README 並按 Commit changes，變更記錄在 GitHub 儲存庫的 `readme-edits` 分支；這不是使用者先在本機執行 Git 指令、等待上傳的流程。此時尚未合併至 `main`，要再完成 Pull Request 與合併步驟。[SRC-0001：Step 3–5]

### 如果出現合併衝突怎麼辦？

官方指出，變更若與 `main` 的內容衝突，GitHub 會提示並阻止合併，直到衝突解決。這份來源沒有提供完整的衝突排除步驟；若實際遇到，資訊不足，應先記下畫面與問題，再另找可靠文件，不在此猜測操作。[SRC-0001：Step 5]

### 完成前可以檢查什麼？

以下是本篇依官方流程整理的實務檢查建議：

- 編輯前，確認目前分支是 `readme-edits`。
- Commit 訊息清楚描述這次的修改。
- PR 比較的是 `readme-edits` 與 `main`，差異符合預期。
- 合併後，確認 `main` 的 README 包含剛新增的介紹。

這些檢查對應 SRC-0001 的 Step 2–5；它們是閱讀流程後整理的提醒，不是額外的官方功能。

## 相關知識

- [需要串接外部服務時：API Key、環境變數與基本安全](../04-technical-basics/api-keys-and-environment-variables.md)
- [專案檔案、終端機與本機預覽](project-files-terminal-and-preview.md)
完成儲存庫與分支練習後，可以繼續閱讀：

- [沒有程式基礎，也能利用 AI 開發專案嗎？](../01-ai-development/ai-development-without-coding-background.md)
- [GitHub 帳號安全：新手檢查清單與官方入口](../08-security-deployment/github-account-security-checklist.md)
- [用 GitHub Pages 發布第一個網站：概念與快速入門](../08-security-deployment/publish-first-site-with-github-pages.md)

以下主題仍待建立：

- 待建立：版本管理與 Git 的基本概念。
- 待建立：Markdown 與 README 的寫作方式。
- 待建立：Pull Request 審查與合併衝突處理。

[返回專案首頁](../../README.md) · [公開來源與署名](../../REFERENCES.md)

## 參考來源

- SRC-0029 · [官方原文](https://docs.github.com/en/get-started/using-git/about-git) · [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- SRC-0030 · [官方原文](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories) · [About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)
- SRC-0031 · [官方原文](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop) · [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop)

- **SRC-0001｜GitHub Docs — Hello World**：[官方文件](https://docs.github.com/en/get-started/using-github/hello-world)；[官方原文](https://docs.github.com/en/get-started/using-github/hello-world)。發布機構：GitHub；個別作者及發布日期：未知；擷取與查閱日期：2026-11-05。
- 章節依據：用途與準備對應 Introduction／Prerequisites；儲存庫與 README 對應 Step 1；分支對應 Step 2；Commit 對應 Step 3；PR 與差異檢查對應 Step 4；合併與衝突限制對應 Step 5。
- **SRC-0002｜Pro Git，第 2 版，1.3 Getting Started - What is Git?**：[官方網站章節](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)；[官方原文](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)。章節發布日期：未知；擷取與查閱日期：2026-11-05。
- 新增概念依據：專案快照與未變檔案的參照對應 Snapshots, Not Differences；多數操作在本地完成與離線 Commit 對應 Nearly Every Operation Is Local；Commit 保存於本地的說明另見 The Three States。Git／GitHub 的角色對照同時使用 SRC-0001 與 SRC-0002，不將 SRC-0002 當作 GitHub 功能說明。

本文的中文練習文字、比喻與完成檢查是為新手整理的教學內容，已與來源事實區分。原始檔保留官方站內相對路徑，部分圖片與連結在 Obsidian 離線閱讀時不適用，可改閱官方頁面；未改寫原始資料。
