<script setup>
import { ref } from "vue";
import {
  Heart,
  Swords,
  Shield,
  Zap,
  Flame,
  AlertTriangle,
  Package,
  Crosshair,
  Eye,
} from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import BossHero from "@/components/boss/BossHero.vue";
import BossSummoning from "@/components/boss/BossSummoning.vue";
import BossArena from "@/components/boss/BossArena.vue";
import BossSwitcher from "@/components/boss/BossSwitcher.vue";
import BossStatsSection from "@/components/boss/BossStatsSection.vue";
import StrategyHighlight from "@/components/boss/StrategyHighlight.vue";
import { theTwins as bossData, getBossSeriesConfig } from "@/data/boss";
import { BossSlug } from "@/data/boss/boss-slug.enum";
import { useTwinsStats } from "@/components/boss/composables/useBossStats";

// 取得當前 Boss 所屬系列配置
const seriesConfig = getBossSeriesConfig(BossSlug.THE_TWINS);

// 當前選中的職業 Tab
const activeClassTab = ref("ranger");

// 屬性數據
const statsCards = useTwinsStats(bossData);
</script>

<template>
  <DocLayout title="目錄">
    <div class="boss-page">
      <!-- ========================================
           Hero Section - 頂部展示區
           ======================================== -->
      <BossHero :boss-data="bossData" :glow-variants="['red', 'green']">
        <!-- 自定义双图标 -->
        <template #icon>
          <div class="hero__icons">
            <div class="hero__icon-wrapper hero__icon-wrapper--red">
              <div class="hero__icon-glow hero__icon-glow--red"></div>
              <div class="hero__icon-frame">
                <img
                  :src="bossData.icons.retinazer"
                  alt="Retinazer"
                  class="hero__icon-img"
                />
              </div>
            </div>
            <div class="hero__icon-wrapper hero__icon-wrapper--green">
              <div class="hero__icon-glow hero__icon-glow--green"></div>
              <div class="hero__icon-frame">
                <img
                  :src="bossData.icons.spazmatism"
                  alt="Spazmatism"
                  class="hero__icon-img"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- 右上角切换器 -->
        <template v-if="seriesConfig" #switcher>
          <BossSwitcher
            :current-slug="BossSlug.THE_TWINS"
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
         Stats Comparison Table - 屬性比較表格
         ======================================== -->
      <BossStatsSection
        title="雙眼屬性比較"
        :icon="Eye"
        :cards="statsCards"
        :grid-cols="2"
        :warning="bossData.statsWarning"
      />

      <!-- ========================================
         Combat Phases - 戰鬥階段
         ======================================== -->
      <section class="section-card">
        <h2 id="phases" class="section-heading">
          <span class="section-heading__accent-line"></span>
          <Swords :size="20" class="section-heading__icon" />
          <span class="section-heading__text">戰鬥階段</span>
        </h2>

        <div class="phases-grid">
          <div
            v-for="phaseInfo in bossData.combat.phases"
            :key="phaseInfo.phase"
            :class="['phase-card', `phase-card--${phaseInfo.danger}`]"
          >
            <div class="phase-card__header">
              <span class="phase-card__phase">{{ phaseInfo.phase }}</span>
              <span
                :class="[
                  'phase-card__danger',
                  `phase-card__danger--${phaseInfo.danger}`,
                ]"
              >
                {{ phaseInfo.danger === "high" ? "高危險" : "中等難度" }}
              </span>
            </div>
            <p class="phase-card__desc">{{ phaseInfo.description }}</p>
          </div>
        </div>
      </section>

      <!-- ========================================
         Core Strategy - 核心戰術
         ======================================== -->
      <StrategyHighlight
        :core-strategy="bossData.combat.coreStrategy"
        :watermark-icon="bossData.icons.spazmatism"
      />

      <!-- ========================================
         Equipment Section - 推薦裝備
         ======================================== -->
      <section class="section-card">
        <h2 id="equipment" class="section-heading">
          <span class="section-heading__accent-line"></span>
          <Crosshair :size="20" class="section-heading__icon" />
          <span class="section-heading__text">推薦裝備</span>
        </h2>

        <!-- 職業 Tabs -->
        <h3 class="subsection-title">🗡️ 職業武器推薦</h3>

        <div class="class-tabs">
          <button
            v-for="tab in bossData.equipment.classTabs"
            :key="tab.id"
            :class="[
              'class-tab',
              { 'class-tab--active': activeClassTab === tab.id },
            ]"
            :style="{ '--tab-color': tab.color }"
            @click="activeClassTab = tab.id"
          >
            <span class="class-tab__icon">{{ tab.icon }}</span>
            <span class="class-tab__name">{{ tab.name }}</span>
            <span class="class-tab__name-en">{{ tab.nameEn }}</span>
          </button>
        </div>

        <!-- 職業武器列表 -->
        <div class="equipment-grid">
          <RouterLink
            v-for="weapon in bossData.equipment.classWeapons[activeClassTab]"
            :key="weapon.name"
            :to="weapon.route"
            :class="[
              'equipment-card',
              'equipment-card--clickable',
              { 'equipment-card--has-page': weapon.hasPage },
            ]"
          >
            <img
              :src="weapon.icon"
              :alt="weapon.name"
              class="equipment-card__icon"
            />
            <div class="equipment-card__content">
              <span class="equipment-card__name">
                {{ weapon.name }}
                <small>({{ weapon.nameEn }})</small>
              </span>
              <span class="equipment-card__ammo">{{
                weapon.ammo === "無" ? "無消耗" : `消耗：${weapon.ammo}`
              }}</span>
              <p class="equipment-card__desc">{{ weapon.description }}</p>
            </div>
            <div class="equipment-card__link-indicator">
              <span v-if="weapon.hasPage" class="equipment-card__view-link">
                查看詳情
                <ChevronRight :size="14" />
              </span>
              <span v-else class="equipment-card__coming-soon">即將推出</span>
            </div>
          </RouterLink>
        </div>

        <!-- 飾品推薦 -->
        <h3 class="subsection-title">💍 飾品</h3>
        <div class="equipment-grid equipment-grid--accessories">
          <div
            v-for="accessory in bossData.equipment.accessories"
            :key="accessory.name"
            class="equipment-card equipment-card--compact"
          >
            <img
              :src="accessory.icon"
              :alt="accessory.name"
              class="equipment-card__icon"
            />
            <div class="equipment-card__content">
              <span class="equipment-card__name">{{ accessory.name }}</span>
              <p class="equipment-card__desc">{{ accessory.description }}</p>
            </div>
          </div>
        </div>

        <!-- 護甲 -->
        <h3 class="subsection-title">🛡️ 護甲</h3>
        <div class="armor-card">
          <img
            :src="bossData.equipment.armor.icon"
            :alt="bossData.equipment.armor.name"
            class="armor-card__icon"
          />
          <div class="armor-card__content">
            <span class="armor-card__name">
              {{ bossData.equipment.armor.name }}
              <small>({{ bossData.equipment.armor.nameEn }})</small>
            </span>
            <p class="armor-card__desc">
              {{ bossData.equipment.armor.description }}
            </p>
          </div>
        </div>

        <!-- Buff 藥水 -->
        <h3 class="subsection-title">🧪 推薦 Buff</h3>
        <div class="buffs-list">
          <span
            v-for="buff in bossData.equipment.buffs"
            :key="buff"
            class="buff-tag"
          >
            {{ buff }}
          </span>
        </div>
      </section>

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
            class="drop-card"
          >
            <img :src="drop.icon" :alt="drop.name" class="drop-card__icon" />
            <div class="drop-card__content">
              <div class="drop-card__header">
                <span class="drop-card__name">{{ drop.name }}</span>
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
#phases,
#strategy,
#equipment,
#drops {
  scroll-margin-top: 6rem;
}

