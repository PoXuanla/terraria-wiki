<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WeaponLayout from '@/components/weapons/WeaponLayout.vue'
import StrategyGuide from '@/components/weapons/StrategyGuide.vue'
import { getWeaponBySlug } from '@/data/weapons'

const route = useRoute()

// 根據路由路徑動態取得武器資料
// 從路徑 /weapons/blade-staff 提取 slug
const weaponData = computed(() => {
  const pathSegments = route.path.split('/')
  const slug = pathSegments[pathSegments.length - 1]
  const weapon = getWeaponBySlug(slug)
  
  if (!weapon && import.meta.env.DEV) {
    console.error('Weapon not found:', slug, 'route.path:', route.path)
  }
  
  return weapon
})
</script>

<template>
  <div v-if="weaponData">
    <WeaponLayout :weapon="weaponData">
      <StrategyGuide 
        :meta="weaponData.meta" 
        :detailedDescription="weaponData.detailedDescription" 
      />
    </WeaponLayout>
  </div>
  <div v-else class="error-state">
    <p>武器資料不存在</p>
  </div>
</template>

<style scoped>
.error-state {
  padding: 2rem;
  text-align: center;
  color: var(--color-text-muted);
}
</style>

