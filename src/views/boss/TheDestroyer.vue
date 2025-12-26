<script setup>
import {
  Heart,
  Swords,
  Shield,
  AlertTriangle,
  Package,
  Crosshair,
  Bug,
} from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import BossHero from "@/components/boss/BossHero.vue";
import BossSummoning from "@/components/boss/BossSummoning.vue";
import BossArena from "@/components/boss/BossArena.vue";
import BossSwitcher from "@/components/boss/BossSwitcher.vue";
import BossStatsSection from "@/components/boss/BossStatsSection.vue";
import BossBehavior from "@/components/boss/BossBehavior.vue";
import StrategyHighlight from "@/components/boss/StrategyHighlight.vue";
import BossEquipment from "@/components/boss/BossEquipment.vue";
import { theDestroyer as bossData, getBossSeriesConfig } from "@/data/boss";
import { BossSlug } from "@/data/boss/boss-slug.enum";
import { useDestroyerStats } from "@/components/boss/composables/useBossStats";

// 取得當前 Boss 所屬系列配置
const seriesConfig = getBossSeriesConfig(BossSlug.THE_DESTROYER);

// 屬性數據
const statsCards = useDestroyerStats(bossData);
</script>

<template>
  <DocLayout title="目錄">
    <div class="boss-page">
      <!-- ========================================
           Hero Section - 頂部展示區
           ======================================== -->
      <BossHero :boss-data="bossData" :glow-variants="['red']">
        <template #extra-badges>
          <span class="badge badge--easy">✅ 最易擊敗</span>
        </template>

        <!-- 右上角切换器 -->
        <template v-if="seriesConfig" #switcher>
          <BossSwitcher
            :current-slug="BossSlug.THE_DESTROYER"
            :bosses="seriesConfig.bosses"
            :label="seriesConfig.label"
          />
        </template>
      </BossHero>

      <!-- ========================================
         Summoning Section - 召喚方式
         ======================================== -->
      <BossSummoning :summoning="bossData.summoning" />

      <!-- ========================================
         Arena Section - 場地準備
         ======================================== -->
      <BossArena :arena-data="bossData.combat.arena" />

      <!-- ========================================
         Stats Section - 屬性數據
         ======================================== -->
      <BossStatsSection
        title="屬性數據"
        :icon="Bug"
        :cards="statsCards"
        :grid-cols="2"
        :warning="bossData.statsWarning"
      />

      <!-- ========================================
         Behavior Section - 行為模式
         ======================================== -->
      <BossBehavior :behaviors="bossData.combat.behavior" />

      <!-- ========================================
         Core Strategy - 核心戰術
         ======================================== -->
      <StrategyHighlight
        :core-strategy="bossData.combat.coreStrategy"
        :watermark-icon="bossData.icon"
        :watermark-horizontal="true"
      />

      <!-- ========================================
         Equipment Section - 推薦裝備
         ======================================== -->
      <BossEquipment :equipment="bossData.equipment" />

      <!-- ========================================
         Drops Section - 掉落物
         ======================================== -->
      <section class="section-card">
        <h2 id="drops" class="section-heading">
          <span class="section-heading__accent-line"></span>
          <Package :size="20" class="section-heading__icon" />
          <span class="section-heading__text">掉落物</span>
        </h2>

        <div class="drops-grid">
          <div
            v-for="drop in bossData.drops"
            :key="drop.name"
            :class="['drop-card', { 'drop-card--highlight': drop.highlight }]"
          >
            <img :src="drop.icon" :alt="drop.name" class="drop-card__icon" />
            <div class="drop-card__content">
              <div class="drop-card__header">
                <span class="drop-card__name">
                  {{ drop.name }}
                  <span v-if="drop.highlight" class="drop-card__star">⭐</span>
                </span>
                <span class="drop-card__chance">{{ drop.chance }}</span>
              </div>
              <span class="drop-card__name-en">{{ drop.nameEn }}</span>
              <span class="drop-card__amount">數量：{{ drop.amount }}</span>
              <p class="drop-card__desc">{{ drop.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </DocLayout>
</template>

<style scoped>
/* ==========================================
   頁面容器
   ========================================== */
.boss-page {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 區塊捲動定位偏移 */
#summoning,
#arena,
#stats,
#behavior,
#strategy,
#equipment,
#drops {
  scroll-margin-top: 6rem;
}

/* ==========================================
   Badge Styles (for extra-badges slot)
   ========================================== */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge--easy {
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
  color: white;
}

/* ==========================================
   通用區塊樣式
   ========================================== */
.section-card {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .section-card {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0 0 1.5rem;
}

.section-heading__accent-line {
  width: 3px;
  height: 1.5rem;
  background: linear-gradient(
    180deg,
    rgba(168, 85, 247, 1) 0%,
    rgba(59, 130, 246, 1) 100%
  );
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.6), 0 0 16px rgba(168, 85, 247, 0.3);
  animation: accent-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes accent-pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.6),
      0 0 16px rgba(168, 85, 247, 0.3);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.8),
      0 0 24px rgba(168, 85, 247, 0.4);
  }
}