/* ==========================================
   Custom Hero Styles for TheTwins
   ========================================== */
/* BOSS 雙圖示 */
.hero__icons {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.hero__icon-wrapper {
  position: relative;
}

.hero__icon-glow {
  position: absolute;
  inset: -15px;
  border-radius: 50%;
  filter: blur(15px);
  animation: icon-glow 3s ease-in-out infinite;
}

.hero__icon-glow--red {
  background: rgba(239, 68, 68, 0.4);
}

.hero__icon-glow--green {
  background: rgba(34, 197, 94, 0.4);
  animation-delay: 1.5s;
}

@keyframes icon-glow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.hero__icon-frame {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
}

.hero__icon-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  image-rendering: pixelated;
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
   Stats Table - 屬性比較表格
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

.stats-table__header--retinazer {
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.1) 0%,
    rgba(239, 68, 68, 0.05) 100%
  );
  color: #ef4444;
}

.stats-table__header--spazmatism {
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.1) 0%,
    rgba(34, 197, 94, 0.05) 100%
  );
  color: #22c55e;
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

.table-header-content small {
  font-weight: 400;
  opacity: 0.8;
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
}

.stats-table__value--text {
  font-weight: 500;
  font-size: 0.8125rem;
}

.stats-table__value--danger {
  color: #ef4444;
}

.danger-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.danger-badge--medium {
  background: #fef3c7;
  color: #92400e;
}

.danger-badge--high {
  background: #fee2e2;
  color: #b91c1c;
}

