<script setup>
import { ExternalLink, Swords, Target, Clock, Wind, Star, Sparkles, TrendingUp, Package, Hammer, Trophy } from 'lucide-vue-next'
import DocLayout from '@/layouts/DocLayout.vue'
import WeaponSmartCard from '@/components/weapons/WeaponSmartCard.vue'

/**
 * WeaponLayout - 可重用的武器頁面佈局組件
 * 
 * 提供統一的武器詳情頁面結構，包含：
 * - Hero 區塊：武器圖示、名稱、稀有度
 * - 數據面板：傷害、擊退、暴擊率、使用時間
 * - 描述區域：主要特色與使用技巧
 * - 取得方式：製作配方或掉落資訊
 * - 推薦理由：為何值得使用
 */

const props = defineProps({
  /**
   * 武器資料物件
   */
  weapon: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      nameEn: '',
      class: '',
      classLabel: '',
      rarity: { level: 5, color: '#f472b6', label: '稀有度 5' },
      icon: '',
      wikiUrl: '',
      stats: {
        damage: { value: 0, label: '傷害' },
        knockback: { value: 0, label: '擊退', description: '' },
        critChance: { value: 4, label: '暴擊率' },
        useTime: { value: 0, label: '使用時間', description: '' },
      },
      description: '',
      source: {
        type: 'crafting', // 'crafting' | 'drop'
        text: '',
        recipe: [], // for crafting
        dropFrom: '', // for drop
        dropChance: '', // for drop
      },
      whyGood: '',
    }),
  },
})

// 稀有度等級對應的漸層背景
const getRarityGradient = (level) => {
  const gradients = {
    4: 'from-red-600 to-orange-500',
    5: 'from-pink-500 to-rose-400',
    6: 'from-purple-500 to-violet-400',
    7: 'from-lime-500 to-green-400',
    8: 'from-yellow-500 to-amber-400',
  }
  return gradients[level] || gradients[5]
}

// 職業圖示對應
const classIcons = {
  'Ranger': '🏹',
  'Melee': '⚔️',
  'Mage': '🔮',
  'Summoner': '👻',
}
</script>

