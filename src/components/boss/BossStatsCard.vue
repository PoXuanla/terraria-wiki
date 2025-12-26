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
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  border: 2px solid var(--card-color);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.stat-card__glow-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-color);
  box-shadow: 0 0 12px var(--card-color);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 20px var(--card-color);
  border-color: var(--card-color);
}

/* 高亮卡片 */
.stat-card--highlight {
  border-width: 3px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.15) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.stat-card--highlight .stat-card__glow-line {
  height: 5px;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 12px var(--card-color);
  }
  50% {
    box-shadow: 0 0 20px var(--card-color), 0 0 30px var(--card-color);
  }
}

/* 卡片头部 */
.stat-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px var(--card-color));
  flex-shrink: 0;
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
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.stat-card__name-en {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.stat-card__badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.stat-card__badge--high {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
}

.stat-card__badge--medium {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
}

.stat-card__badge--low {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

/* 属性数据 */
.stat-card__stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
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
}

.stat-item__content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.stat-item__label {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.6);
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
  color: rgba(255, 255, 255, 0.8);
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