.section-heading__icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.section-heading__text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
}

.subsection-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 1.5rem 0 0.75rem;
}

.subsection-title:first-of-type {
  margin-top: 0;
}

/* ==========================================
   Arena Tips
   ========================================== */
.arena-tips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.arena-tip {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  background: var(--color-bg-main);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  line-height: 1.5;
}

.arena-tip__icon {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* ==========================================
   Stats Table
   ========================================== */
.stats-table-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.stats-table__header {
  padding: 0.875rem 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--color-border);
}

.stats-table__header--attr {
  background: var(--color-bg-main);
  color: var(--color-text-secondary);
  width: 140px;
}

.stats-table__header--main {
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.1) 0%,
    rgba(220, 38, 38, 0.05) 100%
  );
  color: #dc2626;
}

.stats-table__header--probe {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(59, 130, 246, 0.05) 100%
  );
  color: #3b82f6;
}

.table-header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.table-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  image-rendering: pixelated;
}

.stats-table tbody tr {
  border-bottom: 1px solid var(--color-border);
}

.stats-table tbody tr:hover {
  background: var(--color-bg-main);
}

.stats-table__label {
  padding: 0.75rem 1rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
}

.stats-table__value {
  padding: 0.75rem 1rem;
  color: var(--color-text-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.stats-table__value--highlight {
  color: #dc2626;
  font-size: 1rem;
}

.stats-table__value--text {
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 1.5;
}

/* ==========================================
   Warning Box
   ========================================== */
.warning-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1) 0%,
    rgba(245, 158, 11, 0.05) 100%
  );
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 0.5rem;
}

.warning-box--info {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(59, 130, 246, 0.05) 100%
  );
  border-color: rgba(59, 130, 246, 0.3);
}

.warning-box__icon {
  color: #f59e0b;
  flex-shrink: 0;
}

.warning-box--info .warning-box__icon {
  color: #3b82f6;
}

.warning-box__text {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  line-height: 1.6;
}

/* ==========================================
   Drops Section
   ========================================== */
.drops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.drop-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.drop-card--highlight {
  border-color: #f59e0b;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1) 0%,
    var(--color-bg-main) 100%
  );
}

.drop-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.drop-card__content {
  flex: 1;
  min-width: 0;
}

.drop-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.drop-card__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.drop-card__star {
  color: #f59e0b;
}

.drop-card__chance {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  padding: 0.125rem 0.375rem;
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  border-radius: 9999px;
}

.drop-card__name-en {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.drop-card__amount {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

.drop-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.375rem 0 0;
  line-height: 1.4;
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 640px) {
  /* Responsive adjustments */
}

/* ==========================================
   Helper Classes
   ========================================== */
.mr-1 {
  margin-right: 0.25rem;
}
</style>
