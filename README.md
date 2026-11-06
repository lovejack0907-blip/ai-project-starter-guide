# AI 專案開發入門指南

給第一次用 AI 製作網站或數位專案的人。以繁體中文 Wiki 介紹專案規劃、工具選擇、程式基礎、版本管理、測試與安全。

## 網站功能

- 九大知識分類與 Markdown 文章閱讀。
- 支援中文、英文和多關鍵字的本機全文搜尋。
- 五階段學習路線、上次閱讀與學習進度。進度保存在瀏覽器。
- 深淺色模式、響應式版面、文章目錄及相關閱讀。

網站使用 Astro 靜態輸出、TypeScript、Markdown 與 CSS。文章的公開版本位於 `wiki/`，網站建置時由 Markdown 產生文章頁與搜尋索引。靜態網站無須後端、API Key 或服務端環境密鑰。

## 本機啟動

使用 Node.js 24 和 pnpm 11.25.0。在專案根目錄執行：

```sh
cd site
pnpm install --frozen-lockfile
pnpm dev
```

開啟終端機顯示的本機網址。執行 `pnpm verify` 可依序完成型別檢查、測試、建置及產物連結驗證。若要查看建置產物，執行 `pnpm preview`。

## GitHub Pages

- Repository：發布後填入實際儲存庫網址。
- 公開網站：首次成功部署後填入 GitHub Pages 提供的實際網址。
- 儲存庫 Pages 的發布來源使用 **GitHub Actions**。`main` 上的變更會觸發部署流程，也可在 Actions 手動執行。
- 工作流程從 Pages 取得網站 origin 與 base path，驗證後只部署 `site/dist/`。

## 內容署名

每篇文章保留官方來源、來源編號及適用的授權說明。標示 CC BY-SA 4.0 的文章依該授權提供，含 MDN 署名與改編說明。其他來源與素材適用各自的條款；本儲存庫未為整份專案授予統一的開源授權。
