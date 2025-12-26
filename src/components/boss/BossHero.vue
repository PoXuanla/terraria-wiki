<script setup>
import { ExternalLink, Skull, Star } from "lucide-vue-next";

/**
 * BossHero 组件 Props
 */
const props = defineProps({
  /**
   * Boss 基础数据
   */
  bossData: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.name &&
        value.nameEn &&
        value.type &&
        value.difficulty &&
        value.description &&
        value.wikiUrl
      );
    },
  },

  /**
   * 背景 glow 颜色变体（可选，支持多个）
   * 例如: ['red'], ['red', 'green'], [] (使用默认粉色)
   */
  glowVariants: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="hero">
    <!-- 背景装饰 -->
    <div class="hero__bg">
      <div class="hero__bg-pattern"></div>
      <!-- 动态背景 glow -->
      <div
        v-if="glowVariants.length === 0"
        class="hero__bg-glow"
      ></div>
      <div
        v-for="(variant, index) in glowVariants"
        :key="index"
        :class="['hero__bg-glow', `hero__bg-glow--${variant}`]"
      ></div>
    </div>

    <div class="hero__content">
      <!-- BOSS 图标区域 (通过 slot 自定义) -->
      <slot name="icon">
        <!-- 默认单图标样式 -->
        <div class="hero__icon-wrapper">
          <div class="hero__icon-glow"></div>
          <div class="hero__icon-frame">
            <img
              :src="bossData.icon"
              :alt="bossData.nameEn"
              class="hero__icon-img"
            />
          </div>
        </div>
      </slot>

      <!-- BOSS 资讯 -->
      <div class="hero__info">
        <!-- 徽章区域 -->
        <div class="hero__badges">
          <!-- 默认徽章：类型和难度 -->
          <span class="badge badge--boss">
            <Skull :size="12" class="mr-1" />
            {{ bossData.type }}
          </span>
          <span class="badge badge--difficulty">
            <Star :size="12" class="mr-1" />
            {{ bossData.difficulty }}
          </span>
          <!-- 额外徽章 (通过 slot 插入) -->
          <slot name="extra-badges"></slot>
        </div>

        <!-- 标题与副标题 -->
        <h1 class="hero__title">{{ bossData.name }}</h1>
        <p class="hero__subtitle">{{ bossData.nameEn }}</p>

        <!-- 描述 -->
        <p class="hero__description">
          <slot name="description">
            {{ bossData.description }}
          </slot>
        </p>

        <!-- Wiki 链接 -->
        <a
          :href="bossData.wikiUrl"
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
</template>

<style scoped>
/* ==========================================
   Hero Section
   ========================================== */
.hero {
  position: relative;
  background: linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%);
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
  background-image: radial-gradient(
      circle at 50% 50%,
      rgba(244, 114, 182, 0.15) 0%,
      transparent 50%
    ),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/svg%3E");
}

.hero__bg-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 30%;
  left: 40%;
  border-radius: 50%;
  background: rgba(244, 114, 182, 0.3);
  filter: blur(80px);
  animation: pulse-glow 4s ease-in-out infinite;
}

/* 红色 glow 变体 */
.hero__bg-glow--red {
  top: 30%;
  left: 40%;
  background: rgba(220, 38, 38, 0.4);
}

/* 绿色 glow 变体 (TheTwins 专用) */
.hero__bg-glow--green {
  top: 40%;
  right: 20%;
  background: rgba(34, 197, 94, 0.3);
  animation-delay: 2s;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.hero__content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 1;
}

/* ==========================================
   Icon Styles
   ========================================== */
.hero__icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.hero__icon-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: rgba(244, 114, 182, 0.5);
  filter: blur(20px);
  animation: icon-glow 3s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.hero__icon-frame {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
}

.hero__icon-img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  image-rendering: pixelated;
}

/* ==========================================
   Info Styles
   ========================================== */
.hero__info {
  flex: 1;
  color: white;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
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

.badge--boss {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
}

.badge--difficulty {
  background-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.badge--danger {
  background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
  color: white;
}

.badge--easy {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
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
   Responsive
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
}

/* ==========================================
   Helper Classes
   ========================================== */
.mr-1 {
  margin-right: 0.25rem;
}
</style>

