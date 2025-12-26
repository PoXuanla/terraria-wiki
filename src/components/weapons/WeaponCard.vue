<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { WeaponData } from '@/data/weapons/types'

/**
 * WeaponCard - 武器圖鑑列表卡片
 * 
 * 展示武器預覽資訊，用於武器列表頁面
 * 包含：稀有度光暈、雙核心數據、機制標籤
 */

interface Props {
  weapon: WeaponData
}

const props = defineProps<Props>()

// 職業圖示對應
const classIcons: Record<string, string> = {
  Ranger: '🏹',
  Melee: '⚔️',
  Mage: '🔮',
  Summoner: '👻',
}

// 職業顏色對應
const classColors: Record<string, string> = {
  Ranger: '#22c55e',
  Melee: '#ef4444',
  Mage: '#8b5cf6',
  Summoner: '#06b6d4',
}

// 計算屬性
const classIcon = computed(() => classIcons[props.weapon.class] || '⚔️')
const classColor = computed(() => classColors[props.weapon.class] || '#6366f1')

// 路由路徑
const weaponPath = computed(() => `/weapons/${props.weapon.slug}`)

// 傷害值
const damage = computed(() => props.weapon.stats.damage.value)

// 攻速描述
const useTimeDesc = computed(() => props.weapon.stats.useTime?.description || '—')

// 機制標籤
const autoReuse = computed(() => props.weapon.mechanics?.input?.autoReuse || false)
const trueMelee = computed(() => props.weapon.mechanics?.combat?.trueMelee || false)
const hasDebuff = computed(() => (props.weapon.mechanics?.combat?.debuffs?.length || 0) > 0)
const debuffName = computed(() => props.weapon.mechanics?.combat?.debuffs?.[0]?.name || '')
const piercing = computed(() => props.weapon.mechanics?.projectile?.piercing)
const homing = computed(() => props.weapon.mechanics?.projectile?.homing)
const summonSlots = computed(() => props.weapon.mechanics?.summon?.slots)
</script>

<template>
  <RouterLink
    :to="weaponPath"
    class="weapon-card"
    :style="{ 
      '--class-color': classColor,
      '--rarity-color': weapon.rarity.color 
    }"
  >
    <!-- 透明浮水印背景 -->
    <img
      :src="weapon.icon"
      :alt="weapon.name"
      class="weapon-card__watermark"
    />

    <!-- 稀有度標籤 -->
    <div class="weapon-card__rarity-badge">
      <span class="weapon-card__rarity-text">R{{ weapon.rarity.level }}</span>
    </div>

    <!-- 職業標籤 -->
    <div class="weapon-card__class-badge">
      <span class="weapon-card__class-icon">{{ classIcon }}</span>
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
      <h3 
        class="weapon-card__name"
        :style="{ color: weapon.rarity.color }"
      >
        {{ weapon.name }}
      </h3>
      <p class="weapon-card__name-en">{{ weapon.nameEn }}</p>

      <!-- 雙核心數據：傷害 | 攻速 -->
      <div class="weapon-card__core-stats">
        <div class="weapon-card__stat">
          <span class="weapon-card__stat-value">{{ damage }}</span>
          <span class="weapon-card__stat-label">傷害</span>
        </div>
        <div class="weapon-card__stat-divider"></div>
        <div class="weapon-card__stat">
          <span class="weapon-card__stat-value weapon-card__stat-value--speed">
            {{ useTimeDesc }}
          </span>
          <span class="weapon-card__stat-label">攻速</span>
        </div>
      </div>

      <!-- Mini Tags：機制標籤 -->
      <div class="weapon-card__tags">
        <span v-if="autoReuse" class="weapon-card__tag weapon-card__tag--auto">
          🔄 自動
        </span>
        <span v-if="trueMelee" class="weapon-card__tag weapon-card__tag--melee">
          ⚔️ 真近戰
        </span>
        <span v-if="hasDebuff" class="weapon-card__tag weapon-card__tag--debuff">
          💀 {{ debuffName }}
        </span>
        <span v-if="piercing === -1" class="weapon-card__tag weapon-card__tag--pierce">
          ∞ 穿透
        </span>
        <span v-else-if="piercing && piercing > 0" class="weapon-card__tag weapon-card__tag--pierce">
          ⟐ 穿透 {{ piercing }}
        </span>
        <span v-if="homing" class="weapon-card__tag weapon-card__tag--homing">
          🎯 追蹤
        </span>
        <span v-if="summonSlots" class="weapon-card__tag weapon-card__tag--summon">
          👻 {{ summonSlots }} 欄位
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.weapon-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  border: 2px solid var(--color-border);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
}

