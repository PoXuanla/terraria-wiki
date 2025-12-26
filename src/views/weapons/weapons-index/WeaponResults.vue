<script setup lang="ts">
import { PackageOpen, X } from "lucide-vue-next";
import { useWeaponStore } from "@/stores/weapon";
import WeaponCard from "@/components/weapons/WeaponCard.vue";

/**
 * 武器結果顯示組件
 * 負責顯示篩選後的武器列表或空狀態
 */

// ==========================================
// Store
// ==========================================

const weaponStore = useWeaponStore();
</script>

<template>
  <!-- 武器網格 -->
  <TransitionGroup
    v-if="weaponStore.filteredWeapons.length > 0"
    tag="section"
    name="weapon-card"
    class="weapons-grid"
  >
    <WeaponCard
      v-for="weapon in weaponStore.filteredWeapons"
      :key="weapon.id"
      :weapon="weapon"
    />
  </TransitionGroup>

  <!-- 空狀態 -->
  <section v-else class="empty-state">
    <div class="empty-state__icon">
      <PackageOpen :size="64" />
    </div>
    <h3 class="empty-state__title">找不到符合條件的武器</h3>
    <p class="empty-state__description">嘗試調整篩選條件或清除搜尋關鍵字</p>
    <button @click="weaponStore.clearFilters" class="empty-state__btn">
      <X :size="16" />
      <span>清除所有篩選</span>
    </button>
  </section>
</template>

<style scoped>
/* ==========================================
   武器網格
   ========================================== */
.weapons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1200px) {
  .weapons-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .weapons-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .weapons-grid {
    grid-template-columns: 1fr;
  }
}

/* ==========================================
   卡片切換動畫
   ========================================== */

/* 進入動畫 */
.weapon-card-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.weapon-card-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.weapon-card-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* 離開動畫 */
.weapon-card-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.weapon-card-leave-active {
  transition: all 0.25s ease-out;
  position: absolute;
}

.weapon-card-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

/* 移動動畫（重新排序時） */
.weapon-card-move {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ==========================================
   空狀態
   ========================================== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  border: 2px dashed var(--color-border);
  text-align: center;
}

.empty-state__icon {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem;
}

.empty-state__description {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin: 0 0 1.5rem;
}

.empty-state__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-state__btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}
</style>
