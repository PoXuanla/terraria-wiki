<script setup lang="ts">
import { Target } from "lucide-vue-next";

interface CoreStrategy {
  title: string;
  priority: string;
  reason: string;
  steps: string[];
}

interface Props {
  coreStrategy: CoreStrategy;
  watermarkIcon?: string;
  watermarkHorizontal?: boolean;
}

withDefaults(defineProps<Props>(), {
  watermarkIcon: undefined,
  watermarkHorizontal: false,
});
</script>

<template>
  <section class="strategy-highlight">
    <!-- 背景水印 -->
    <div
      v-if="watermarkIcon"
      class="strategy-highlight__watermark"
      :class="{ 'strategy-highlight__watermark--horizontal': watermarkHorizontal }"
      :style="{ backgroundImage: `url(${watermarkIcon})` }"
    ></div>

    <div class="strategy-highlight__content">
      <div class="strategy-highlight__header">
        <Target :size="24" class="strategy-highlight__icon" />
        <h2 id="strategy" class="strategy-highlight__title">
          {{ coreStrategy.title }}
        </h2>
      </div>

      <!-- 關鍵戰術區塊 - 毛玻璃效果 -->
      <div class="strategy-highlight__priority">
        <span class="priority-badge">⚔️ 最重要原則</span>
        <p class="priority-text" v-html="coreStrategy.priority"></p>
      </div>

      <p class="strategy-highlight__reason" v-html="coreStrategy.reason"></p>

      <!-- Vertical Stepper - 時間軸樣式 -->
      <ol class="strategy-steps">
        <li
          v-for="(step, index) in coreStrategy.steps"
          :key="index"
          class="strategy-step"
          :class="{ 'strategy-step--last': index === coreStrategy.steps.length - 1 }"
        >
          <div class="strategy-step__number">{{ index + 1 }}</div>
          <span class="strategy-step__text" v-html="step"></span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.strategy-highlight {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.85) 0%,
    rgba(22, 33, 62, 0.9) 100%
  );
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

/* 背景水印 */
.strategy-highlight__watermark {
  position: absolute;
  right: -8%;
  bottom: -12%;
  width: 55%;
  height: 85%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right bottom;
  opacity: 0.08;
  filter: grayscale(100%) brightness(1.3) contrast(0.8);
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: soft-light;
}

/* 横向水印 - 针对 The Destroyer 等长条形 Boss */
.strategy-highlight__watermark--horizontal {
  right: -27%;
  bottom: 0%;
  width: 70%;
  height: 60%;
  background-size: cover;
  background-position: center right;
  opacity: 0.1;
  transform: scale(1.3);
}

.strategy-highlight__content {
  position: relative;
  z-index: 1;
}

.strategy-highlight__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.strategy-highlight__icon {
  color: #ec4899;
  filter: drop-shadow(0 0 12px rgba(236, 72, 153, 0.6))
         drop-shadow(0 0 6px rgba(236, 72, 153, 0.4));
}

.strategy-highlight__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
}

/* 關鍵戰術區塊 - 毛玻璃效果 */
.strategy-highlight__priority {
  position: relative;
  padding: 1.5rem 2rem 1.5rem 2rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    90deg,
    rgba(255, 192, 203, 0.08) 0%,
    rgba(236, 72, 153, 0.05) 40%,
    transparent 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px 0 0 10px;
  border: none;
  border-left: 4px solid #ec4899;
}

.priority-badge {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%);
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  /* Badge 光暈效果 */
  box-shadow: 
    0 2px 8px rgba(236, 72, 153, 0.4),
    0 0 16px rgba(236, 72, 153, 0.3),
    0 0 8px rgba(236, 72, 153, 0.35);
  /* 文字光暈 */
  text-shadow: 
    0 0 8px rgba(255, 255, 255, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.2);
}

.priority-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
  line-height: 1.6;
  letter-spacing: -0.01em;
}

.strategy-highlight__reason {
  font-size: 1rem;
  color: #cbd5e1;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  padding-left: 0.25rem;
}

/* Vertical Stepper - 時間軸樣式 */
.strategy-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.strategy-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding-left: 0;
  margin-bottom: 2rem;
}

.strategy-step:last-child {
  margin-bottom: 0;
}

/* 垂直連線 - 從亮到暗的呼吸感 */
.strategy-step::before {
  content: "";
  position: absolute;
  left: 18px;
  top: 40px;
  width: 2px;
  height: calc(100% + 2rem);
  background: linear-gradient(
    180deg,
    rgba(236, 72, 153, 0.4) 0%,
    rgba(236, 72, 153, 0.25) 30%,
    rgba(236, 72, 153, 0.15) 60%,
    rgba(236, 72, 153, 0.05) 90%,
    transparent 100%
  );
  border-radius: 2px;
}

/* 最後一個步驟：線條漸隱收尾 */
.strategy-step--last::before {
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(236, 72, 153, 0.25) 0%,
    transparent 100%
  );
  border-radius: 2px;
}

