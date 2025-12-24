<script setup>
import { ExternalLink, Swords, Target, Zap, Clock, Wind, Star, Sparkles, TrendingUp, Package, ChevronRight } from 'lucide-vue-next'
import DocLayout from '@/layouts/DocLayout.vue'

/**
 * 代達羅斯風暴弓 - 武器詳情資料
 */
const weaponData = {
  // 基本資訊
  name: '代達羅斯風暴弓',
  nameEn: 'Daedalus Stormbow',
  type: 'Ranged',
  typeLabel: '遠程武器',
  rarity: {
    level: 5,
    color: '#f472b6', // Pink - 稀有度 5
    label: '稀有度 5',
  },
  
  // 圖片
  icon: 'https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png',
  wikiUrl: 'https://terraria.wiki.gg/wiki/Daedalus_Stormbow',
  
  // 數值屬性
  stats: {
    damage: { value: 43, label: '傷害', suffix: '', icon: Swords },
    critChance: { value: 4, label: '暴擊率', suffix: '%', icon: Target },
    useTime: { value: 19, label: '使用時間', suffix: '', description: '非常快', icon: Clock },
    knockback: { value: 2.25, label: '擊退', suffix: '', description: '非常弱', icon: Wind },
    velocity: { value: 1, label: '箭矢速度', suffix: '', description: '極慢 (從天降落)', icon: Zap },
  },
  
  // 關鍵攻略資訊
  meta: {
    bestModifier: {
      name: '虛幻',
      nameEn: 'Unreal',
      description: '最佳重鑄前綴，提供最大化的傷害與暴擊加成',
    },
    bestAmmo: {
      name: '聖箭',
      nameEn: 'Holy Arrows',
      icon: 'https://terraria.wiki.gg/images/0/0e/Holy_Arrow.png',
      description: '擊中時召喚額外的落星，造成大量 AOE 傷害',
    },
    recommendedAccessories: [
      '遊俠徽章',
      '魔法箭袋',
      '狙擊鏡',
    ],
    bestAgainst: [
      { name: '毀滅者', nameEn: 'The Destroyer', reason: '多段體對落星傷害極度敏感' },
    ],
  },
  
  // 取得方式
  acquisition: {
    source: '神聖寶箱怪',
    sourceEn: 'Hallowed Mimic',
    sourceIcon: 'https://terraria.wiki.gg/images/7/7c/Hallowed_Mimic.png',
    chance: '25%',
    chanceRaw: '1/4',
    notes: '需要在困難模式的神聖之地生成',
  },
  
  // 詳細描述
  description: {
    short: '射出的箭矢會從天空降落，搭配聖箭使用時效果極佳，是對付機械Boss的神器。',
    attackPattern: '發射箭矢時，箭矢會從角色上方的天空中落下，而非直接從弓射出。這使得它能夠繞過障礙物打擊敵人。',
    strategy: '配合聖箭使用時，每支箭矢落地時會額外召喚 2 顆落星。對付毀滅者這類長條型多段體 Boss 時，大量的落星能夠同時命中多個體節，造成毀滅性的傷害。',
  },
}

// 稀有度等級對應的文字
const getRarityGradient = (level) => {
  const gradients = {
    5: 'from-pink-500 to-rose-400',
    6: 'from-purple-500 to-violet-400',
    7: 'from-lime-500 to-green-400',
    8: 'from-yellow-500 to-amber-400',
  }
  return gradients[level] || gradients[5]
}
</script>

