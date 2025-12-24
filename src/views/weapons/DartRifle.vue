<script setup>
import WeaponLayout from "@/components/WeaponLayout.vue";
import { dartRifle as weaponData } from "@/data/weapons";
</script>

<template>
  <WeaponLayout :weapon="weaponData">
    <!-- 額外的策略提示 -->
    <section v-if="weaponData.tips?.length" class="tips-section section-card">
      <h2 id="tips" class="tips-heading">💡 使用技巧</h2>
      <ul class="tips-list">
        <li v-for="tip in weaponData.tips" :key="tip.title">
          <strong>{{ tip.title }}：</strong>{{ tip.content }}
        </li>
      </ul>
    </section>
  </WeaponLayout>
</template>

<style scoped>
.tips-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .tips-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.tips-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
  scroll-margin-top: 6rem;
}

.tips-list {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tips-list li {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.tips-list li strong {
  color: var(--color-text-primary);
}
</style>


