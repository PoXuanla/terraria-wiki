<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";
import BossStatsCard from "./BossStatsCard.vue";

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

interface Warning {
  text: string;
  type?: "info" | "warning" | "danger";
}

interface Props {
  title: string;
  icon?: any;
  cards: StatCardData[];
  warning?: Warning;
  gridCols?: 1 | 2 | 3;
}

const props = withDefaults(defineProps<Props>(), {
  gridCols: 2,
});
</script>

<template>
  <section class="section-card">
    <!-- 标题 -->
    <h2 id="stats" class="section-heading">
      <component v-if="icon" :is="icon" :size="20" class="section-heading__icon" />
      <span>{{ title }}</span>
    </h2>

    <!-- 卡片网格 -->
    <div class="stats-grid" :style="{ '--grid-cols': gridCols }">
      <BossStatsCard v-for="(card, index) in cards" :key="index" :data="card" />
    </div>

    <!-- 警告框 -->
    <div
      v-if="warning"
      class="warning-box"
      :class="`warning-box--${warning.type || 'info'}`"
    >
      <AlertTriangle :size="20" class="warning-box__icon" />
      <p class="warning-box__text" v-html="warning.text"></p>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.section-heading__icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.warning-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.warning-box--info {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(37, 99, 235, 0.05) 100%
  );
  border-color: rgba(59, 130, 246, 0.3);
  color: rgba(147, 197, 253, 0.95);
}

.warning-box--warning {
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1) 0%,
    rgba(217, 119, 6, 0.05) 100%
  );
  border-color: rgba(245, 158, 11, 0.3);
  color: rgba(253, 224, 71, 0.95);
}

.warning-box--danger {
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.1) 0%,
    rgba(220, 38, 38, 0.05) 100%
  );
  border-color: rgba(239, 68, 68, 0.3);
  color: rgba(252, 165, 165, 0.95);
}

.warning-box__icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.warning-box__text {
  margin: 0;
  flex: 1;
}

.warning-box__text strong {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}
</style>

