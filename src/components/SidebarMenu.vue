<script setup>
import { useRoute } from 'vue-router'
import BaseIcon from '@/components/BaseIcon.vue'

const props = defineProps({
  menuConfig: {
    type: Array,
    required: true,
  },
})

const route = useRoute()

// 判斷選單項目是否為當前活動頁面
const isActive = (path) => route.path === path
</script>

<template>
  <div class="sidebar-menu">
    <div 
      v-for="group in menuConfig" 
      :key="group.groupKey"
      class="menu-group"
    >
      <!-- 分組標題 -->
      <div class="menu-group__header">
        <BaseIcon :icon="group.icon" :size="14" class="menu-group__icon" />
        <span class="menu-group__title">{{ group.group }}</span>
      </div>
      
      <!-- 選單項目 -->
      <ul class="menu-group__items">
        <li 
          v-for="item in group.items" 
          :key="item.path"
        >
          <RouterLink
            :to="item.path"
            :class="[
              'menu-item',
              { 'menu-item--active': isActive(item.path) }
            ]"
          >
            <BaseIcon :icon="item.icon" :size="20" class="menu-item__icon" />
            <span class="menu-item__title">{{ item.title }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-group {
  padding: 0 0.75rem;
}

.menu-group__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.menu-group__icon {
  opacity: 0.8;
}

.menu-group__items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-sidebar-text);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-fast) ease-out;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-primary);
  border-radius: 0 2px 2px 0;
  transform: scaleY(0);
  transition: transform var(--transition-fast) ease-out;
}

.menu-item:hover {
  background-color: var(--color-sidebar-hover);
  color: var(--color-sidebar-text-active);
}

.menu-item:hover::before {
  transform: scaleY(0.5);
}

.menu-item--active {
  background-color: var(--color-sidebar-active);
  color: var(--color-sidebar-text-active);
}

.menu-item--active::before {
  transform: scaleY(1);
}

.menu-item__icon {
  flex-shrink: 0;
}

.menu-item__title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
