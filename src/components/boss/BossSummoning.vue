<script setup>
import { Clock, Moon } from "lucide-vue-next";

const props = defineProps({
  summoning: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.item &&
        value.itemEn &&
        value.itemIcon &&
        value.timeRestriction &&
        value.recipe &&
        value.craftStation
      );
    },
  },
});
</script>

<template>
  <section class="section-card">
    <h2 id="summoning" class="section-heading">
      <Moon :size="20" class="section-heading__icon" />
      <span>召喚方式</span>
    </h2>

    <div class="summoning-content">
      <!-- 召喚物品 -->
      <div class="summon-item">
        <img
          :src="summoning.itemIcon"
          :alt="summoning.item"
          class="summon-item__icon"
        />
        <div class="summon-item__info">
          <span class="summon-item__name">{{ summoning.item }}</span>
          <span class="summon-item__name-en">{{ summoning.itemEn }}</span>
        </div>
      </div>

      <!-- 時間限制 -->
      <div class="time-restriction">
        <Clock :size="18" />
        <span>
          需在 <strong>{{ summoning.timeRestriction }}</strong> 使用
        </span>
      </div>

      <!-- 合成配方 -->
      <div class="recipe-section">
        <h3 class="recipe-title">合成配方</h3>
        <div class="recipe-grid">
          <div
            v-for="ingredient in summoning.recipe"
            :key="ingredient.name"
            class="recipe-item"
          >
            <img
              :src="ingredient.icon"
              :alt="ingredient.name"
              class="recipe-item__icon"
            />
            <div class="recipe-item__info">
              <span class="recipe-item__name">{{ ingredient.name }}</span>
              <span class="recipe-item__amount">x{{ ingredient.amount }}</span>
            </div>
          </div>
        </div>
        <p class="recipe-station">
          🔨 製作於：<strong>{{ summoning.craftStation }}</strong>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   Summoning Section
   ========================================== */
.summoning-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summon-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.summon-item__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
}

.summon-item__info {
  display: flex;
  flex-direction: column;
}

.summon-item__name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.summon-item__name-en {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.time-restriction {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 0.5rem;
  color: #c4b5fd;
  font-size: 0.875rem;
}

.time-restriction strong {
  color: #fbbf24;
}

.recipe-section {
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.recipe-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
}

.recipe-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.recipe-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-bg-card);
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
}

.recipe-item__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  image-rendering: pixelated;
}

.recipe-item__info {
  display: flex;
  flex-direction: column;
}

.recipe-item__name {
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

.recipe-item__amount {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
}

.recipe-station {
  margin: 1rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.recipe-station strong {
  color: var(--color-text-primary);
}
</style>

