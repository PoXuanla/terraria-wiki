<script setup lang="ts">
import { ref, computed } from 'vue';
import { bosses } from '@/data/boss';
import BossMonolith from '@/components/boss/BossMonolith.vue';

/**
 * Boss Gallery - 萬神殿
 * 展示所有 Boss 的宏大、可怕、敬畏的圖鑑
 */

// 當前聚焦的 Boss (用於聚光燈效果)
const focusedBossSlug = ref<string | null>(null);

// 按類型分類的 Boss
const bossCategories = computed(() => {
  const categories: Record<string, typeof bosses> = {
    'mechanical': bosses.filter(b => b.type === '機械 Boss'),
    // 未來可以添加其他分類
  };
  
  return categories;
});

// Boss 的顯示優先級配置 (用於確定卡片大小)
const bossPriority: Record<string, 'normal' | 'featured'> = {
  'the-twins': 'featured',      // 雙倍寬度
  'the-destroyer': 'featured',  // 雙倍寬度
  'skeletron-prime': 'normal',
};

// 處理 hover 事件
const handleBossHover = (slug: string | null) => {
  focusedBossSlug.value = slug;
};
</script>

<template>
  <div class="boss-gallery">
    <!-- 背景層 - 動態星雲 -->
    <div class="background-nebula">
      <div class="nebula-layer nebula-red"></div>
      <div class="nebula-layer nebula-purple"></div>
      <div class="nebula-layer nebula-blue"></div>
      <div class="floating-particles"></div>
    </div>

    <!-- 主要內容 -->
    <div class="gallery-container">
      <!-- 標題區 -->
      <header class="gallery-header">
        <h1 class="pantheon-title">
          <span class="title-main">萬神殿</span>
          <span class="title-sub">PANTHEON OF TERRORS</span>
        </h1>
        <p class="pantheon-description">
          封印著古老怪物的神殿。在黑暗中，它們正盯著你...
        </p>
      </header>

      <!-- Boss 圖鑑 - Masonry 瀑布流佈局 -->
      <div class="boss-masonry" :class="{ 'has-focus': focusedBossSlug }">
        <BossMonolith
          v-for="boss in bosses"
          :key="boss.slug"
          :boss="boss"
          :priority="bossPriority[boss.slug as keyof typeof bossPriority] || 'normal'"
          :is-focused="focusedBossSlug === boss.slug"
          :is-dimmed="focusedBossSlug !== null && focusedBossSlug !== boss.slug"
          @mouseenter="handleBossHover(boss.slug)"
          @mouseleave="handleBossHover(null)"
        />
      </div>
    </div>

    <!-- 暗角遮罩 -->
    <div class="vignette-overlay"></div>
  </div>
</template>

<style scoped>
/* ========================================
   主容器
   ======================================== */
.boss-gallery {
  position: relative;
  min-height: 100vh;
  background: transparent; /* 使用布局的背景色 */
  overflow: hidden;
  color: #e0e0e0;
  margin: -1.5rem; /* 抵消 content 的 padding，实现全屏效果 */
  padding: 0;
}

/* ========================================
   背景 - 動態星雲
   ======================================== */
.background-nebula {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.nebula-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  filter: blur(100px);
  animation: nebula-drift 30s ease-in-out infinite;
}

.nebula-red {
  background: radial-gradient(
    circle at 20% 30%,
    rgba(220, 38, 38, 0.4) 0%,
    transparent 50%
  );
  animation-delay: 0s;
}

.nebula-purple {
  background: radial-gradient(
    circle at 80% 60%,
    rgba(168, 85, 247, 0.3) 0%,
    transparent 50%
  );
  animation-delay: -10s;
}

.nebula-blue {
  background: radial-gradient(
    circle at 50% 80%,
    rgba(59, 130, 246, 0.2) 0%,
    transparent 50%
  );
  animation-delay: -20s;
}

@keyframes nebula-drift {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 50px) scale(0.9);
  }
}

/* 漂浮粒子 */
.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20% 30%, white, transparent),
    radial-gradient(2px 2px at 60% 70%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 80% 10%, white, transparent),
    radial-gradient(2px 2px at 90% 60%, white, transparent);
  background-size: 200% 200%;
  background-position: 0% 0%;
  animation: particles-float 60s linear infinite;
  opacity: 0.15;
}

@keyframes particles-float {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

/* ========================================
   容器
   ======================================== */
.gallery-container {
  position: relative;
  z-index: 1;
  max-width: 1600px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

/* ========================================
   標題區
   ======================================== */
.gallery-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.pantheon-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.title-main {
  font-family: 'Noto Serif TC', serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #a0a0a0 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  position: relative;
}

.title-main::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
}

.title-sub {
  font-family: 'Courier New', monospace;
  font-size: clamp(0.75rem, 2vw, 1rem);
  font-weight: 400;
  letter-spacing: 0.5em;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
}

.pantheon-description {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ========================================
   Masonry 瀑布流佈局
   ======================================== */
.boss-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  transition: all 0.5s ease;
  perspective: 1500px;
}

/* 當有聚焦時，稍微傾斜整個佈局 */
.boss-masonry.has-focus {
  transform: rotateX(1deg);
}

/* ========================================
   暗角遮罩
   ======================================== */
.vignette-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

/* ========================================
   響應式設計
   ======================================== */
@media (max-width: 768px) {
  .gallery-container {
    padding: 2rem 1rem;
  }

  .boss-masonry {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .gallery-header {
    margin-bottom: 2rem;
  }
}

/* ========================================
   深色模式適配 - Boss Gallery 始終使用深色主題
   ======================================== */
</style>

