<script setup lang="ts">
import { Package } from "lucide-vue-next";
import type { BossDrop } from "@/data/boss/types";

interface Props {
  drops: BossDrop[];
}

defineProps<Props>();
</script>

<template>
  <section class="section-card drops-section">
    <h2 id="drops" class="section-heading">
      <span class="section-heading__accent-line"></span>
      <Package :size="20" class="section-heading__icon" />
      <span class="section-heading__text">掉落物</span>
    </h2>

    <!-- 機械紋理背景 -->
    <div class="drops-background" aria-hidden="true">
      <div class="drops-background__circuit"></div>
      <div class="drops-background__glow"></div>
    </div>

    <div class="drops-grid">
      <div
        v-for="(drop, index) in drops"
        :key="drop.name"
        :class="['drop-card', { 'drop-card--highlight': drop.highlight }]"
        :style="{ '--animation-delay': `${index * 0.08}s` }"
      >
        <!-- 核心物品的光暈效果 -->
        <div v-if="drop.highlight" class="drop-card__aura" aria-hidden="true"></div>

        <!-- 物品圖標 -->
        <div class="drop-card__icon-wrapper">
          <img :src="drop.icon" :alt="drop.name" class="drop-card__icon" />
          <div class="drop-card__icon-glow" aria-hidden="true"></div>
        </div>

        <!-- 內容區 -->
        <div class="drop-card__content">
          <div class="drop-card__header">
            <span class="drop-card__name">
              {{ drop.name }}
              <span v-if="drop.highlight" class="drop-card__star" aria-label="核心掉落">⭐</span>
            </span>
            <span
              :class="[
                'drop-card__chance',
                {
                  'drop-card__chance--guaranteed': drop.chance === '100%',
                },
              ]"
            >
              <span v-if="drop.chance === '100%'" class="drop-card__chance-icon">✓</span>
              {{ drop.chance === "100%" ? "必掉" : drop.chance }}
            </span>
          </div>
          <span class="drop-card__name-en">{{ drop.nameEn }}</span>
          <span class="drop-card__amount">數量：{{ drop.amount }}</span>
          <p class="drop-card__desc">{{ drop.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   Section Container
   ========================================== */
.drops-section {
  position: relative;
  overflow: hidden;
}

/* ==========================================
   Section Heading (統一樣式)
   ========================================== */
.section-heading {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0 0 1.5rem;
  position: relative;
  z-index: 2;
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

/* ==========================================
   Background Atmosphere - 機械紋理與氛圍
   ========================================== */
.drops-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
}

/* 機械電路紋理 */
.drops-background__circuit {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}

/* 頂部藍光照明 */
.drops-background__glow {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(59, 130, 246, 0.12) 0%,
    transparent 70%
  );
}

/* ==========================================
   Drops Grid
   ========================================== */
.drops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  position: relative;
  z-index: 1;
}

/* ==========================================
   Drop Card - Glassmorphism 玻璃材質
   ========================================== */
.drop-card {
  position: relative;
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: color-mix(in srgb, var(--color-bg-main) 85%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  border-radius: 0.625rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 入場動畫 */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease-out forwards;
  animation-delay: var(--animation-delay, 0s);
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover 效果 */
.drop-card:hover {
  transform: translateY(-4px);
  background: color-mix(in srgb, var(--color-bg-main) 90%, transparent);
  border-color: color-mix(in srgb, var(--color-border) 80%, transparent);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.15);
}

:global(.dark) .drop-card:hover {
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.4);
}

/* ==========================================
   Highlight Card - 核心掉落物（柔和光暈）
   ========================================== */
.drop-card--highlight {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, #8b5cf6 8%, var(--color-bg-main) 85%),
    color-mix(in srgb, var(--color-bg-main) 85%, transparent)
  );
  border-color: rgba(139, 92, 246, 0.3);
}

.drop-card--highlight:hover {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, #8b5cf6 12%, var(--color-bg-main) 90%),
    color-mix(in srgb, var(--color-bg-main) 90%, transparent)
  );
  border-color: rgba(139, 92, 246, 0.5);
}