<template>
  <DocLayout title="本頁目錄">
    <div class="weapon-page">
      <!-- ========================================
           Hero Section - 頂部展示區
           ======================================== -->
      <section class="hero" :style="{ '--rarity-color': weapon.rarity.color }">
      <!-- 背景裝飾 -->
      <div class="hero__bg">
        <div class="hero__bg-pattern"></div>
        <div class="hero__bg-glow"></div>
      </div>
      
      <div class="hero__content">
        <!-- 武器圖示 -->
        <div class="hero__icon-wrapper">
          <div class="hero__icon-glow"></div>
          <div class="hero__icon-frame">
            <img 
              :src="weapon.icon" 
              :alt="weapon.name"
              class="hero__icon-img"
            />
          </div>
        </div>
        
        <!-- 武器資訊 -->
        <div class="hero__info">
          <div class="hero__badges">
            <span 
              class="badge badge--rarity"
              :style="{ backgroundColor: weapon.rarity.color }"
            >
              <Star :size="12" class="mr-1" />
              {{ weapon.rarity.label }}
            </span>
            <span class="badge badge--class">
              <span class="mr-1">{{ classIcons[weapon.class] || '⚔️' }}</span>
              {{ weapon.classLabel }}
            </span>
          </div>
          
          <h1 class="hero__title">{{ weapon.name }}</h1>
          <p class="hero__subtitle">{{ weapon.nameEn }}</p>
          <p class="hero__description">{{ weapon.description }}</p>
          
          <a 
            v-if="weapon.wikiUrl"
            :href="weapon.wikiUrl"
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
         Smart Card - 新版整合數據卡片 (有 mechanics 時顯示)
         ======================================== -->
      <WeaponSmartCard v-if="weapon.mechanics" :weapon="weapon" />

      <!-- ========================================
         Stats Grid - 舊版數據網格 (無 mechanics 時顯示)
         ======================================== -->
      <section v-else class="section-card">
        <h2 id="stats" class="section-heading">
          <TrendingUp :size="20" class="section-heading__icon" />
          <span>屬性數據</span>
        </h2>
      
      <div class="stats-grid">
        <!-- 傷害 -->
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--damage">
            <Swords :size="20" />
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">傷害</span>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{{ weapon.stats.damage.value }}</span>
              <span class="stat-card__suffix">{{ weapon.classLabel }}傷害</span>
            </div>
          </div>
        </div>
        
        <!-- 擊退 -->
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--knockback">
            <Wind :size="20" />
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">擊退</span>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{{ weapon.stats.knockback.value }}</span>
              <span v-if="weapon.stats.knockback.description" class="stat-card__desc">
                {{ weapon.stats.knockback.description }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 暴擊率 -->
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--crit">
            <Target :size="20" />
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">暴擊率</span>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{{ weapon.stats.critChance.value }}%</span>
            </div>
          </div>
        </div>
        
        <!-- 使用時間 -->
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--speed">
            <Clock :size="20" />
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">使用時間</span>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{{ weapon.stats.useTime.value }}</span>
              <span v-if="weapon.stats.useTime.description" class="stat-card__desc">
                {{ weapon.stats.useTime.description }}
              </span>
            </div>
          </div>
        </div>
        </div>
      </section>

      <!-- ========================================
           Source Section - 取得方式
           ======================================== -->
      <section class="section-card">
        <h2 id="source" class="section-heading">
          <Package :size="20" class="section-heading__icon" />
          <span>取得方式</span>
        </h2>
      
      <!-- 製作配方 -->
      <div v-if="weapon.source.type === 'crafting'" class="source-card source-card--crafting">
        <div class="source-card__header">
          <Hammer :size="24" class="source-card__header-icon" />
          <div>
            <span class="source-card__type">製作配方</span>
            <span class="source-card__location">{{ weapon.source.station || '工作台' }}</span>
          </div>
        </div>
        <ul class="recipe-list">
          <li 
            v-for="(item, index) in weapon.source.recipe" 
            :key="index"
            class="recipe-item"
          >
            <img 
              v-if="item.icon" 
              :src="item.icon" 
              :alt="item.name"
              class="recipe-item__icon"
            />
            <span class="recipe-item__name">{{ item.name }}</span>
            <span class="recipe-item__count">x{{ item.count }}</span>
          </li>
        </ul>
      </div>
      
      <!-- 掉落來源 -->
      <div v-else class="source-card source-card--drop">
        <div class="source-card__header">
          <span class="source-card__drop-icon">💀</span>
          <div>
            <span class="source-card__type">怪物掉落</span>
            <span class="source-card__monster">{{ weapon.source.dropFrom }}</span>
          </div>
        </div>
        <div class="source-card__chance">
          <span class="source-card__chance-label">掉落機率</span>
          <span class="source-card__chance-value">{{ weapon.source.dropChance }}</span>
        </div>
        <p v-if="weapon.source.notes" class="source-card__notes">
          💡 {{ weapon.source.notes }}
        </p>
        </div>
      </section>

      <!-- ========================================
           Why Good Section - 推薦理由
           ======================================== -->
      <section class="section-card">
        <h2 id="whygood" class="section-heading">
          <Trophy :size="20" class="section-heading__icon" />
          <span>為何推薦？</span>
        </h2>
      
        <div class="whygood-card">
          <Sparkles :size="24" class="whygood-card__icon" />
          <p class="whygood-card__text">{{ weapon.whyGood }}</p>
        </div>
      </section>

      <!-- 額外內容插槽 -->
      <slot />
    </div>
  </DocLayout>
</template>

<style scoped>
/* ==========================================
   頁面容器
   ========================================== */
.weapon-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ==========================================
   Section Card
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

/* ==========================================
   Hero Section
   ========================================== */
.hero {
  position: relative;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
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
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 60% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 40%);
}

.hero__bg-glow {
  position: absolute;
  top: 50%;
  left: 30%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--rarity-color, rgba(139, 92, 246, 0.3)) 0%, transparent 70%);
  opacity: 0.4;
  transform: translate(-50%, -50%);
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

.hero__content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 1;
}

/* 武器圖示 */
.hero__icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.hero__icon-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, var(--rarity-color, rgba(236, 72, 153, 0.4)) 0%, transparent 70%);
  filter: blur(20px);
  animation: icon-glow 3s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.hero__icon-frame {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
}

.hero__icon-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 12px var(--rarity-color, rgba(236, 72, 153, 0.5)));
}

/* 武器資訊 */
.hero__info {
  flex: 1;
  color: white;
}

.hero__badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
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

.badge--rarity {
  color: white;
}

.badge--class {
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
   Section Heading
   ========================================== */
.section-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
  scroll-margin-top: 6rem;
}

.section-heading__icon {
  color: var(--color-primary);
}

/* ==========================================
   Stats Section
   ========================================== */
.stats-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .stats-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.stat-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.1);
}

.stat-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  color: white;
  flex-shrink: 0;
}

.stat-card__icon--damage {
  background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
}

.stat-card__icon--knockback {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
}

.stat-card__icon--crit {
  background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%);
}

.stat-card__icon--speed {
  background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
}

.stat-card__content {
  flex: 1;
  min-width: 0;
}

