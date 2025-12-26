<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { BossData } from '@/data/boss/types';
import { isTheTwins, isTheDestroyer, isSkeletronPrime } from '@/data/boss/types';

/**
 * Boss Monolith - 巨石碑卡片
 * 展示單個 Boss 的宏大、可怕的卡片
 */

interface Props {
  boss: BossData;
  priority?: 'normal' | 'featured'; // featured = 雙倍寬度
  isFocused?: boolean; // 是否被聚焦
  isDimmed?: boolean; // 是否被變暗
}

const props = withDefaults(defineProps<Props>(), {
  priority: 'normal',
  isFocused: false,
  isDimmed: false,
});

const router = useRouter();

// 獲取 Boss 圖標
const bossIcon = computed(() => {
  if (isTheTwins(props.boss)) {
    return props.boss.icons.retinazer;
  } else if (isTheDestroyer(props.boss)) {
    return props.boss.icon;
  } else if (isSkeletronPrime(props.boss)) {
    return props.boss.icon;
  }
  return '';
});

// Boss 主題色配置
const bossThemeColor = computed(() => {
  const themeColors: Record<string, string> = {
    'the-twins': '#dc2626',       // 紅色 (雷射眼)
    'the-destroyer': '#f472b6',   // 粉色 (機械蟲)
    'skeletron-prime': '#a855f7', // 紫色 (骷髏)
  };
  return themeColors[props.boss.slug] || '#6366f1';
});

// Boss 眼睛發光顏色 (用於剪影狀態)
const bossEyeGlow = computed(() => {
  const eyeColors: Record<string, string[]> = {
    'the-twins': ['#dc2626', '#22c55e'],  // 紅綠雙眼
    'the-destroyer': ['#f472b6'],         // 粉色探測器
    'skeletron-prime': ['#ef4444'],       // 紅色眼睛
  };
  return eyeColors[props.boss.slug] || ['#ef4444'];
});

// 點擊跳轉到 Boss 詳情頁
const navigateToBoss = () => {
  router.push(`/boss/${props.boss.slug}`);
};

// Boss 基礎數據 (hover 時顯示)
const bossStats = computed(() => {
  if (isTheDestroyer(props.boss)) {
    return {
      hp: props.boss.stats.main.hp.toLocaleString(),
      defense: props.boss.stats.main.defense,
      damage: props.boss.stats.main.damage,
    };
  } else if (isSkeletronPrime(props.boss)) {
    // 骷髏王取頭部數據
    const head = props.boss.parts.find(p => p.nameEn === 'Head');
    return {
      hp: head?.hp.toLocaleString() || 'N/A',
      defense: head?.defense || 0,
      damage: head?.damage || 0,
    };
  } else if (isTheTwins(props.boss)) {
    // 雙子取平均值
    const avgHp = (props.boss.twins.retinazer.stats.maxLife + props.boss.twins.spazmatism.stats.maxLife) / 2;
    return {
      hp: Math.round(avgHp).toLocaleString(),
      defense: props.boss.twins.retinazer.stats.defense,
      damage: props.boss.twins.retinazer.stats.damage,
    };
  }
  return { hp: 'N/A', defense: 0, damage: 0 };
});
</script>