/* 稀有度邊框光暈 */
.weapon-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, var(--rarity-color), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  pointer-events: none;
}

.weapon-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  background: var(--color-bg-card);
  z-index: 0;
}

.weapon-card > * {
  position: relative;
  z-index: 1;
}

.weapon-card:hover {
  border-color: var(--rarity-color);
  transform: translateY(-6px);
  box-shadow: 
    0 16px 32px -8px rgba(0, 0, 0, 0.25),
    0 0 0 1px var(--rarity-color),
    0 0 20px -2px var(--rarity-color);
}

.weapon-card:hover::before {
  opacity: 0.15;
}

/* 稀有度標籤 */
.weapon-card__rarity-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--rarity-color);
  border-radius: 0.375rem;
  color: white;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 
    0 2px 8px -2px var(--rarity-color),
    0 0 0 2px var(--color-bg-card);
  transition: transform 0.3s ease;
}

.weapon-card:hover .weapon-card__rarity-badge {
  transform: scale(1.1);
}

.weapon-card__rarity-text {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 職業標籤 */
.weapon-card__class-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  background: var(--class-color);
  border-radius: 9999px;
  color: white;
  font-size: 0.6875rem;
  font-weight: 600;
}

/* 透明浮水印 */
.weapon-card__watermark {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 120px;
  height: 120px;
  object-fit: contain;
  image-rendering: pixelated;
  opacity: 0.06;
  transform: rotate(-15deg);
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.weapon-card:hover .weapon-card__watermark {
  opacity: 0.1;
  transform: rotate(-10deg) scale(1.05);
}

/* 武器圖示 */
.weapon-card__icon-wrapper {
  position: relative;
  width: 56px;
  height: 56px;
  margin-bottom: 0.625rem;
}

.weapon-card__icon-glow {
  position: absolute;
  inset: -16px;
  background: radial-gradient(circle, var(--rarity-color) 0%, transparent 70%);
  opacity: 0.2;
  filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.weapon-card:hover .weapon-card__icon-glow {
  inset: -40px;
  opacity: 0.8;
  filter: blur(24px);
}

.weapon-card__icon {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.weapon-card:hover .weapon-card__icon {
  transform: scale(1.15) rotate(-5deg);
}

/* 武器資訊 */
.weapon-card__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.weapon-card__name {
  font-size: 1.0625rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.weapon-card__name-en {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin: -0.25rem 0 0;
  font-style: italic;
  font-weight: 500;
  opacity: 0.85;
}


/* 雙核心數據 */
.weapon-card__core-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.weapon-card__stat {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.weapon-card__stat-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1;
}

.weapon-card__stat-value--speed {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--rarity-color);
}

.weapon-card__stat-label {
  font-size: 0.625rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.weapon-card__stat-divider {
  width: 1px;
  height: 24px;
  background: var(--color-border);
}

/* Mini Tags */
.weapon-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: auto;
}

.weapon-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.1875rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
  background: var(--color-bg-main);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.weapon-card__tag--auto {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  color: #10b981;
}

:deep(.dark) .weapon-card__tag--auto {
  background: rgba(16, 185, 129, 0.15);
  color: #6ee7b7;
}

.weapon-card__tag--melee {
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.3);
  color: #f97316;
}

:deep(.dark) .weapon-card__tag--melee {
  background: rgba(249, 115, 22, 0.15);
  color: #fdba74;
}

.weapon-card__tag--debuff {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

:deep(.dark) .weapon-card__tag--debuff {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.weapon-card__tag--pierce {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #3b82f6;
}

:deep(.dark) .weapon-card__tag--pierce {
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
}

.weapon-card__tag--homing {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.3);
  color: #a855f7;
}

:deep(.dark) .weapon-card__tag--homing {
  background: rgba(168, 85, 247, 0.15);
  color: #d8b4fe;
}

.weapon-card__tag--summon {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  color: #6366f1;
}

:deep(.dark) .weapon-card__tag--summon {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}
</style>

