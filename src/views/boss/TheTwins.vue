<script setup>
import { ref } from "vue";
import {
  ExternalLink,
  Skull,
  Heart,
  Swords,
  Shield,
  Zap,
  Clock,
  Flame,
  Target,
  AlertTriangle,
  ChevronRight,
  Star,
  Package,
  Crosshair,
  Eye,
  Moon,
} from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import { theTwins as bossData } from "@/data/boss";

// 當前選中的職業 Tab
const activeClassTab = ref("ranger");
</script>

<template>
  <DocLayout title="目錄">
    <div class="boss-page">
      <!-- ========================================
           Hero Section - 頂部展示區
           ======================================== -->
      <section class="hero">
        <!-- 背景裝飾 -->
        <div class="hero__bg">
          <div class="hero__bg-pattern"></div>
          <div class="hero__bg-glow hero__bg-glow--red"></div>
          <div class="hero__bg-glow hero__bg-glow--green"></div>
        </div>

        <div class="hero__content">
          <!-- BOSS 圖示 - 雙眼 -->
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

          <!-- BOSS 資訊 -->
          <div class="hero__info">
            <div class="hero__badges">
              <span class="badge badge--boss">
                <Skull :size="12" class="mr-1" />
                {{ bossData.type }}
              </span>
              <span class="badge badge--difficulty">
                <Star :size="12" class="mr-1" />
                {{ bossData.difficulty }}
              </span>
            </div>

            <h1 class="hero__title">{{ bossData.name }}</h1>
            <p class="hero__subtitle">{{ bossData.nameEn }}</p>
            <p class="hero__description">
              困難模式三大機械 Boss 之一。由雷射眼 (Retinazer) 與魔焰眼
              (Spazmatism) 組成的雙子 Boss，
              需要同時應對兩種截然不同的攻擊模式。
            </p>

            <a
              :href="bossData.wikiUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hero__wiki-link"
            >
              <span>查看 Wiki 頁面</span>
              <ExternalLink :size="16" />
            </a>
          </div>
        </div>
      </section>

      <!-- ========================================
         Summoning Section - 召喚方式
         ======================================== -->
      <section class="section-card">
        <h2 id="summoning" class="section-heading">
          <Moon :size="20" class="section-heading__icon" />
          <span>召喚方式</span>
        </h2>

        <div class="summoning-content">
          <!-- 召喚物品 -->
          <div class="summon-item">
            <img
              :src="bossData.summoning.itemIcon"
              :alt="bossData.summoning.item"
              class="summon-item__icon"
            />
            <div class="summon-item__info">
              <span class="summon-item__name">{{
                bossData.summoning.item
              }}</span>
              <span class="summon-item__name-en">{{
                bossData.summoning.itemEn
              }}</span>
            </div>
          </div>

          <!-- 時間限制 -->
          <div class="time-restriction">
            <Clock :size="18" />
            <span
              >需在
              <strong>{{ bossData.summoning.timeRestriction }}</strong>
              使用</span
            >
          </div>

          <!-- 合成配方 -->
          <div class="recipe-section">
            <h3 class="recipe-title">合成配方</h3>
            <div class="recipe-grid">
              <div
                v-for="ingredient in bossData.summoning.recipe"
                :key="ingredient.name"
                class="recipe-item"
              >
                <img
                  :src="ingredient.icon"
                  :alt="ingredient.name"
                  class="recipe-item__icon"
                />
                <div class="recipe-item__info">
                  <span class="recipe-item__name">{{ ingredient.name }}</span>
                  <span class="recipe-item__amount"
                    >x{{ ingredient.amount }}</span
                  >
                </div>
              </div>
            </div>
            <p class="recipe-station">
              🔨 製作於：<strong>{{ bossData.summoning.craftStation }}</strong>
            </p>
          </div>
        </div>
      </section>

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
         Stats Comparison Table - 屬性比較表格
         ======================================== -->
      <section class="section-card">
        <h2 id="stats" class="section-heading">
          <Eye :size="20" class="section-heading__icon" />
          <span>雙眼屬性比較</span>
        </h2>

        <div class="stats-table-wrapper">
          <table class="stats-table">
            <thead>
              <tr>
                <th class="stats-table__header stats-table__header--attr">
                  屬性
                </th>
                <th class="stats-table__header stats-table__header--retinazer">
                  <div class="table-header-content">
                    <img
                      :src="bossData.twins.retinazer.icon"
                      alt="Retinazer"
                      class="table-icon"
                    />
                    <span>雷射眼 <small>(Retinazer)</small></span>
                  </div>
                </th>
                <th class="stats-table__header stats-table__header--spazmatism">
                  <div class="table-header-content">
                    <img
                      :src="bossData.twins.spazmatism.icon"
                      alt="Spazmatism"
                      class="table-icon"
                    />
                    <span>魔焰眼 <small>(Spazmatism)</small></span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="stats-table__label">
                  <Heart :size="14" class="mr-1" /> 血量
                </td>
                <td class="stats-table__value">
                  {{ bossData.twins.retinazer.stats.maxLife.toLocaleString() }}
                </td>
                <td class="stats-table__value">
                  {{ bossData.twins.spazmatism.stats.maxLife.toLocaleString() }}
                </td>
              </tr>
              <tr>
                <td class="stats-table__label">
                  <Shield :size="14" class="mr-1" /> 防禦
                </td>
                <td class="stats-table__value">
                  {{ bossData.twins.retinazer.stats.defense }}
                </td>
                <td class="stats-table__value">
                  {{ bossData.twins.spazmatism.stats.defense }}
                </td>
              </tr>
              <tr>
                <td class="stats-table__label">
                  <Swords :size="14" class="mr-1" /> 傷害
                </td>
                <td class="stats-table__value">
                  {{ bossData.twins.retinazer.stats.damage }}
                </td>
                <td class="stats-table__value">
                  {{ bossData.twins.spazmatism.stats.damage }}
                </td>
              </tr>
              <tr>
                <td class="stats-table__label">
                  <Zap :size="14" class="mr-1" /> 第一階段攻擊
                </td>
                <td class="stats-table__value stats-table__value--text">
                  {{ bossData.twins.retinazer.phase1.attack }}
                </td>
                <td class="stats-table__value stats-table__value--text">
                  {{ bossData.twins.spazmatism.phase1.attack }}
                </td>
              </tr>
              <tr>
                <td class="stats-table__label">
                  <Flame :size="14" class="mr-1" /> 第二階段攻擊
                </td>
                <td class="stats-table__value stats-table__value--text">
                  {{ bossData.twins.retinazer.phase2.attack }}
                </td>
                <td
                  class="stats-table__value stats-table__value--text stats-table__value--danger"
                >
                  {{ bossData.twins.spazmatism.phase2.attack }}
                </td>
              </tr>
              <tr>
                <td class="stats-table__label">
                  <AlertTriangle :size="14" class="mr-1" /> 危險等級
                </td>
                <td class="stats-table__value">
                  <span class="danger-badge danger-badge--medium">中等</span>
                </td>
                <td class="stats-table__value">
                  <span class="danger-badge danger-badge--high">極高</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 魔焰眼警告 -->
        <div class="warning-box">
          <AlertTriangle :size="20" class="warning-box__icon" />
          <p class="warning-box__text">
            <strong>⚠️ 重要警告：</strong
            >{{ bossData.twins.spazmatism.phase2.warning }}
          </p>
        </div>
      </section>

      <!-- ========================================
         Combat Phases - 戰鬥階段
         ======================================== -->
      <section class="section-card">
        <h2 id="phases" class="section-heading">
          <Swords :size="20" class="section-heading__icon" />
          <span>戰鬥階段</span>
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
          <Package :size="20" class="section-heading__icon" />
          <span>掉落物</span>
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
   Hero Section
   ========================================== */