<template>
  <article
    class="boss-monolith"
    :class="{
      'is-featured': priority === 'featured',
      'is-focused': isFocused,
      'is-dimmed': isDimmed,
    }"
    @click="navigateToBoss"
  >
    <!-- 背光效果 (God Rays) -->
    <div class="backlight" :style="{ '--theme-color': bossThemeColor }"></div>

    <!-- 卡片內容 -->
    <div class="monolith-content">
      <!-- Boss 圖片 - 剪影效果 -->
      <div class="boss-image-container">
        <!-- 原圖 (全彩，hover 時顯示) -->
        <img
          :src="bossIcon"
          :alt="boss.name"
          class="boss-image boss-image-color"
          loading="lazy"
        />
        <!-- 剪影 (黑白，默認顯示) -->
        <img
          :src="bossIcon"
          :alt="boss.name"
          class="boss-image boss-image-silhouette"
          loading="lazy"
        />
        
        <!-- 發光的眼睛 -->
        <div class="boss-eyes">
          <div
            v-for="(color, index) in bossEyeGlow"
            :key="index"
            class="eye-glow"
            :style="{
              '--eye-color': color,
              left: bossEyeGlow.length > 1 ? (index === 0 ? '35%' : '65%') : '50%',
            }"
          ></div>
        </div>

        <!-- 底部霧氣 -->
        <div class="bottom-fog"></div>
      </div>

      <!-- Boss 名稱 - 封印條 -->
      <div class="boss-nameplate">
        <h2 class="boss-name">{{ boss.name }}</h2>
        <p class="boss-name-en">{{ boss.nameEn }}</p>
      </div>

      <!-- Boss 數據 (hover 時顯示) -->
      <div class="boss-stats">
        <div class="stat-item">
          <span class="stat-label">HP</span>
          <span class="stat-value">{{ bossStats.hp }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">DEF</span>
          <span class="stat-value">{{ bossStats.defense }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">DMG</span>
          <span class="stat-value">{{ bossStats.damage }}</span>
        </div>
      </div>

      <!-- Boss 類型標籤 -->
      <div class="boss-type-badge">{{ boss.type }}</div>
    </div>

    <!-- 邊框光效 -->
    <div class="border-glow" :style="{ '--theme-color': bossThemeColor }"></div>
  </article>
</template>

<style scoped>
/* ========================================
   主卡片容器 - 巨石碑
   ======================================== */
.boss-monolith {
  position: relative;
  min-height: 500px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 30, 0.9) 0%,
    rgba(10, 10, 15, 0.95) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Featured Boss - 雙倍寬度 */
.boss-monolith.is-featured {
  grid-column: span 2;
  min-height: 600px;
}

/* ========================================
   狀態 - 聚焦與變暗
   ======================================== */

/* 聚焦狀態 - 色彩爆發 */
.boss-monolith.is-focused {
  transform: scale(1.05) translateY(-10px);
  z-index: 10;
  border-color: var(--theme-color, rgba(255, 255, 255, 0.5));
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 80px var(--theme-color, rgba(255, 255, 255, 0.3)),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

/* 顯示全彩圖片 */
.boss-monolith.is-focused .boss-image-color {
  opacity: 1;
  filter: none;
}

/* 隱藏剪影 */
.boss-monolith.is-focused .boss-image-silhouette {
  opacity: 0;
}

/* 顯示背光 */
.boss-monolith.is-focused .backlight {
  opacity: 1;
  transform: scale(1.2);
}

/* 顯示數據 */
.boss-monolith.is-focused .boss-stats {
  opacity: 1;
  transform: translateY(0);
}

/* 邊框光效 */
.boss-monolith.is-focused .border-glow {
  opacity: 1;
}

/* 變暗狀態 - 其他卡片 */
.boss-monolith.is-dimmed {
  opacity: 0.4;
  filter: blur(2px) grayscale(0.5);
  transform: scale(0.95);
}

/* ========================================
   背光效果 (God Rays)
   ======================================== */
.backlight {
  position: absolute;
  top: -100%;
  left: -50%;
  width: 200%;
  height: 300%;
  background: radial-gradient(
    ellipse at center,
    var(--theme-color, rgba(255, 255, 255, 0.2)) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: all 0.6s ease;
  pointer-events: none;
  z-index: 0;
  filter: blur(40px);
}

/* ========================================
   卡片內容
   ======================================== */
.monolith-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ========================================
   Boss 圖片 - 剪影效果
   ======================================== */
.boss-image-container {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2rem;
}

.boss-image {
  position: absolute;
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: all 0.5s ease;
}

/* 全彩圖片 (默認隱藏) */
.boss-image-color {
  opacity: 0;
  filter: drop-shadow(0 0 30px var(--theme-color, rgba(255, 255, 255, 0.3)));
  z-index: 2;
}

/* 剪影 (默認顯示) */
.boss-image-silhouette {
  opacity: 1;
  filter: 
    brightness(0.1)
    contrast(2)
    drop-shadow(0 0 20px rgba(0, 0, 0, 0.8));
  z-index: 1;
}

/* ========================================
   發光的眼睛
   ======================================== */
.boss-eyes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 3;
}

.eye-glow {
  position: absolute;
  top: 40%;
  width: 20px;
  height: 20px;
  background: var(--eye-color, #ef4444);
  border-radius: 50%;
  box-shadow: 
    0 0 20px var(--eye-color, #ef4444),
    0 0 40px var(--eye-color, #ef4444),
    0 0 60px var(--eye-color, #ef4444);
  animation: eye-pulse 2s ease-in-out infinite;
  transform: translateX(-50%);
}

@keyframes eye-pulse {
  0%, 100% {
    opacity: 0.8;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.2);
  }
}

/* 聚焦時淡出眼睛 */
.boss-monolith.is-focused .boss-eyes {
  opacity: 0;
}

/* ========================================
   底部霧氣
   ======================================== */
.bottom-fog {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 30%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
  animation: fog-drift 10s ease-in-out infinite;
}

@keyframes fog-drift {
  0%, 100% {
    opacity: 0.8;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-10px);
  }
}

/* ========================================
   Boss 名稱 - 封印條
   ======================================== */
.boss-nameplate {
  position: relative;
  padding: 1.5rem 2rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 3;
}

.boss-name {
  font-family: 'Noto Serif TC', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.boss-name-en {
  font-family: 'Courier New', monospace;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  margin: 0;
}

/* ========================================
   Boss 數據 (hover 時顯示)
   ======================================== */
.boss-stats {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  opacity: 0;
  transition: all 0.4s ease;
  pointer-events: none;
  z-index: 4;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.1em;
}

.stat-value {
  font-family: 'Courier New', monospace;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--theme-color, #ffffff);
  text-shadow: 0 0 10px var(--theme-color, rgba(255, 255, 255, 0.5));
}

/* ========================================
   Boss 類型標籤
   ======================================== */
.boss-type-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.1em;
  backdrop-filter: blur(10px);
  z-index: 4;
}

/* ========================================
   邊框光效
   ======================================== */
.border-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 12px;
  background: linear-gradient(
    45deg,
    transparent 0%,
    var(--theme-color, rgba(255, 255, 255, 0.3)) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 0;
  filter: blur(10px);
}

/* ========================================
   響應式設計
   ======================================== */
@media (max-width: 768px) {
  .boss-monolith {
    min-height: 400px;
  }

  .boss-monolith.is-featured {
    grid-column: span 1;
    min-height: 450px;
  }

  .boss-stats {
    gap: 1rem;
    padding: 0.75rem 1rem;
  }
}

/* ========================================
   無障礙增強
   ======================================== */
.boss-monolith:focus-visible {
  outline: 2px solid var(--theme-color, #ffffff);
  outline-offset: 4px;
}

/* 減少動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .boss-monolith,
  .boss-image,
  .backlight,
  .boss-stats,
  .eye-glow,
  .bottom-fog {
    animation: none;
    transition: none;
  }
}
</style>