/* 核心物品外光暈 */
.drop-card__aura {
  position: absolute;
  inset: -8px;
  background: radial-gradient(
    ellipse at center,
    rgba(139, 92, 246, 0.25) 0%,
    rgba(59, 130, 246, 0.15) 40%,
    transparent 70%
  );
  border-radius: 0.75rem;
  filter: blur(12px);
  z-index: -1;
  pointer-events: none;
  animation: auraGlow 3s ease-in-out infinite;
}

@keyframes auraGlow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* 金色光邊 (最外層) */
.drop-card--highlight::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.2),
    transparent 30%,
    transparent 70%,
    rgba(251, 191, 36, 0.1)
  );
  border-radius: 0.625rem;
  z-index: -1;
  pointer-events: none;
  opacity: 0.6;
}

/* ==========================================
   Icon - 物品圖標與微光
   ========================================== */
.drop-card__icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.drop-card__icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.drop-card:hover .drop-card__icon {
  animation: iconFloat 0.6s ease-in-out;
}

@keyframes iconFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* 圖標微光 */
.drop-card__icon-glow {
  position: absolute;
  inset: -4px;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 60%
  );
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.drop-card:hover .drop-card__icon-glow {
  opacity: 1;
}

.drop-card--highlight .drop-card__icon {
  width: 52px;
  height: 52px;
}

.drop-card--highlight .drop-card__icon-wrapper {
  width: 52px;
  height: 52px;
}

/* ==========================================
   Content
   ========================================== */
.drop-card__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.drop-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.125rem;
}

.drop-card__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.drop-card__star {
  display: inline-block;
  margin-left: 0.25rem;
  animation: starTwinkle 2s ease-in-out infinite;
}

@keyframes starTwinkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* ==========================================
   Chance Badge - 精緻化機率標籤
   ========================================== */
.drop-card__chance {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: rgba(100, 116, 139, 1);
  padding: 0.25rem 0.5rem;
  background: color-mix(in srgb, rgba(100, 116, 139, 0.12), transparent);
  border: 1px solid rgba(100, 116, 139, 0.2);
  border-radius: 9999px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

:global(.dark) .drop-card__chance {
  color: rgba(148, 163, 184, 1);
  background: color-mix(in srgb, rgba(148, 163, 184, 0.15), transparent);
  border-color: rgba(148, 163, 184, 0.25);
}

/* 100% 必掉 - 金色肯定色 */
.drop-card__chance--guaranteed {
  color: rgba(234, 179, 8, 1);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, #eab308 18%, transparent),
    color-mix(in srgb, #fbbf24 15%, transparent)
  );
  border-color: rgba(234, 179, 8, 0.35);
  font-weight: 700;
}

:global(.dark) .drop-card__chance--guaranteed {
  color: rgba(250, 204, 21, 1);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, #facc15 20%, transparent),
    color-mix(in srgb, #fbbf24 18%, transparent)
  );
  border-color: rgba(250, 204, 21, 0.4);
}

.drop-card:hover .drop-card__chance--guaranteed {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, #eab308 25%, transparent),
    color-mix(in srgb, #fbbf24 22%, transparent)
  );
  border-color: rgba(234, 179, 8, 0.5);
}

.drop-card__chance-icon {
  font-size: 0.625rem;
  font-weight: 700;
}

/* ==========================================
   Other Info
   ========================================== */
.drop-card__name-en {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  opacity: 0.8;
}

.drop-card__amount {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-top: 0.125rem;
}

.drop-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0;
  line-height: 1.5;
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 640px) {
  .drops-grid {
    grid-template-columns: 1fr;
  }

  .drop-card {
    padding: 0.875rem;
  }

  .drop-card__icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .drop-card--highlight .drop-card__icon-wrapper {
    width: 44px;
    height: 44px;
  }

  .drop-card__icon,
  .drop-card--highlight .drop-card__icon {
    width: 100%;
    height: 100%;
  }
}
</style>