.hero {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 1rem;
  overflow: hidden;
  padding: 2rem;
}

.hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero__bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 30% 30%,
      rgba(239, 68, 68, 0.1) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(34, 197, 94, 0.1) 0%,
      transparent 40%
    ),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/svg%3E");
}

.hero__bg-glow {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(60px);
  animation: pulse-glow 4s ease-in-out infinite;
}

.hero__bg-glow--red {
  top: 20%;
  left: 20%;
  background: rgba(239, 68, 68, 0.3);
}

.hero__bg-glow--green {
  top: 40%;
  right: 20%;
  background: rgba(34, 197, 94, 0.3);
  animation-delay: 2s;
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.hero__content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 1;
}

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

/* BOSS 資訊 */
.hero__info {
  flex: 1;
  color: white;
}

.hero__badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

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

.badge--boss {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
}

.badge--difficulty {
  background-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.hero__title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.hero__subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0 0;
  font-style: italic;
}

.hero__description {
  margin: 1rem 0;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.hero__wiki-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.hero__wiki-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
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
   Summoning Section - 召喚方式
   ========================================== */
.summoning-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summon-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.summon-item__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
}

.summon-item__info {
  display: flex;
  flex-direction: column;
}

.summon-item__name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.summon-item__name-en {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.time-restriction {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 0.5rem;
  color: #c4b5fd;
  font-size: 0.875rem;
}

.time-restriction strong {
  color: #fbbf24;
}

.recipe-section {
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.recipe-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem;
}

.recipe-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.recipe-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-bg-card);
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
}

.recipe-item__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  image-rendering: pixelated;
}

.recipe-item__info {
  display: flex;
  flex-direction: column;
}

.recipe-item__name {
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

.recipe-item__amount {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
}

.recipe-station {
  margin: 1rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* ==========================================
   Arena Tips - 場地準備
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
   Strategy Highlight - 核心戰術
   ========================================== */
.strategy-highlight {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 2px solid #34d399;
  border-radius: 0.75rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.strategy-highlight::before {
  content: "⚔️";
  position: absolute;
  top: -20px;
  right: 20px;
  font-size: 4rem;
  opacity: 0.1;
}

.strategy-highlight__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.strategy-highlight__icon {
  color: #059669;
}

.strategy-highlight__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #065f46;
  margin: 0;
}

.strategy-highlight__priority {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.priority-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #059669;
  margin-bottom: 0.5rem;
}

.priority-text {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #047857;
}

.strategy-highlight__reason {
  font-size: 0.875rem;
  color: #065f46;
  margin: 0 0 1rem;
  line-height: 1.6;
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
  padding: 0.625rem 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.375rem;
}

.strategy-step__number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #059669;
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.strategy-step__text {
  font-size: 0.875rem;
  color: #065f46;
  line-height: 1.5;
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
  .hero__content {
    flex-direction: column;
    text-align: center;
  }

  .hero__icons {
    justify-content: center;
  }

  .hero__badges {
    justify-content: center;
  }

  .hero__title {
    font-size: 1.5rem;
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
