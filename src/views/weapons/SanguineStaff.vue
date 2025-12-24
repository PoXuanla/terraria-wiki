<script setup>
import WeaponLayout from "@/components/WeaponLayout.vue";
import { Zap, ChevronRight } from 'lucide-vue-next'
import { sanguineStaff as weaponData } from "@/data/weapons";
</script>

<template>
  <WeaponLayout :weapon="weaponData">
    <!-- 戰術指南 -->
    <section class="section-card">
      <h2 id="strategy" class="section-heading">
        <Zap :size="20" class="section-heading__icon" />
        <span>戰術指南</span>
      </h2>
      
      <div class="strategy-grid">
        <!-- 推薦鞭子 -->
        <div class="strategy-card strategy-card--ammo">
          <div class="strategy-card__header">
            <img 
              :src="weaponData.meta.bestWhip.icon" 
              :alt="weaponData.meta.bestWhip.name"
              class="strategy-card__item-icon"
            />
            <div class="strategy-card__header-text">
              <span class="strategy-card__title">推薦鞭子</span>
              <span class="strategy-card__item-name">
                {{ weaponData.meta.bestWhip.name }}
                <small>({{ weaponData.meta.bestWhip.nameEn }})</small>
              </span>
            </div>
          </div>
          <p class="strategy-card__desc">{{ weaponData.meta.bestWhip.description }}</p>
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
        <p class="attack-pattern__text">{{ weaponData.detailedDescription.attackPattern }}</p>
        <p class="attack-pattern__text attack-pattern__text--highlight">
          {{ weaponData.detailedDescription.strategy }}
        </p>
      </div>
    </section>
  </WeaponLayout>
</template>

<style scoped>
/* Section Card */
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
  scroll-margin-top: 6rem;
}

.section-heading__icon {
  color: var(--color-primary);
}

/* Strategy Grid */
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

:global(.dark) .attack-pattern {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
  border-color: rgba(59, 130, 246, 0.3);
}

.attack-pattern__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 0.75rem;
}

:global(.dark) .attack-pattern__title {
  color: #93c5fd;
}

.attack-pattern__text {
  font-size: 0.875rem;
  color: #1e3a8a;
  margin: 0 0 0.75rem;
  line-height: 1.6;
}

:global(.dark) .attack-pattern__text {
  color: #bfdbfe;
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

:global(.dark) .attack-pattern__text--highlight {
  background: rgba(59, 130, 246, 0.15);
}

/* 響應式 */
@media (max-width: 640px) {
  .strategy-grid {
    grid-template-columns: 1fr;
  }
}
</style>
