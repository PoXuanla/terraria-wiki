<script setup lang="ts">
import { Package } from "lucide-vue-next";
import type { BossDrop } from "@/data/boss/types";

interface Props {
  drops: BossDrop[];
}

defineProps<Props>();

// 生成漂浮粒子数据
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: i * 0.3,
  duration: 8 + i * 0.5,
  x: Math.random() * 100,
}));
</script>

<template>
  <section class="section-card drops-section">
    <h2 id="drops" class="section-heading">
      <span class="section-heading__accent-line"></span>
      <Package :size="20" class="section-heading__icon" />
      <span class="section-heading__text">掉落物</span>
    </h2>

    <!-- 藏宝库能量场背景 -->
    <div class="drops-background" aria-hidden="true">
      <!-- 放射状聚光灯 -->
      <div class="drops-background__circuit"></div>
      <!-- 六角形科技网格 -->
      <div class="drops-background__glow"></div>
      <!-- 神圣光束 -->
      <div class="drops-background__god-rays">
        <div class="god-ray god-ray--1"></div>
        <div class="god-ray god-ray--2"></div>
        <div class="god-ray god-ray--3"></div>
      </div>
      <!-- 漂浮粒子 -->
      <div class="drops-background__particles">
        <div
          class="particle"
          v-for="particle in particles"
          :key="particle.id"
          :style="{
            '--particle-delay': `${particle.delay}s`,
            '--particle-duration': `${particle.duration}s`,
            '--particle-x': `${particle.x}%`
          }"
        ></div>
      </div>
      <!-- 金属边框装饰 -->
      <div class="drops-background__frame-top"></div>
      <div class="drops-background__frame-bottom"></div>
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
   Section Container - 藏宝库容器
   ========================================== */
.drops-section {
  position: relative;
  overflow: hidden;
  padding: 2rem;
  background: linear-gradient(
    180deg,
    rgba(9, 9, 11, 0.4) 0%,
    rgba(17, 17, 19, 0.6) 50%,
    rgba(9, 9, 11, 0.4) 100%
  );
  border-radius: 1rem;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.8), inset 0 2px 1px rgba(255, 255, 255, 0.05);
}

:global(.dark) .drops-section {
  box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.9), inset 0 2px 1px rgba(255, 255, 255, 0.08);
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
   Background Atmosphere - 藏宝库能量场
   ========================================== */
.drops-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* 1. 放射状聚光灯 - 中心舞台效果 */
.drops-background__circuit {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(88, 28, 135, 0.35) 0%,
    rgba(59, 130, 246, 0.15) 30%,
    rgba(17, 24, 39, 0.05) 60%,
    transparent 100%
  );
  animation: spotlightPulse 8s ease-in-out infinite;
}

@keyframes spotlightPulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* 2. 六角形科技网格 */
.drops-background__glow {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(30deg, rgba(139, 92, 246, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(139, 92, 246, 0.02) 87.5%, rgba(139, 92, 246, 0.02)),
    linear-gradient(150deg, rgba(139, 92, 246, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(139, 92, 246, 0.02) 87.5%, rgba(139, 92, 246, 0.02)),
    linear-gradient(30deg, rgba(139, 92, 246, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(139, 92, 246, 0.02) 87.5%, rgba(139, 92, 246, 0.02)),
    linear-gradient(150deg, rgba(139, 92, 246, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(139, 92, 246, 0.02) 87.5%, rgba(139, 92, 246, 0.02)),
    linear-gradient(60deg, rgba(59, 130, 246, 0.03) 25%, transparent 25.5%, transparent 75%, rgba(59, 130, 246, 0.03) 75%, rgba(59, 130, 246, 0.03)),
    linear-gradient(60deg, rgba(59, 130, 246, 0.03) 25%, transparent 25.5%, transparent 75%, rgba(59, 130, 246, 0.03) 75%, rgba(59, 130, 246, 0.03));
  background-size: 80px 140px;
  background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
  opacity: 0.4;
  mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
}


/* 3. 神圣光束 (God Rays) - 史诗感 */
.drops-background__god-rays {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.god-ray {
  position: absolute;
  top: -50%;
  width: 120px;
  height: 200%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(251, 191, 36, 0.08) 20%,
    rgba(251, 191, 36, 0.04) 50%,
    transparent 100%
  );
  filter: blur(20px);
  transform-origin: top center;
  opacity: 0;
  animation: rayShine 12s ease-in-out infinite;
}

:global(.dark) .god-ray {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(251, 191, 36, 0.12) 20%,
    rgba(251, 191, 36, 0.06) 50%,
    transparent 100%
  );
}

.god-ray--1 {
  left: 20%;
  transform: rotate(-15deg);
  animation-delay: 0s;
}

.god-ray--2 {
  left: 50%;
  transform: translateX(-50%) rotate(5deg);
  animation-delay: 4s;
}

.god-ray--3 {
  right: 20%;
  transform: rotate(12deg);
  animation-delay: 8s;
}

@keyframes rayShine {
  0%, 100% {
    opacity: 0;
  }
  10%, 30% {
    opacity: 0.6;
  }
  40%, 100% {
    opacity: 0;
  }
}

/* 4. 漂浮粒子 - 能量满溢 */
.drops-background__particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  bottom: -10px;
  left: var(--particle-x);
  width: 3px;
  height: 3px;
  background: rgba(251, 191, 36, 0.6);
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(251, 191, 36, 0.8), 0 0 8px rgba(251, 191, 36, 0.4);
  animation: particleFloat var(--particle-duration, 10s) ease-in-out infinite;
  animation-delay: var(--particle-delay, 0s);
  opacity: 0;
}

:global(.dark) .particle {
  background: rgba(251, 191, 36, 0.8);
  box-shadow: 0 0 6px rgba(251, 191, 36, 1), 0 0 12px rgba(251, 191, 36, 0.6);
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) translateX(20px);
    opacity: 0;
  }
}

/* 5. 金属边框装饰 - 箱子边缘 */
.drops-background__frame-top,
.drops-background__frame-bottom {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(251, 191, 36, 0.3) 20%,
    rgba(251, 191, 36, 0.5) 50%,
    rgba(251, 191, 36, 0.3) 80%,
    transparent 100%
  );
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}

.drops-background__frame-top {
  top: 0;
}

.drops-background__frame-bottom {
  bottom: 0;
}

:global(.dark) .drops-background__frame-top,
:global(.dark) .drops-background__frame-bottom {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(251, 191, 36, 0.4) 20%,
    rgba(251, 191, 36, 0.6) 50%,
    rgba(251, 191, 36, 0.4) 80%,
    transparent 100%
  );
  box-shadow: 0 0 12px rgba(251, 191, 36, 0.6);
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 入場動畫 */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease-out forwards, cardFloat 3s ease-in-out infinite;
  animation-delay: var(--animation-delay, 0s), calc(var(--animation-delay, 0s) + 0.6s);
}

:global(.dark) .drop-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

/* Hover 效果 */
.drop-card:hover {
  animation-play-state: paused;
  transform: translateY(-8px);
  background: color-mix(in srgb, var(--color-bg-main) 90%, transparent);
  border-color: color-mix(in srgb, var(--color-border) 80%, transparent);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

:global(.dark) .drop-card:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
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

