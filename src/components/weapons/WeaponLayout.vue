<script setup>
import { ExternalLink, Star, Sparkles, Package, Hammer, Trophy } from 'lucide-vue-next'
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
        station: '',
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
         Smart Card - 數據卡片
         ======================================== -->
      <WeaponSmartCard :weapon="weapon" />

      <!-- ========================================
           Source Section - 取得方式
           ======================================== -->
      <section class="section-card">
        <h2 id="source" class="section-heading">
          <Package :size="20" class="section-heading__icon" />
          <span>取得方式</span>
        </h2>
      
      <!-- 製作配方 - 公式化佈局 -->
      <div v-if="weapon.source.type === 'crafting'" class="recipe-formula">
        <!-- 製作站 -->
        <div class="recipe-formula__station">
          <Hammer :size="18" />
          <span>{{ weapon.source.station || '工作台' }}</span>
        </div>
        
        <!-- 配方公式 -->
        <div class="recipe-formula__content">
          <!-- 素材群 -->
          <div class="recipe-formula__ingredients">
            <template v-for="(item, index) in weapon.source.recipe" :key="index">
              <div class="recipe-slot">
                <div class="recipe-slot__icon-wrapper">
                  <img 
                    v-if="item.icon" 
                    :src="item.icon" 
                    :alt="item.name"
                    class="recipe-slot__icon"
                  />
                  <span class="recipe-slot__count">×{{ item.count }}</span>
                </div>
                <span class="recipe-slot__name">{{ item.name }}</span>
              </div>
              <!-- 加號分隔（最後一個不顯示） -->
              <span v-if="index < weapon.source.recipe.length - 1" class="recipe-formula__plus">+</span>
            </template>
          </div>
          
          <!-- 箭頭 -->
          <div class="recipe-formula__arrow">→</div>
          
          <!-- 成品 -->
          <div class="recipe-slot recipe-slot--result">
            <div class="recipe-slot__icon-wrapper">
              <img 
                :src="weapon.icon" 
                :alt="weapon.name"
                class="recipe-slot__icon"
              />
            </div>
            <span class="recipe-slot__name">{{ weapon.name }}</span>
          </div>
        </div>
        
        <!-- 備註 -->
        <p v-if="weapon.source.note" class="recipe-formula__note">
          💡 {{ weapon.source.note }}
        </p>
      </div>
      
      <!-- 掉落來源 - 公式化佈局 -->
      <div v-else class="drop-formula">
        <!-- 來源標籤 -->
        <div class="drop-formula__tag">
          <span>💀</span>
          <span>怪物掉落</span>
        </div>
        
        <!-- 掉落公式 -->
        <div class="drop-formula__content">
          <!-- 怪物 -->
          <div class="drop-slot drop-slot--monster">
            <div class="drop-slot__icon-wrapper">
              <img 
                v-if="weapon.source.dropFromIcon" 
                :src="weapon.source.dropFromIcon" 
                :alt="weapon.source.dropFrom"
                class="drop-slot__icon"
              />
              <span v-else class="drop-slot__emoji">👾</span>
            </div>
            <span class="drop-slot__name">{{ weapon.source.dropFrom }}</span>
          </div>
          
          <!-- 箭頭 -->
          <div class="drop-formula__arrow">→</div>
          
          <!-- 掉落武器 -->
          <div class="drop-slot drop-slot--result">
            <div class="drop-slot__icon-wrapper">
              <img 
                :src="weapon.icon" 
                :alt="weapon.name"
                class="drop-slot__icon"
              />
              <span class="drop-slot__chance">{{ weapon.source.dropChance }}</span>
            </div>
            <span class="drop-slot__name">{{ weapon.name }}</span>
          </div>
        </div>
        
        <!-- 備註 -->
        <p v-if="weapon.source.notes" class="drop-formula__note">
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

/* ==========================================
   Recipe Formula - 公式化配方佈局
   ========================================== */
.recipe-formula {
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  border-left: 4px solid #10b981;
}

.recipe-formula__station {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 0.875rem;
}

.recipe-formula__content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.recipe-formula__ingredients {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.recipe-formula__plus {
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--color-text-muted);
  opacity: 0.5;
}

.recipe-formula__arrow {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text-muted);
  opacity: 0.6;
}

/* 素材/成品插槽 */
.recipe-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  min-width: 64px;
  transition: all 0.2s ease;
}

.recipe-slot:hover {
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
}

.recipe-slot--result {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
  border-color: #10b981;
}

.recipe-slot__icon-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recipe-slot__icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
}

.recipe-slot__count {
  position: absolute;
  bottom: -4px;
  right: -8px;
  padding: 0.125rem 0.375rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
}

.recipe-slot__name {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 72px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-formula__note {
  margin: 0.875rem 0 0;
  padding: 0.5rem 0.75rem;
  background: #eff6ff;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  color: #1e40af;
}

:global(.dark) .recipe-formula__note {
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
}

/* ==========================================
   Drop Formula - 掉落來源公式化佈局
   ========================================== */
.drop-formula {
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  border-left: 4px solid #ef4444;
}

.drop-formula__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 0.875rem;
}

.drop-formula__content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.drop-formula__arrow {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text-muted);
  opacity: 0.6;
}

/* 怪物/成品插槽 */
.drop-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  min-width: 80px;
  transition: all 0.2s ease;
}

.drop-slot:hover {
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
}

.drop-slot--monster {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(249, 115, 22, 0.05) 100%);
  border-color: rgba(239, 68, 68, 0.3);
}

.drop-slot--result {
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%);
  border-color: #f472b6;
}

.drop-slot__icon-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-slot__icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  image-rendering: pixelated;
}

.drop-slot__emoji {
  font-size: 1.75rem;
}

.drop-slot__chance {
  position: absolute;
  bottom: -6px;
  right: -12px;
  padding: 0.125rem 0.375rem;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  font-size: 0.5625rem;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
  white-space: nowrap;
}

.drop-slot__name {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 90px;
}

.drop-formula__note {
  margin: 0.875rem 0 0;
  padding: 0.5rem 0.75rem;
  background: #eff6ff;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  color: #1e40af;
}

:global(.dark) .drop-formula__note {
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
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
  
  /* Recipe Formula 響應式 */
  .recipe-formula__content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .recipe-formula__arrow {
    transform: rotate(90deg);
    margin: 0.25rem 0 0.25rem 2rem;
  }
  
  /* Drop Formula 響應式 */
  .drop-formula__content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .drop-formula__arrow {
    transform: rotate(90deg);
    margin: 0.25rem 0 0.25rem 2rem;
  }
}
</style>

