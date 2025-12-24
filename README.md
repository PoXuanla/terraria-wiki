# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue

# 🌲 Terraria Progression Tracker (泰拉瑞亞進度指南)

這是一個基於 **Vue 3 + Vite** 建構的現代化單頁應用程式 (SPA)。
旨在為《泰拉瑞亞 (Terraria)》玩家提供一個介面乾淨、互動流暢的攻略查詢與進度追蹤平台，解決傳統 Wiki 資訊過載的問題。

![Project Status](https://img.shields.io/badge/Status-In%20Development-green)
![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)

## ✨ 特色功能 (Key Features)

- **🚀 極速效能**：使用 Vite 建構，搭配 Vue Router 的 Lazy Loading 技術，頁面切換無延遲。
- **📑 歷史記錄標籤 (History Tabs)**：
  - 類似瀏覽器的分頁體驗。
  - 使用 **Pinia** 狀態管理，自動記錄使用者瀏覽過的指南。
  - 支援快速切換與關閉，並透過 `<KeepAlive>` 保留頁面狀態。
- **🎨 混合式 Icon 系統**：
  - 封裝了智慧型 `BaseIcon` 組件。
  - 同時支援 **UI SVG 圖示** (Lucide-vue) 與 **泰拉瑞亞像素圖片** (Pixel Art Images)。
- **💅 現代化設計**：
  - 使用 **Tailwind CSS** 打造乾淨、響應式的介面。
  - 捨棄過度復古的像素風 UI，改採現代 SaaS 產品風格，提升閱讀體驗。

## 🛠️ 技術堆疊 (Tech Stack)

| 類別              | 技術/套件                              | 說明                                      |
| ----------------- | -------------------------------------- | ----------------------------------------- |
| **Core**    | [Vue 3](https://vuejs.org/)               | 使用 Composition API (`<script setup>`) |
| **Build**   | [Vite](https://vitejs.dev/)               | 下一代前端開發與構建工具                  |
| **Routing** | [Vue Router 4](https://router.vuejs.org/) | 路由管理與 Meta 資訊配置                  |
| **State**   | [Pinia](https://pinia.vuejs.org/)         | 輕量級狀態管理庫 (用於 Tags View)         |
| **UI/CSS**  | [Tailwind CSS](https://tailwindcss.com/)  | Utility-first CSS 框架                    |
| **Icons**   | [Lucide Vue](https://lucide.dev/)         | 現代化 SVG 圖示庫                         |

## 📂 專案結構 (Project Structure)

```bash
src/
├── assets/
│   └── base.css              # 定義 CSS 變數 (Theming)
├── components/
│   ├── BaseIcon.vue          # [核心] 智慧圖示組件 (SVG/Img 雙模式)
│   ├── HistoryTabs.vue       # [核心] 頂部歷史標籤列
│   ├── ThemeToggle.vue       # 深色模式切換按鈕
│   └── weapons/              # 武器相關組件
│       ├── WeaponLayout.vue      # 武器頁面佈局
│       ├── WeaponSmartCard.vue   # 智慧武器資訊卡
│       ├── WeaponSourceSection.vue  # 取得方式區塊
│       ├── WeaponSourceItem.vue     # 單一取得來源卡片
│       └── StrategyGuide.vue     # 戰術指南卡片
├── data/
│   └── weapons/              # 武器資料
│       ├── types.ts          # 武器資料類型定義
│       ├── index.ts          # 統一匯出
│       └── source/           # 取得方式類型
│           ├── source-type.enum.ts  # SourceType 列舉
│           ├── source.types.ts      # Source interfaces
│           └── index.ts
├── layouts/
│   └── MainLayout.vue        # 側邊欄 + Header + 內容區佈局
├── router/
│   └── index.js              # 路由定義 (含 Meta Icon 設定)
├── stores/
│   └── tagsView.js           # Pinia Store: 管理歷史標籤邏輯
├── views/                    # 頁面視圖
│   ├── boss/                 # Boss 攻略 (機械三王)
│   ├── guides/               # 攻略文章 (如：寶藏怪、環境治理)
│   └── weapons/              # 武器圖鑑 (如：代達羅斯風暴弓)
└── App.vue
```

## 🎯 武器取得方式類型 (Source Types)

使用 TypeScript enum 定義 10 種取得方式：

| SourceType | 說明 | 範例 |
|------------|------|------|
| `Crafting` | 製作合成 | 黃金雨、天裂 |
| `Drop` | 怪物/Boss 掉落 | 代達羅斯風暴弓 |
| `Purchase` | NPC 購買 | - |
| `Chest` | 寶箱獲得 | - |
| `Fishing` | 釣魚獲得 | - |
| `Crate` | 木箱獲得 | - |
| `Quest` | 任務獎勵 | - |
| `Event` | 事件獎勵 | 暗影焰刀 |
| `Bag` | Boss 寶藏袋 | - |
| `Other` | 其他方式 | - |