.mr-1 {
  margin-right: 0.25rem;
}

/* 警告框 */
.warning-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fca5a5;
  border-left: 4px solid #ef4444;
  border-radius: 0.5rem;
}

.warning-box__icon {
  color: #dc2626;
  flex-shrink: 0;
}

.warning-box__text {
  margin: 0;
  font-size: 0.875rem;
  color: #991b1b;
  line-height: 1.5;
}

/* ==========================================
   Combat Phases - 戰鬥階段
   ========================================== */
.phases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.phase-card {
  padding: 1.25rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-main);
}

.phase-card--medium {
  border-left: 4px solid #f59e0b;
}

.phase-card--high {
  border-left: 4px solid #ef4444;
}

.phase-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.phase-card__phase {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.phase-card__danger {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
}

.phase-card__danger--medium {
  background: #fef3c7;
  color: #92400e;
}

.phase-card__danger--high {
  background: #fee2e2;
  color: #b91c1c;
}

.phase-card__desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ==========================================
   Equipment Section - 推薦裝備
   ========================================== */
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.equipment-grid--accessories {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.equipment-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.equipment-card:hover {
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.1);
}

.equipment-card--compact {
  padding: 0.875rem;
}

.equipment-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.equipment-card--compact .equipment-card__icon {
  width: 32px;
  height: 32px;
}

.equipment-card__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.equipment-card__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.equipment-card__name small {
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-left: 0.25rem;
}

.equipment-card__ammo {
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-top: 0.125rem;
}

.equipment-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.375rem 0 0;
  line-height: 1.5;
}

.equipment-card--compact .equipment-card__name {
  font-size: 0.875rem;
}

.equipment-card--compact .equipment-card__desc {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* 職業 Tabs */
.class-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.class-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--color-bg-main);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.class-tab:hover {
  border-color: var(--tab-color);
  background: color-mix(in srgb, var(--tab-color) 5%, var(--color-bg-main));
}

.class-tab--active {
  border-color: var(--tab-color);
  background: color-mix(in srgb, var(--tab-color) 10%, var(--color-bg-main));
  box-shadow: 0 2px 8px -2px color-mix(in srgb, var(--tab-color) 30%, transparent);
}

.class-tab__icon {
  font-size: 1.25rem;
}

.class-tab__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.class-tab--active .class-tab__name {
  color: var(--tab-color);
}

.class-tab__name-en {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  font-style: italic;
}

/* 可點擊的裝備卡片 */
.equipment-card--clickable {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  flex-direction: column;
}

.equipment-card--clickable .equipment-card__content {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
}

.equipment-card--clickable .equipment-card__icon {
  width: 48px;
  height: 48px;
}

.equipment-card--clickable:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.2);
  transform: translateY(-3px);
}

.equipment-card--has-page:hover {
  border-color: var(--color-primary);
}

.equipment-card--has-page:hover .equipment-card__view-link {
  color: var(--color-primary);
}

.equipment-card__link-indicator {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--color-border);
}

.equipment-card__view-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: all 0.2s ease;
}

.equipment-card--clickable:hover .equipment-card__view-link {
  color: var(--color-primary);
  gap: 0.5rem;
}

.equipment-card__coming-soon {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

/* 護甲卡片 */
.armor-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.05) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
  border: 1px solid var(--color-primary-light);
  border-radius: 0.625rem;
}

.armor-card__icon {
  width: 56px;
  height: 56px;
  object-fit: contain;
  image-rendering: pixelated;
}

.armor-card__content {
  display: flex;
  flex-direction: column;
}

.armor-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.armor-card__name small {
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-left: 0.25rem;
}

.armor-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0.375rem 0 0;
  line-height: 1.5;
}

/* Buff 列表 */
.buffs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.buff-tag {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

/* ==========================================
   Drops Section - 掉落物
   ========================================== */
.drops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.drop-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.drop-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.drop-card__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.drop-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drop-card__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.drop-card__chance {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: #166534;
  border-radius: 0.25rem;
}

.drop-card__name-en {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.drop-card__amount {
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-top: 0.25rem;
}

.drop-card__desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0;
  line-height: 1.4;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 640px) {
  .hero__icons {
    justify-content: center;
  }

  .hero__icon-frame {
    width: 64px;
    height: 64px;
  }

  .hero__icon-img {
    width: 44px;
    height: 44px;
  }

  .stats-table {
    font-size: 0.8125rem;
  }

  .stats-table__header,
  .stats-table__label,
  .stats-table__value {
    padding: 0.625rem 0.5rem;
  }

  .phases-grid,
  .equipment-grid,
  .drops-grid {
    grid-template-columns: 1fr;
  }

  .recipe-grid {
    flex-direction: column;
  }
}
</style>
