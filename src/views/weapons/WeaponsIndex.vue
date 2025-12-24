<script setup>
import { Crosshair, Star, ChevronRight } from 'lucide-vue-next'
import { weapons as weaponData, classColors } from '@/data/weapons'

/**
 * 武器圖鑑 - 索引頁面
 * 
 * 顯示所有困難模式 Tier 1 推薦武器的網格列表
 */

// 將武器資料轉換為列表顯示格式
const weapons = weaponData.map(w => ({
  ...w,
  id: w.slug,
  damage: w.stats.damage.value,
  path: `/weapons/${w.slug}`,
}))

// 職業圖示對應
const classIcons = {
  'Ranger': '🏹',
  'Melee': '⚔️',
  'Mage': '🔮',
  'Summoner': '👻',
}

// 取得職業顏色
const getClassColor = (className) => classColors[className]?.hex || '#6b7280'
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

    <!-- 說明區塊 -->
    <section class="intro-section">
      <p class="intro-text">
        進入困難模式後，你需要更強大的武器來面對新的威脅。以下是各職業在擊敗機械 Boss 前的最佳武器推薦，
        它們易於取得且威力強大，能幫助你順利通過困難模式初期。
      </p>
    </section>

    <!-- 武器網格 -->
    <section class="weapons-grid">
      <RouterLink
        v-for="weapon in weapons"
        :key="weapon.id"
        :to="weapon.path"
        class="weapon-card"
        :style="{ '--class-color': getClassColor(weapon.class) }"
      >
        <!-- 職業標籤 -->
        <div class="weapon-card__class-badge">
          <span class="weapon-card__class-icon">{{ classIcons[weapon.class] }}</span>
          <span class="weapon-card__class-label">{{ weapon.classLabel }}</span>
        </div>

        <!-- 武器圖示 -->
        <div class="weapon-card__icon-wrapper">
          <div class="weapon-card__icon-glow"></div>
          <img 
            :src="weapon.icon" 
            :alt="weapon.name"
            class="weapon-card__icon"
          />
        </div>

        <!-- 武器資訊 -->
        <div class="weapon-card__info">
          <h3 class="weapon-card__name">{{ weapon.name }}</h3>
          <p class="weapon-card__name-en">{{ weapon.nameEn }}</p>
          <p class="weapon-card__description">{{ weapon.description }}</p>
          
          <div class="weapon-card__stats">
            <div class="weapon-card__damage">
              <span class="weapon-card__damage-value">{{ weapon.damage }}</span>
              <span class="weapon-card__damage-label">傷害</span>
            </div>
            <div class="weapon-card__rarity">
              <Star :size="14" :style="{ color: weapon.rarity.color }" />
              <span>稀有度 {{ weapon.rarity.level }}</span>
            </div>
          </div>
        </div>

        <!-- 查看按鈕 -->
        <div class="weapon-card__action">
          <span>查看詳情</span>
          <ChevronRight :size="18" />
        </div>
      </RouterLink>
    </section>

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
  max-width: 1200px;
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
   說明區塊
   ========================================== */
.intro-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .intro-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.intro-text {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ==========================================
   武器網格
   ========================================== */
.weapons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1rem;
}

.weapon-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  overflow: hidden;
}

.weapon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--class-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.weapon-card:hover {
  border-color: var(--class-color);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}

.weapon-card:hover::before {
  transform: scaleX(1);
}

/* 職業標籤 */
.weapon-card__class-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--class-color);
  border-radius: 9999px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 武器圖示 */
.weapon-card__icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.weapon-card__icon-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, var(--class-color) 0%, transparent 70%);
  opacity: 0.2;
  filter: blur(12px);
  transition: opacity 0.3s ease;
}

.weapon-card:hover .weapon-card__icon-glow {
  opacity: 0.4;
}

.weapon-card__icon {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
}

.weapon-card:hover .weapon-card__icon {
  transform: scale(1.1) rotate(-5deg);
}

/* 武器資訊 */
.weapon-card__info {
  flex: 1;
}

.weapon-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem;
}

.weapon-card__name-en {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin: 0 0 0.75rem;
  font-style: italic;
}

.weapon-card__description {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.weapon-card__stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.weapon-card__damage {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.weapon-card__damage-value {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--class-color);
}

.weapon-card__damage-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.weapon-card__rarity {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* 查看按鈕 */
.weapon-card__action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-bg-main);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.weapon-card:hover .weapon-card__action {
  background: var(--class-color);
  color: white;
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

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 768px) {
  .weapons-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>

