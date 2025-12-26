<script setup lang="ts">
import { Heart, Shield, Swords } from "lucide-vue-next";

interface StatCardData {
  name: string;
  nameEn: string;
  icon: string;
  hp: number | string;
  defense: number | string;
  damage: number | string;
  notes: string;
  color?: string;
  danger?: "low" | "medium" | "high";
  highlight?: boolean;
}

interface Props {
  data: StatCardData;
}

const props = defineProps<Props>();

// 默认颜色
const cardColor = props.data.color || "#3b82f6";
const dangerLevel = props.data.danger || "medium";

const getDangerText = (danger: string): string => {
  const map: Record<string, string> = {
    high: "高威脅",
    medium: "中等",
    low: "低威脅",
  };
  return map[danger] || "";
};

const formatValue = (value: number | string): string => {
  return typeof value === "number" ? value.toLocaleString() : value;
};
</script>

<template>
  <div
    :class="['stat-card', { 'stat-card--highlight': data.highlight }]"
    :style="{ '--card-color': cardColor }"
  >
    <!-- 顶部发光线 -->
    <div class="stat-card__glow-line"></div>

    <!-- 卡片头部 -->
    <div class="stat-card__header">
      <img :src="data.icon" :alt="data.name" class="stat-card__icon" />
      <div class="stat-card__title">
        <span class="stat-card__name">{{ data.name }}</span>
        <span class="stat-card__name-en">{{ data.nameEn }}</span>
      </div>
      <span
        v-if="data.danger"
        :class="['stat-card__badge', `stat-card__badge--${dangerLevel}`]"
      >
        {{ getDangerText(dangerLevel) }}
      </span>
    </div>

    <!-- 属性数据 -->
    <div class="stat-card__stats">
      <div class="stat-item">
        <Heart :size="16" class="stat-item__icon" />
        <div class="stat-item__content">
          <span class="stat-item__label">血量</span>
          <span class="stat-item__value">{{ formatValue(data.hp) }}</span>
        </div>
      </div>
      <div class="stat-item">
        <Shield :size="16" class="stat-item__icon" />
        <div class="stat-item__content">
          <span class="stat-item__label">防禦</span>
          <span class="stat-item__value">{{ formatValue(data.defense) }}</span>
        </div>
      </div>
      <div class="stat-item">
        <Swords :size="16" class="stat-item__icon" />
        <div class="stat-item__content">
          <span class="stat-item__label">傷害</span>
          <span class="stat-item__value">{{ formatValue(data.damage) }}</span>
        </div>
      </div>
    </div>

    <!-- 备注 -->
    <p class="stat-card__notes">{{ data.notes }}</p>
  </div>
</template>

<style scoped>
.stat-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.02),
    0 4px 16px rgba(0, 0, 0, 0.3);
}

/* 顶部发光线 - 调整为更柔和的效果 */
.stat-card__glow-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--card-color) 50%,
    transparent
  );
  box-shadow: 0 0 12px color-mix(in srgb, var(--card-color) 50%, transparent);
}

.stat-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 
    inset 0 0 30px rgba(255, 255, 255, 0.04),
    0 6px 24px rgba(0, 0, 0, 0.4),
    0 0 30px color-mix(in srgb, var(--card-color) 20%, transparent);
}

/* 高亮卡片 - 类似推荐装备的金色高亮 */
.stat-card--highlight {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--card-color) 8%, rgba(255, 255, 255, 0.03)),
    rgba(255, 255, 255, 0.03) 100%
  );
  animation: glow-pulse-highlight 3s ease-in-out infinite;
}

.stat-card--highlight::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  padding: 0.5px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--card-color) 50%, transparent),
    color-mix(in srgb, var(--card-color) 15%, transparent)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

@keyframes glow-pulse-highlight {
  0%, 100% {
    box-shadow: 
      inset 0 0 40px color-mix(in srgb, var(--card-color) 10%, transparent),
      0 4px 20px rgba(0, 0, 0, 0.4),
      0 0 30px color-mix(in srgb, var(--card-color) 35%, transparent),
      0 0 50px color-mix(in srgb, var(--card-color) 20%, transparent);
  }
  50% {
    box-shadow: 
      inset 0 0 50px color-mix(in srgb, var(--card-color) 15%, transparent),
      0 6px 24px rgba(0, 0, 0, 0.5),
      0 0 45px color-mix(in srgb, var(--card-color) 50%, transparent),
      0 0 70px color-mix(in srgb, var(--card-color) 30%, transparent);
  }
}

.stat-card--highlight .stat-card__glow-line {
  height: 2px;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 12px color-mix(in srgb, var(--card-color) 50%, transparent);
  }
  50% {
    box-shadow: 
      0 0 20px color-mix(in srgb, var(--card-color) 70%, transparent),
      0 0 30px color-mix(in srgb, var(--card-color) 50%, transparent);
  }
}

/* 卡片头部 */
.stat-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
  flex-shrink: 0;
}

.stat-card--highlight .stat-card__icon {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))
         drop-shadow(0 0 12px color-mix(in srgb, var(--card-color) 40%, transparent));
}

.stat-card__title {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.125rem;
  min-width: 0;
}

.stat-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.stat-card__name-en {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.stat-card__badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.stat-card__badge--high {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.2) 100%);
  color: rgba(252, 165, 165, 0.95);
  box-shadow: 
    0 0 12px rgba(239, 68, 68, 0.3),
    inset 0 0 8px rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.stat-card__badge--medium {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(217, 119, 6, 0.2) 100%);
  color: rgba(253, 224, 71, 0.95);
  box-shadow: 
    0 0 12px rgba(245, 158, 11, 0.3),
    inset 0 0 8px rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.stat-card__badge--low {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.2) 100%);
  color: rgba(167, 243, 208, 0.95);
  box-shadow: 
    0 0 12px rgba(16, 185, 129, 0.3),
    inset 0 0 8px rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* 属性数据 */
.stat-card__stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.stat-item__icon {
  color: var(--card-color);
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px color-mix(in srgb, var(--card-color) 30%, transparent));
}

.stat-item__content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.stat-item__label {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-item__value {
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

/* 备注 */
.stat-card__notes {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(148, 163, 184, 0.9);
}

/* 响应式 */
@media (max-width: 640px) {
  .stat-card__stats {
    flex-direction: column;
    gap: 0.75rem;
  }

  .stat-item {
    justify-content: space-between;
  }
}
</style>