<template>
  <DocLayout title="本頁目錄">
    <div class="weapon-page">
    <!-- ========================================
         Hero Section - 頂部展示區
         ======================================== -->
    <section class="hero">
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
              :src="weaponData.icon" 
              :alt="weaponData.name"
              class="hero__icon-img"
            />
          </div>
        </div>
        
        <!-- 武器資訊 -->
        <div class="hero__info">
          <div class="hero__badges">
            <span 
              class="badge badge--rarity"
              :style="{ backgroundColor: weaponData.rarity.color }"
            >
              <Star :size="12" class="mr-1" />
              {{ weaponData.rarity.label }}
            </span>
            <span class="badge badge--type">
              <Target :size="12" class="mr-1" />
              {{ weaponData.typeLabel }}
            </span>
          </div>
          
          <h1 class="hero__title">{{ weaponData.name }}</h1>
          <p class="hero__subtitle">{{ weaponData.nameEn }}</p>
          <p class="hero__description">{{ weaponData.description.short }}</p>
          
          <a 
            :href="weaponData.wikiUrl"
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
         Stats Grid - 數據網格
         ======================================== -->
    <section class="section-card">
      <h2 id="stats" class="section-heading">
        <TrendingUp :size="20" class="section-heading__icon" />
        <span>屬性數據</span>
      </h2>
      
      <div class="stats-grid">
        <!-- 數值卡片 -->
        <div 
          v-for="(stat, key) in weaponData.stats" 
          :key="key"
          class="stat-card"
        >
          <div class="stat-card__icon">
            <component :is="stat.icon" :size="20" />
          </div>
          <div class="stat-card__content">
            <span class="stat-card__label">{{ stat.label }}</span>
            <div class="stat-card__value-row">
              <span class="stat-card__value">
                {{ stat.value }}{{ stat.suffix }}
              </span>
              <span v-if="stat.description" class="stat-card__desc">
                {{ stat.description }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 最佳前綴 - 特別強調 -->
      <div class="best-modifier">
        <div class="best-modifier__header">
          <Sparkles :size="20" class="best-modifier__icon" />
          <span class="best-modifier__label">最佳重鑄前綴</span>
        </div>
        <div class="best-modifier__content">
          <div class="best-modifier__name">
            <span class="best-modifier__name-zh">{{ weaponData.meta.bestModifier.name }}</span>
            <span class="best-modifier__name-en">{{ weaponData.meta.bestModifier.nameEn }}</span>
          </div>
          <p class="best-modifier__desc">{{ weaponData.meta.bestModifier.description }}</p>
        </div>
      </div>
    </section>

    <!-- ========================================
         Strategy Card - 戰術指南
         ======================================== -->
    <section class="section-card">
      <h2 id="strategy" class="section-heading">
        <Zap :size="20" class="section-heading__icon" />
        <span>戰術指南</span>
      </h2>
      
      <div class="strategy-grid">
        <!-- 推薦彈藥 -->
        <div class="strategy-card strategy-card--ammo">
          <div class="strategy-card__header">
            <img 
              :src="weaponData.meta.bestAmmo.icon" 
              alt="Holy Arrow"
              class="strategy-card__item-icon"
            />
            <div class="strategy-card__header-text">
              <span class="strategy-card__title">推薦彈藥</span>
              <span class="strategy-card__item-name">
                {{ weaponData.meta.bestAmmo.name }}
                <small>({{ weaponData.meta.bestAmmo.nameEn }})</small>
              </span>
            </div>
          </div>
          <p class="strategy-card__desc">{{ weaponData.meta.bestAmmo.description }}</p>
        </div>
        
        <!-- 最佳對付 -->
        <div class="strategy-card strategy-card--boss">
          <div class="strategy-card__header">
            <div class="strategy-card__boss-icon">👾</div>
            <div class="strategy-card__header-text">
              <span class="strategy-card__title">最佳對付</span>
              <span class="strategy-card__item-name">
                {{ weaponData.meta.bestAgainst[0].name }}
                <small>({{ weaponData.meta.bestAgainst[0].nameEn }})</small>
              </span>
            </div>
          </div>
          <p class="strategy-card__desc">{{ weaponData.meta.bestAgainst[0].reason }}</p>
        </div>
        
        <!-- 推薦飾品 -->
        <div class="strategy-card strategy-card--accessories">
          <span class="strategy-card__title">推薦飾品</span>
          <ul class="strategy-card__list">
            <li 
              v-for="accessory in weaponData.meta.recommendedAccessories" 
              :key="accessory"
              class="strategy-card__list-item"
            >
              <ChevronRight :size="14" class="strategy-card__list-icon" />
              {{ accessory }}
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 攻擊模式說明 -->
      <div class="attack-pattern">
        <h3 class="attack-pattern__title">攻擊模式</h3>
        <p class="attack-pattern__text">{{ weaponData.description.attackPattern }}</p>
        <p class="attack-pattern__text attack-pattern__text--highlight">
          {{ weaponData.description.strategy }}
        </p>
      </div>
    </section>

    <!-- ========================================
         Acquisition - 取得途徑
         ======================================== -->
    <section class="section-card">
      <h2 id="acquisition" class="section-heading">
        <Package :size="20" class="section-heading__icon" />
        <span>取得途徑</span>
      </h2>
      
      <div class="acquisition-card">
        <div class="acquisition-card__source">
          <img 
            :src="weaponData.acquisition.sourceIcon" 
            :alt="weaponData.acquisition.source"
            class="acquisition-card__icon"
          />
          <div class="acquisition-card__info">
            <span class="acquisition-card__source-name">
              {{ weaponData.acquisition.source }}
            </span>
            <span class="acquisition-card__source-en">
              {{ weaponData.acquisition.sourceEn }}
            </span>
          </div>
        </div>
        
        <div class="acquisition-card__chance">
          <span class="acquisition-card__chance-label">掉落機率</span>
          <span class="acquisition-card__chance-value">
            {{ weaponData.acquisition.chance }}
          </span>
          <span class="acquisition-card__chance-raw">
            ({{ weaponData.acquisition.chanceRaw }})
          </span>
        </div>
      </div>
      
      <p class="acquisition-note">
        💡 {{ weaponData.acquisition.notes }}
      </p>
    </section>
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
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
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
  background: radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%);
  filter: blur(20px);
  animation: icon-glow 3s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
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
  filter: drop-shadow(0 0 12px rgba(236, 72, 153, 0.5));
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