.stat-card__label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.stat-card__value-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stat-card__value {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-card__suffix {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.stat-card__desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* ==========================================
   Source Section
   ========================================== */
.source-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .source-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.source-card {
  padding: 1.25rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-main);
}

.source-card--crafting {
  border-left: 4px solid #10b981;
}

.source-card--drop {
  border-left: 4px solid #ef4444;
}

.source-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.source-card__header-icon {
  color: #10b981;
}

.source-card__drop-icon {
  font-size: 1.5rem;
}

.source-card__type {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.source-card__location,
.source-card__monster {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.recipe-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recipe-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  background: var(--color-bg-card);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.recipe-item__icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  image-rendering: pixelated;
}

.recipe-item__name {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.recipe-item__count {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
}

.source-card__chance {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 0.5rem;
  margin-top: 1rem;
}

:global(.dark) .source-card__chance {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%);
}

.source-card__chance-label {
  font-size: 0.75rem;
  color: #92400e;
  font-weight: 500;
}

:global(.dark) .source-card__chance-label {
  color: #fcd34d;
}

.source-card__chance-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #d97706;
}

:global(.dark) .source-card__chance-value {
  color: #fbbf24;
}

.source-card__notes {
  margin: 1rem 0 0;
  padding: 0.75rem 1rem;
  background: #eff6ff;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1e40af;
}

:global(.dark) .source-card__notes {
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
}

/* ==========================================
   Why Good Section
   ========================================== */
.whygood-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .whygood-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.whygood-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #fbbf24;
  border-radius: 0.75rem;
  position: relative;
  overflow: hidden;
}

:global(.dark) .whygood-card {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);
  border-color: rgba(251, 191, 36, 0.5);
}

.whygood-card::before {
  content: '★';
  position: absolute;
  top: -10px;
  right: 10px;
  font-size: 4rem;
  opacity: 0.1;
}

.whygood-card__icon {
  color: #d97706;
  flex-shrink: 0;
}

:global(.dark) .whygood-card__icon {
  color: #fbbf24;
}

.whygood-card__text {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #78350f;
  line-height: 1.6;
}

:global(.dark) .whygood-card__text {
  color: #fef3c7;
}

/* ==========================================
   Mechanics Section
   ========================================== */
.mechanics-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.mechanics-category {
  padding: 1rem 1.25rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.mechanics-category__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.mechanics-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.mechanics-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mechanics-tag__icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  image-rendering: pixelated;
}

.mechanics-tag__highlight {
  font-weight: 700;
  color: #10b981;
}

/* 標籤顏色變體 */
.mechanics-tag--positive {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 1px solid #6ee7b7;
}

:global(.dark) .mechanics-tag--positive {
  background: rgba(16, 185, 129, 0.15);
  color: #6ee7b7;
  border-color: rgba(16, 185, 129, 0.3);
}

.mechanics-tag--neutral {
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.mechanics-tag--info {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  border: 1px solid #93c5fd;
}

:global(.dark) .mechanics-tag--info {
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  border-color: rgba(59, 130, 246, 0.3);
}

.mechanics-tag--warning {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border: 1px solid #fcd34d;
}

:global(.dark) .mechanics-tag--warning {
  background: rgba(245, 158, 11, 0.15);
  color: #fcd34d;
  border-color: rgba(245, 158, 11, 0.3);
}

.mechanics-tag--mana {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  color: #3730a3;
  border: 1px solid #a5b4fc;
}

:global(.dark) .mechanics-tag--mana {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.3);
}

.mechanics-tag--ammo {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
  color: #9d174d;
  border: 1px solid #f9a8d4;
}

:global(.dark) .mechanics-tag--ammo {
  background: rgba(236, 72, 153, 0.15);
  color: #f9a8d4;
  border-color: rgba(236, 72, 153, 0.3);
}

.mechanics-tag--debuff {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid #fca5a5;
}

:global(.dark) .mechanics-tag--debuff {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.3);
}

.mechanics-tag--lifesteal {
  background: linear-gradient(135deg, #fce7f3 0%, #fda4af 100%);
  color: #be123c;
  border: 1px solid #fb7185;
}

:global(.dark) .mechanics-tag--lifesteal {
  background: rgba(244, 63, 94, 0.15);
  color: #fb7185;
  border-color: rgba(244, 63, 94, 0.3);
}

.mechanics-tag--melee {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  color: #9a3412;
  border: 1px solid #fdba74;
}

:global(.dark) .mechanics-tag--melee {
  background: rgba(249, 115, 22, 0.15);
  color: #fdba74;
  border-color: rgba(249, 115, 22, 0.3);
}

.mechanics-tag small {
  font-size: 0.6875rem;
  opacity: 0.8;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 640px) {
  .hero__content {
    flex-direction: column;
    text-align: center;
  }
  
  .hero__badges {
    justify-content: center;
  }
  
  .hero__title {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .whygood-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  /* Smart Card 響應式 */
  .smart-card__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .smart-card__cost {
    width: 100%;
    justify-content: flex-start;
  }
  
  .smart-grid {
    grid-template-columns: 1fr;
  }
  
  .smart-module__value {
    font-size: 1.5rem;
  }
}
</style>

