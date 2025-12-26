<script setup>
import { ref } from "vue";
import {
  Heart,
  Swords,
  Shield,
  Zap,
  Target,
  AlertTriangle,
  ChevronRight,
  Package,
  Crosshair,
} from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import BossHero from "@/components/boss/BossHero.vue";
import BossSummoning from "@/components/boss/BossSummoning.vue";
import { skeletronPrime as bossData } from "@/data/boss";

// 當前選中的職業 Tab
const activeClassTab = ref("ranger");
</script>

<template>
  <DocLayout title="目錄">
    <div class="boss-page">
      <!-- ========================================
           Hero Section - 頂部展示區
           ======================================== -->
      <BossHero :boss-data="bossData">
        <template #extra-badges>
          <span class="badge badge--danger">⚠️ 高難度</span>
        </template>
      </BossHero>

      <!-- ========================================
         Summoning Section - 召喚方式
         ======================================== -->
      <BossSummoning :summoning="bossData.summoning" />

      <!-- ========================================
         Arena Section - 場地準備
         ======================================== -->
      <section class="section-card">
        <h2 id="arena" class="section-heading">
          <Target :size="20" class="section-heading__icon" />
          <span>{{ bossData.combat.arena.title }}</span>
        </h2>

        <ul class="arena-tips">
          <li
            v-for="(tip, index) in bossData.combat.arena.tips"
            :key="index"
            class="arena-tip"
          >
            <ChevronRight :size="16" class="arena-tip__icon" />
            <span>{{ tip }}</span>
          </li>
        </ul>
      </section>

      <!-- ========================================
         Stats Section - 各部位屬性
         ======================================== -->
      <section class="section-card">
        <h2 id="stats" class="section-heading">
          <Skull :size="20" class="section-heading__icon" />
          <span>各部位屬性</span>
        </h2>

        <div class="parts-grid">
          <div
            v-for="part in bossData.parts"
            :key="part.nameEn"
            :class="['part-card', `part-card--${part.danger}`]"
            :style="{ '--part-color': part.color }"
          >
            <div class="part-card__header">
              <img :src="part.icon" :alt="part.name" class="part-card__icon" />
              <div class="part-card__title">
                <span class="part-card__name">{{ part.name }}</span>
                <span class="part-card__name-en">{{ part.nameEn }}</span>
              </div>
              <span
                :class="[
                  'part-card__danger',
                  `part-card__danger--${part.danger}`,
                ]"
              >
                {{ part.danger === "high" ? "高威脅" : "中等" }}
              </span>
            </div>
            <div class="part-card__stats">
              <div class="part-stat">
                <Heart :size="14" />
                <span>{{ part.hp.toLocaleString() }}</span>
              </div>
              <div class="part-stat">
                <Shield :size="14" />
                <span>{{ part.defense }}</span>
              </div>
              <div class="part-stat">
                <Swords :size="14" />
                <span>{{ part.damage }}</span>
              </div>
            </div>
            <p class="part-card__notes">{{ part.notes }}</p>
          </div>
        </div>

        <!-- 頭部警告 -->
        <div class="warning-box">
          <AlertTriangle :size="20" class="warning-box__icon" />
          <p class="warning-box__text">
            <strong>⚠️ 致命警告：</strong>頭部旋轉時防禦降低但傷害暴增至 75+！
            若沒有足夠護甲，被旋轉中的頭部碰到幾乎是<strong>即死</strong>！務必優先閃避！
          </p>
        </div>
      </section>

      <!-- ========================================
         Behavior Section - 行為模式
         ======================================== -->
      <section class="section-card">
        <h2 id="behavior" class="section-heading">
          <Zap :size="20" class="section-heading__icon" />
          <span>行為模式</span>
        </h2>

        <div class="behavior-grid">
          <div
            v-for="behavior in bossData.combat.behavior"
            :key="behavior.title"
            class="behavior-card"
          >
            <div class="behavior-card__icon">{{ behavior.icon }}</div>
            <div class="behavior-card__content">
              <h4 class="behavior-card__title">{{ behavior.title }}</h4>
              <p class="behavior-card__desc">{{ behavior.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================
         Core Strategy - 核心戰術
         ======================================== -->
      <section class="strategy-highlight">
        <div class="strategy-highlight__header">
          <Target :size="24" class="strategy-highlight__icon" />
          <h2 id="strategy" class="strategy-highlight__title">
            {{ bossData.combat.coreStrategy.title }}
          </h2>
        </div>

        <div class="strategy-highlight__priority">
          <span class="priority-badge">🎯 關鍵戰術</span>
          <p class="priority-text">
            {{ bossData.combat.coreStrategy.priority }}
          </p>
        </div>

        <p class="strategy-highlight__reason">
          {{ bossData.combat.coreStrategy.reason }}
        </p>

        <ol class="strategy-steps">
          <li
            v-for="(step, index) in bossData.combat.coreStrategy.steps"
            :key="index"
            class="strategy-step"
          >
            <span class="strategy-step__number">{{ index + 1 }}</span>
            <span class="strategy-step__text">{{ step }}</span>
          </li>
        </ol>
      </section>

      <!-- ========================================
         Equipment Section - 推薦裝備
         ======================================== -->
      <section class="section-card">
        <h2 id="equipment" class="section-heading">
          <Crosshair :size="20" class="section-heading__icon" />
          <span>推薦裝備</span>
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
              { 'equipment-card--highlight': weapon.highlight },
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
                <span v-if="weapon.highlight" class="equipment-card__star"
                  >⭐ 推薦</span
                >
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
          <Package :size="20" class="section-heading__icon" />
          <span>掉落物</span>
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

.badge--danger {
  background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
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
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
}

.section-heading__icon {
  color: var(--color-primary);
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
   Parts Grid - 各部位屬性
   ========================================== */
.parts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.part-card {
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  padding: 1rem;
  border-left: 3px solid var(--part-color);
}

.part-card--high {
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.05) 0%,
    var(--color-bg-main) 100%
  );
}

.part-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.part-card__icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  image-rendering: pixelated;
}