.badge--type {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
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
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  border-radius: 0.5rem;
  color: white;
  flex-shrink: 0;
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
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-card__desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* 最佳前綴 - 特殊樣式 */
.best-modifier {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #fbbf24;
  border-radius: 0.75rem;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
}

.best-modifier::before {
  content: '★';
  position: absolute;
  top: -10px;
  right: 10px;
  font-size: 3rem;
  opacity: 0.1;
}

.best-modifier__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.best-modifier__icon {
  color: #d97706;
}

.best-modifier__label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #92400e;
}

.best-modifier__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.best-modifier__name {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.best-modifier__name-zh {
  font-size: 1.5rem;
  font-weight: 700;
  color: #78350f;
}

.best-modifier__name-en {
  font-size: 1rem;
  color: #92400e;
  font-style: italic;
}

.best-modifier__desc {
  font-size: 0.875rem;
  color: #92400e;
  margin: 0;
  line-height: 1.5;
}

/* ==========================================
   Strategy Section
   ========================================== */
.strategy-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.strategy-card {
  padding: 1.25rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-main);
}

.strategy-card--ammo {
  border-left: 4px solid #10b981;
}

.strategy-card--boss {
  border-left: 4px solid #ef4444;
}

.strategy-card--accessories {
  border-left: 4px solid #8b5cf6;
}

.strategy-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.strategy-card__item-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
}

.strategy-card__boss-icon {
  font-size: 1.75rem;
}

.strategy-card__header-text {
  display: flex;
  flex-direction: column;
}

.strategy-card__title {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.125rem;
}

.strategy-card__item-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.strategy-card__item-name small {
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-left: 0.25rem;
}

.strategy-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.strategy-card__list {
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.strategy-card__list-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.strategy-card__list-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* 攻擊模式 */
.attack-pattern {
  padding: 1.25rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #93c5fd;
  border-radius: 0.625rem;
}

.attack-pattern__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 0.75rem;
}

.attack-pattern__text {
  font-size: 0.875rem;
  color: #1e3a8a;
  margin: 0 0 0.75rem;
  line-height: 1.6;
}

.attack-pattern__text:last-child {
  margin-bottom: 0;
}

.attack-pattern__text--highlight {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.375rem;
  border-left: 3px solid #3b82f6;
}

/* ==========================================
   Acquisition Section
   ========================================== */
.acquisition-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

.acquisition-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  gap: 1rem;
  flex-wrap: wrap;
}

.acquisition-card__source {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.acquisition-card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.acquisition-card__info {
  display: flex;
  flex-direction: column;
}

.acquisition-card__source-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.acquisition-card__source-en {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.acquisition-card__chance {
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-radius: 0.5rem;
}

.acquisition-card__chance-label {
  font-size: 0.75rem;
  color: #166534;
  font-weight: 500;
}

.acquisition-card__chance-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #15803d;
}

.acquisition-card__chance-raw {
  font-size: 0.8125rem;
  color: #166534;
}

.acquisition-note {
  margin: 1rem 0 0;
  padding: 0.75rem 1rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #92400e;
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
  
  .strategy-grid {
    grid-template-columns: 1fr;
  }
  
  .acquisition-card {
    flex-direction: column;
    text-align: center;
  }
  
  .acquisition-card__source {
    flex-direction: column;
  }
}
</style>
