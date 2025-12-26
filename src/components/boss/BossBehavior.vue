<script setup lang="ts">
import { Zap } from 'lucide-vue-next'
import type { BossBehavior } from '@/data/boss/types'

/**
 * Boss 行為模式組件
 * 用於展示 Boss 的行為模式列表
 */
interface Props {
  /** 行為模式列表 */
  behaviors: BossBehavior[]
}

defineProps<Props>()
</script>

<template>
  <section class="section-card">
    <h2 id="behavior" class="section-heading">
      <span class="section-heading__accent-line"></span>
      <Zap :size="20" class="section-heading__icon" />
      <span class="section-heading__text">行為模式</span>
    </h2>

    <div class="behavior-grid">
      <div
        v-for="behavior in behaviors"
        :key="behavior.title"
        class="behavior-card"
      >
        <div class="behavior-card__icon">{{ behavior.icon }}</div>
        <div class="behavior-card__content">
          <h4 class="behavior-card__title">{{ behavior.title }}</h4>
          <p class="behavior-card__desc">{{ behavior.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   Section Heading - 標題樣式
   ========================================== */
.section-heading {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0 0 1.5rem;
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
   行為模式網格 - Sophisticated Layout
   ========================================== */
.behavior-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* 行為卡片 - 去除邊框，使用層級與光影 */
.behavior-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.75rem 1.5rem;
  
  /* 去除邊框，改用極低透明度背景營造層級感 */
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 1rem;
  
  /* 使用微妙的內光取代邊框 */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.1);
  
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

/* Hover 效果 - 使用光暈而非邊框 */
.behavior-card:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-3px);
  
  /* 微光暈效果 - 低調但優雅 */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 8px 32px rgba(59, 130, 246, 0.08),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

/* 圖標容器化 - 帶微光的圓形背景 */
.behavior-card__icon {
  flex-shrink: 0;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  
  /* 去除邊框，改用圓形背景 + 微光 */
  background: radial-gradient(
    circle at 30% 30%,
    rgba(59, 130, 246, 0.12),
    rgba(147, 51, 234, 0.08)
  );
  border: none;
  border-radius: 50%;
  
  /* 微妙的光暈效果 */
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    0 4px 12px rgba(59, 130, 246, 0.15);
  
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.behavior-card:hover .behavior-card__icon {
  /* Hover 時圖標容器微微發光 */
  background: radial-gradient(
    circle at 30% 30%,
    rgba(59, 130, 246, 0.18),
    rgba(147, 51, 234, 0.12)
  );
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.15),
    0 6px 20px rgba(59, 130, 246, 0.25),
    0 0 0 1px rgba(59, 130, 246, 0.2);
  transform: scale(1.05);
}

/* 內容區域 - 增加留白與行高 */
.behavior-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding-top: 0.25rem;
}

/* 標題 - 純白，加粗，增強對比 */
.behavior-card__title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.01em;
  margin: 0;
  transition: color 0.3s ease;
}

.behavior-card:hover .behavior-card__title {
  color: #f0f9ff;
}

/* 描述文字 - 高級灰，增加行高提升可讀性 */
.behavior-card__desc {
  font-size: 0.9375rem;
  color: #94a3b8;
  line-height: 1.7;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.005em;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .behavior-grid {
    grid-template-columns: 1fr;
  }
}
</style>

