<script setup lang="ts">
import { Crosshair } from "lucide-vue-next";
import WeaponFilters from "./WeaponFilters.vue";
import WeaponResults from "./WeaponResults.vue";

/**
 * 武器圖鑑 - 索引頁面（容器組件）
 *
 * 功能：
 * - 採用左側邊欄+右側內容的兩欄佈局
 * - 左側固定篩選器，右側顯示結果
 * - 業務邏輯由 Pinia store 管理
 */
</script>

<template>
  <div class="weapons-index">
    <!-- 頁面標題 -->
    <header class="page-header">
      <div class="page-header__icon">
        <Crosshair :size="32" />
      </div>
      <div class="page-header__text">
        <h1 class="page-header__title">武器圖鑑</h1>
        <p class="page-header__subtitle">困難模式 Tier 1 推薦武器</p>
      </div>
    </header>

    <!-- 主內容區：左右兩欄佈局 -->
    <div class="content-layout">
      <!-- 左側邊欄：篩選器 -->
      <aside class="sidebar">
        <WeaponFilters />
      </aside>

      <!-- 右側內容區：結果展示 -->
      <main class="main-content">
        <WeaponResults />

        <!-- 底部提示 -->
        <footer class="content-footer">
          <p class="footer-text">
            💡
            提示：點擊武器卡片可查看詳細資訊，包含屬性數據、取得方式與使用策略。
          </p>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.weapons-index {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ==========================================
   頁面標題
   ========================================== */
.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
  border-radius: 1rem;
  color: white;
}

.page-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.page-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.page-header__subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0 0;
}

/* ==========================================
   兩欄佈局
   ========================================== */
.content-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* 左側邊欄 */
.sidebar {
  position: sticky;
  top: 1.5rem;
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
}

/* 自定義滾動條樣式 */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}

/* 右側內容區 */
.main-content {
  min-width: 0; /* 防止 grid 溢出 */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ==========================================
   底部提示
   ========================================== */
.content-footer {
  background: #fef3c7;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  border: 1px solid #fcd34d;
}

:global(.dark) .content-footer {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
}

.footer-text {
  margin: 0;
  font-size: 0.875rem;
  color: #92400e;
}

:global(.dark) .footer-text {
  color: #fcd34d;
}

/* ==========================================
   響應式設計
   ========================================== */

/* 平板尺寸：縮小側邊欄寬度 */
@media (max-width: 1200px) {
  .content-layout {
    grid-template-columns: 280px 1fr;
  }
}

/* 小平板：進一步縮小 */
@media (max-width: 900px) {
  .content-layout {
    grid-template-columns: 240px 1fr;
    gap: 1rem;
  }

  .sidebar {
    top: 1rem;
  }
}

/* 手機尺寸：改為上下堆疊 */
@media (max-width: 768px) {
  .content-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sidebar {
    position: relative;
    top: 0;
    max-height: none;
    overflow-y: visible;
  }

  .page-header {
    padding: 1rem;
  }

  .page-header__icon {
    width: 48px;
    height: 48px;
  }

  .page-header__title {
    font-size: 1.5rem;
  }

  .page-header__subtitle {
    font-size: 0.875rem;
  }
}
</style>
