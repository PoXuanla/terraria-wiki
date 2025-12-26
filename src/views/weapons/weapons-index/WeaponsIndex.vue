<script setup lang="ts">
import { Crosshair } from "lucide-vue-next";
import WeaponFilters from "./WeaponFilters.vue";
import WeaponResults from "./WeaponResults.vue";

/**
 * 武器圖鑑 - 索引頁面（容器組件）
 *
 * 功能：
 * - 整合篩選器和結果顯示組件
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

    <!-- 篩選區塊 -->
    <WeaponFilters />

    <!-- 武器結果 -->
    <WeaponResults />

    <!-- 底部提示 -->
    <footer class="page-footer">
      <p class="footer-text">
        💡 提示：點擊武器卡片可查看詳細資訊，包含屬性數據、取得方式與使用策略。
      </p>
    </footer>
  </div>
</template>

<style scoped>
.weapons-index {
  max-width: 1400px;
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
   底部提示
   ========================================== */
.page-footer {
  background: #fef3c7;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  border: 1px solid #fcd34d;
}

:global(.dark) .page-footer {
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
</style>