.part-card__title {
  flex: 1;
}

.part-card__name {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.part-card__name-en {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.part-card__danger {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
}

.part-card__danger--high {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
}

.part-card__danger--medium {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.part-card__stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.part-stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.part-stat svg {
  color: var(--color-primary);
}

.part-stat span {
  font-weight: 600;
  color: var(--color-text-primary);
}

.part-card__notes {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.4;
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
    rgba(239, 68, 68, 0.1) 0%,
    rgba(239, 68, 68, 0.05) 100%
  );
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
}

.warning-box__icon {
  color: #ef4444;
  flex-shrink: 0;
}

.warning-box__text {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  line-height: 1.6;
}

/* ==========================================
   Behavior Grid
   ========================================== */
.behavior-grid {
  display: grid;
  gap: 1rem;
}

.behavior-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.behavior-card__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.behavior-card__content {
  flex: 1;
}

.behavior-card__title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem;
}

.behavior-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* ==========================================
   Strategy Highlight
   ========================================== */
.strategy-highlight {
  background: linear-gradient(135deg, #3f3f46 0%, #27272a 100%);
  border-radius: 0.75rem;
  padding: 1.5rem;
  color: white;
}

.strategy-highlight__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.strategy-highlight__icon {
  color: #f472b6;
}

.strategy-highlight__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  scroll-margin-top: 6rem;
}

.strategy-highlight__priority {
  background: rgba(244, 114, 182, 0.2);
  border: 1px solid rgba(244, 114, 182, 0.4);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.priority-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.priority-text {
  font-size: 1rem;
  font-weight: 600;
  color: #f9a8d4;
  margin: 0;
}

.strategy-highlight__reason {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0 0 1rem;
}

.strategy-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.strategy-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
}

.strategy-step__number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(244, 114, 182, 0.2);
  border: 1px solid rgba(244, 114, 182, 0.4);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  color: #f472b6;
  flex-shrink: 0;
}

.strategy-step__text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

/* ==========================================
   Equipment Section
   ========================================== */
.class-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.class-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--color-bg-main);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.class-tab:hover {
  border-color: var(--tab-color);
  background: color-mix(in srgb, var(--tab-color) 10%, transparent);
}

.class-tab--active {
  border-color: var(--tab-color);
  background: color-mix(in srgb, var(--tab-color) 15%, transparent);
}

.class-tab__icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.class-tab__name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.class-tab__name-en {
  font-size: 0.625rem;
  color: var(--color-text-secondary);
}

.equipment-grid {
  display: grid;
  gap: 0.75rem;
}

.equipment-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.equipment-card--clickable {
  cursor: pointer;
}

.equipment-card--clickable:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.equipment-card--highlight {
  border-color: #f59e0b;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1) 0%,
    var(--color-bg-main) 100%
  );
}

.equipment-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.equipment-card__content {
  flex: 1;
  min-width: 0;
}

.equipment-card__name {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.equipment-card__name small {
  font-weight: 400;
  color: var(--color-text-secondary);
}

.equipment-card__star {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.125rem 0.375rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
  color: white;
}

.equipment-card__ammo {
  display: block;
  font-size: 0.6875rem;
  color: var(--color-primary);
  margin-top: 0.125rem;
}

.equipment-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0;
  line-height: 1.4;
}

.equipment-card__link-indicator {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.equipment-card__view-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
}

.equipment-card__coming-soon {
  font-size: 0.6875rem;
  color: var(--color-text-secondary);
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-card);
  border-radius: 9999px;
}

.equipment-card--compact {
  padding: 0.75rem;
}

.equipment-grid--accessories {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/* Armor Card */
.armor-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    var(--color-bg-main) 100%
  );
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.5rem;
}

.armor-card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
}

.armor-card__content {
  flex: 1;
}

.armor-card__name {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.armor-card__name small {
  font-weight: 400;
  color: var(--color-text-secondary);
}

.armor-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0;
}

/* Buffs List */
.buffs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.buff-tag {
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-size: 0.8125rem;
  color: var(--color-text-primary);
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
  .class-tabs {
    justify-content: center;
  }

  .equipment-grid--accessories {
    grid-template-columns: 1fr;
  }

  .parts-grid {
    grid-template-columns: 1fr;
  }
}

/* ==========================================
   Helper Classes
   ========================================== */
.mr-1 {
  margin-right: 0.25rem;
}
</style>