/* 數字圓圈 - 空心設計 + 等寬字體 + 霓虹光環 */
.strategy-step__number {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border: 2.5px solid;
  border-color: rgba(236, 72, 153, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "SF Mono", "Roboto Mono", "Courier New", Consolas, monospace;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.95) 100%);
  color: #f472b6;
  position: relative;
  z-index: 1;
  /* 多層光環效果 */
  box-shadow: 
    0 0 0 4px rgba(236, 72, 153, 0.08),
    0 0 16px rgba(236, 72, 153, 0.25),
    0 0 8px rgba(236, 72, 153, 0.3),
    0 0 4px rgba(236, 72, 153, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* 數字自發光 */
  text-shadow: 
    0 0 8px rgba(244, 114, 182, 0.6),
    0 0 4px rgba(244, 114, 182, 0.4);
}

.strategy-step:hover .strategy-step__number {
  border-color: #f472b6;
  /* 懸停時光暈增強 */
  box-shadow: 
    0 0 0 6px rgba(236, 72, 153, 0.15),
    0 0 32px rgba(236, 72, 153, 0.6),
    0 0 16px rgba(236, 72, 153, 0.5),
    0 0 8px rgba(236, 72, 153, 0.7),
    inset 0 0 12px rgba(236, 72, 153, 0.25);
  transform: scale(1.08);
  color: #fda4af;
  /* 數字光暈增強 */
  text-shadow: 
    0 0 12px rgba(253, 164, 175, 0.8),
    0 0 6px rgba(253, 164, 175, 0.6),
    0 0 3px rgba(253, 164, 175, 0.4);
}

/* 步驟文字 - 提升對比度 + 語義化上色支持 */
.strategy-step__text {
  flex: 1;
  font-size: 1.0625rem;
  font-weight: 500;
  color: #e2e8f0;
  line-height: 1.7;
  padding-top: 0.375rem;
  letter-spacing: -0.01em;
}

/* 語義化上色樣式 - 供 HTML 標記使用 + 自發光效果 */
.strategy-step__text :deep(strong) {
  font-weight: 700;
  color: #fbbf24;
  text-shadow: 
    0 0 10px rgba(251, 191, 36, 0.5),
    0 0 4px rgba(251, 191, 36, 0.3);
}

.strategy-step__text :deep(.enemy-primary) {
  color: #34d399;
  font-weight: 600;
  text-shadow: 
    0 0 12px rgba(52, 211, 153, 0.6),
    0 0 6px rgba(52, 211, 153, 0.4),
    0 0 3px rgba(52, 211, 153, 0.3);
}

.strategy-step__text :deep(.enemy-secondary) {
  color: #fb7185;
  font-weight: 600;
  text-shadow: 
    0 0 12px rgba(251, 113, 133, 0.6),
    0 0 6px rgba(251, 113, 133, 0.4),
    0 0 3px rgba(251, 113, 133, 0.3);
}

.strategy-step__text :deep(.highlight) {
  color: #60a5fa;
  font-weight: 600;
  text-shadow: 
    0 0 10px rgba(96, 165, 250, 0.5),
    0 0 4px rgba(96, 165, 250, 0.3);
}

.strategy-step__text :deep(.weapon) {
  color: #c084fc;
  font-weight: 600;
  text-shadow: 
    0 0 10px rgba(192, 132, 252, 0.5),
    0 0 4px rgba(192, 132, 252, 0.3);
}

.strategy-highlight__priority :deep(strong),
.strategy-highlight__reason :deep(strong) {
  font-weight: 700;
  color: #fbbf24;
  text-shadow: 
    0 0 10px rgba(251, 191, 36, 0.5),
    0 0 4px rgba(251, 191, 36, 0.3);
}

.strategy-highlight__priority :deep(.enemy-primary),
.strategy-highlight__reason :deep(.enemy-primary) {
  color: #34d399;
  font-weight: 600;
  text-shadow: 
    0 0 12px rgba(52, 211, 153, 0.6),
    0 0 6px rgba(52, 211, 153, 0.4),
    0 0 3px rgba(52, 211, 153, 0.3);
}

.strategy-highlight__priority :deep(.enemy-secondary),
.strategy-highlight__reason :deep(.enemy-secondary) {
  color: #fb7185;
  font-weight: 600;
  text-shadow: 
    0 0 12px rgba(251, 113, 133, 0.6),
    0 0 6px rgba(251, 113, 133, 0.4),
    0 0 3px rgba(251, 113, 133, 0.3);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .strategy-highlight {
    padding: 1.75rem;
  }

  .strategy-highlight__title {
    font-size: 1.5rem;
  }

  .strategy-highlight__priority {
    padding: 1.25rem 1.5rem 1.25rem 1.5rem;
  }

  .priority-text {
    font-size: 1rem;
  }

  .strategy-step {
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .strategy-step__number {
    width: 34px;
    height: 34px;
    font-size: 0.9375rem;
  }

  .strategy-step::before {
    left: 15px;
    top: 36px;
    height: calc(100% + 1.75rem);
  }

  .strategy-step--last::before {
    height: 36px;
  }

  .strategy-step__text {
    font-size: 0.9375rem;
    padding-top: 0.375rem;
  }
}
</style>

