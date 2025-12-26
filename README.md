# 🌲 Terraria Progression Tracker

> 泰拉瑞亞進度指南 - 現代化的攻略查詢與進度追蹤平台

[![Project Status](https://img.shields.io/badge/Status-In%20Development-green)](https://github.com/yourusername/terraria-wiki)
[![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

這是一個基於 **Vue 3 + Vite + TypeScript** 建構的現代化單頁應用程式 (SPA)，旨在為《泰拉瑞亞 (Terraria)》玩家提供介面乾淨、互動流暢的攻略查詢與進度追蹤平台，解決傳統 Wiki 資訊過載的問題。

## ✨ 核心特色

### 🚀 極速效能
- 使用 **Vite 7** 建構，開發環境秒速啟動
- 搭配 **Vue Router** 的 Lazy Loading，頁面切換無延遲
- 使用 `<KeepAlive>` 保留頁面狀態，避免重複渲染

### 📑 歷史記錄標籤 (History Tabs)
- 類似瀏覽器的分頁體驗，快速切換已瀏覽的指南
- 使用 **Pinia** 狀態管理，自動記錄瀏覽歷史
- 支援關閉標籤、快速切換，並智能保留頁面狀態

### 🎯 武器圖鑑系統
- **即時篩選與搜尋**：支援武器名稱、職業、稀有度、取得方式的多條件篩選
- **智能排序**：可依傷害、稀有度、名稱排序（升序/降序）
- **TypeScript 類型安全**：完整的類型定義，開發體驗極佳
- **Lodash 防抖優化**：搜尋輸入使用 debounce，避免效能浪費

### 🎨 混合式 Icon 系統
- 封裝智慧型 `BaseIcon` 組件
- 同時支援 **UI SVG 圖示** ([Lucide Icons](https://lucide.dev/)) 與 **泰拉瑞亞像素圖片**
- 自動判斷圖示類型，統一使用介面

### 💅 現代化設計
- 使用 **Tailwind CSS 4** 打造乾淨、響應式的介面
- 採用 SaaS 產品風格，提升閱讀體驗
- 支援深色模式（開發中）

### 🗂️ 動態路由生成
- 從資料檔案自動生成路由與選單
- 新增武器/指南只需編輯資料檔，無需手動配置路由
- 類型安全的路由 Meta 資訊

## 🛠️ 技術堆疊

| 類別           | 技術/套件                                                      | 版本  | 說明                                      |
| -------------- | -------------------------------------------------------------- | ----- | ----------------------------------------- |
| **Core**       | [Vue 3](https://vuejs.org/)                                    | 3.5.x | 使用 Composition API (`<script setup>`)   |
| **Language**   | [TypeScript](https://www.typescriptlang.org/)                  | 5.9.x | 類型安全，完整的開發體驗                  |
| **Build**      | [Vite](https://vitejs.dev/)                                    | 7.2.x | 下一代前端開發與構建工具                  |
| **Routing**    | [Vue Router](https://router.vuejs.org/)                        | 4.6.x | 路由管理、動態路由生成、Meta 資訊配置     |
| **State**      | [Pinia](https://pinia.vuejs.org/)                              | 3.0.x | 輕量級狀態管理 (Tags View、武器篩選狀態)  |
| **UI/CSS**     | [Tailwind CSS](https://tailwindcss.com/)                       | 4.1.x | Utility-first CSS 框架                    |
| **Icons**      | [Lucide Vue Next](https://lucide.dev/)                         | 0.x   | 現代化 SVG 圖示庫                         |
| **Typography** | [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | 0.5.x | 優雅的文章排版樣式                        |
| **Utils**      | [Lodash ES](https://lodash.com/)                               | 4.x   | 實用工具函數庫 (debounce 等)              |

## 📂 專案結構

```
src/
├── assets/
│   └── base.css                      # 全域 CSS 變數 (Theming)
│
├── components/
│   ├── BaseIcon.vue                  # [核心] 智慧圖示組件 (SVG/Img 雙模式)
│   ├── HistoryTabs.vue               # [核心] 頂部歷史標籤列
│   ├── SidebarMenu.vue               # 側邊欄選單
│   ├── ThemeToggle.vue               # 深色模式切換
│   └── weapons/                      # 武器相關組件
│       ├── WeaponLayout.vue          # 武器頁面佈局
│       ├── WeaponSmartCard.vue       # 智慧武器資訊卡
│       ├── WeaponSourceSection.vue   # 取得方式區塊
│       ├── WeaponSourceItem.vue      # 單一取得來源卡片
│       └── StrategyGuide.vue         # 戰術指南卡片
│
├── data/                             # 資料層 (TypeScript)
│   ├── boss/                         # Boss 資料
│   │   ├── index.js
│   │   ├── types.ts                  # Boss 類型定義
│   │   └── *.js                      # 各個 Boss 的資料
│   ├── guides/                       # 指南資料
│   └── weapons/                      # 武器資料
│       ├── types.ts                  # 武器資料類型定義
│       ├── index.ts                  # 統一匯出
│       ├── *.ts                      # 各武器資料檔
│       └── source/                   # 取得方式類型
│           ├── source-type.enum.ts   # SourceType 列舉
│           ├── source.types.ts       # Source interfaces
│           └── index.ts
│
├── layouts/
│   ├── MainLayout.vue                # [核心] 主佈局 (Sidebar + Header + Content)
│   └── DocLayout.vue                 # 文章佈局 (可選)
│
├── router/
│   └── index.ts                      # [核心] 路由定義 (動態生成)
│
├── stores/
│   ├── tagsView.js                   # Pinia Store: 歷史標籤邏輯
│   └── weapon/
│       └── index.ts                  # [核心] 武器圖鑑狀態管理
│
├── views/                            # 頁面視圖
│   ├── HomePage.vue                  # 首頁
│   ├── NotFound.vue                  # 404 頁面
│   ├── boss/                         # Boss 攻略 (機械三王等)
│   ├── guides/                       # 攻略文章 (如：寶藏怪、環境治理)
│   └── weapons/                      # 武器圖鑑
│       ├── WeaponDetail.vue          # 通用武器詳情頁
│       └── weapons-index/            # 武器總覽頁面
│           ├── WeaponsIndex.vue      # 主組件
│           ├── WeaponFilters.vue     # 篩選器組件
│           ├── WeaponResults.vue     # 結果列表組件
│           ├── types.ts              # 類型定義
│           └── index.ts
│
├── App.vue                           # 根組件
└── main.js                           # 應用程式入口
```

## 🎯 武器取得方式類型

使用 TypeScript enum 定義 10 種取得方式：

| SourceType   | 說明         | 範例武器           |
| ------------ | ------------ | ------------------ |
| `Crafting`   | 製作合成     | 黃金雨、天裂       |
| `Drop`       | 怪物/Boss 掉落 | 代達羅斯風暴弓     |
| `Purchase`   | NPC 購買     | 飛鏢步槍           |
| `Chest`      | 寶箱獲得     | -                  |
| `Fishing`    | 釣魚獲得     | -                  |
| `Crate`      | 木箱獲得     | -                  |
| `Quest`      | 任務獎勵     | -                  |
| `Event`      | 事件獎勵     | 暗影焰刀           |
| `Bag`        | Boss 寶藏袋  | -                  |
| `Other`      | 其他方式     | -                  |

## 🚀 快速開始

### 環境需求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (推薦) 或 npm/yarn

### 安裝依賴

```bash
# 使用 pnpm (推薦)
pnpm install

# 或使用 npm
npm install
```

### 開發模式

```bash
pnpm dev
```

開啟瀏覽器訪問 [http://localhost:5173](http://localhost:5173)

### 建構生產版本

```bash
pnpm build
```

建構完成的檔案將位於 `dist/` 目錄

### 預覽生產版本

```bash
pnpm preview
```

### 程式碼檢查

```bash
# ESLint 檢查
pnpm lint

# TypeScript 類型檢查
pnpm type-check

# 執行所有檢查
pnpm lint:all
```

## 📝 開發指南

### 新增武器

1. 在 `src/data/weapons/` 建立新的 `.ts` 檔案（如 `new-weapon.ts`）
2. 使用 `Weapon` 介面定義武器資料：

```typescript
import type { Weapon } from './types';
import { SourceType } from './source';

export const newWeapon: Weapon = {
  slug: 'new-weapon',
  name: '新武器',
  nameEn: 'New Weapon',
  class: 'melee',
  icon: '/weapons/new-weapon.png',
  rarity: { level: 5, color: '#ff6961', name: '粉色' },
  stats: {
    damage: { value: 50, unit: '近戰' },
    knockback: { value: 5, level: '普通' },
    critChance: { value: 4, unit: '%' },
    useTime: { value: 20, speed: '非常快' },
    velocity: { value: 0 }
  },
  sources: [
    {
      type: SourceType.Crafting,
      items: [
        { name: '材料 1', quantity: 10, icon: '/items/material-1.png' },
        { name: '材料 2', quantity: 5, icon: '/items/material-2.png' }
      ],
      station: '神話鉆石砧'
    }
  ],
  strategies: [
    {
      title: '使用技巧',
      content: '這是使用技巧的內容...'
    }
  ]
};
```

3. 在 `src/data/weapons/index.ts` 中匯出新武器
4. 路由會自動生成，無需手動配置

### 新增指南

1. 在 `src/views/guides/` 建立新的 Vue 組件
2. 在 `src/data/guides/index.js` 中註冊：

```javascript
{
  slug: 'new-guide',
  name: '新指南',
  componentName: 'NewGuide',
  icon: '/guides/new-guide.png'
}
```

3. 路由會自動生成

### 使用 BaseIcon 組件

```vue
<template>
  <!-- SVG Icon -->
  <BaseIcon :icon="HomeIcon" />
  
  <!-- Image Icon -->
  <BaseIcon icon="/weapons/blade-staff.png" />
</template>

<script setup>
import { Home as HomeIcon } from 'lucide-vue-next';
</script>
```

## 🌐 部署

### GitHub Pages

專案已配置 GitHub Pages 部署：

```bash
# 建構
pnpm build

# 部署到 GitHub Pages (需先配置)
# 確保 vite.config.js 中的 base 路徑正確
```

`vite.config.js` 配置：

```javascript
export default defineConfig({
  base: '/terraria-wiki/', // 替換為你的 repo 名稱
  // ...
})
```

### 其他平台

建構完成後，`dist/` 目錄可部署至任何靜態託管服務：
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## 🤝 貢獻指南

歡迎提交 Issue 或 Pull Request！

### 開發流程

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m '新增某功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

### Commit 規範

請遵循簡潔的 commit 訊息格式（3 行內）：

```
新增黃金雨武器資料
更新武器篩選邏輯
修復歷史標籤關閉錯誤
```

### 程式碼規範

- 提交前請執行 `pnpm lint:all` 確保程式碼品質
- 遵循 TypeScript 類型安全原則
- 組件使用 `<script setup>` 語法
- 使用 Tailwind CSS 撰寫樣式

## 📄 授權

MIT License

---

<p align="center">
  Made with ❤️ by Terraria Players
</p>
