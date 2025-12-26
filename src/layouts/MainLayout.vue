<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsViewStore } from '@/stores/tagsView'
import { menuConfig } from '@/router'
import HistoryTabs from '@/components/HistoryTabs.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const route = useRoute()
const tagsViewStore = useTagsViewStore()

// 當路由變化時，自動添加標籤
watch(
  () => route.path,
  () => {
    if (route.meta?.title) {
      tagsViewStore.addTag(route)
    }
  },
  { immediate: true }
)

// 取得快取的視圖名稱 (用於 KeepAlive)
const cachedViews = computed(() => tagsViewStore.cachedViewNames)

// 當前頁面標題
const pageTitle = computed(() => route.meta?.title || 'Terraria Wiki')

// 當前頁面主題（用於 Boss Gallery 等特殊頁面）
const currentTheme = computed(() => route.meta?.theme || '')

// 判斷是否為 Boss Gallery 頁面（用於特殊過渡效果）
const isBossGallery = computed(() => route.name === 'BossGallery')

// 動態過渡名稱：Boss Gallery 使用黑色淡出效果，其他頁面使用一般淡入淡出
const transitionName = computed(() => {
  return isBossGallery.value ? 'boss-gallery-fade' : 'page-fade'
})
</script>

<template>
  <div class="main-layout" :class="{ [`theme-${currentTheme}`]: currentTheme }">
    <!-- 側邊欄 -->
    <aside class="sidebar">
      <!-- Logo / 網站標題 -->
      <div class="sidebar__header">
        <div class="sidebar__logo">
          <span class="sidebar__logo-icon">🎮</span>
          <span class="sidebar__logo-text">Terraria Wiki</span>
        </div>
      </div>
      
      <!-- 選單 -->
      <nav class="sidebar__nav">
        <SidebarMenu :menu-config="menuConfig" />
      </nav>
      
      <!-- 底部區域：主題切換 + 版本 -->
      <div class="sidebar__footer">
        <ThemeToggle />
        <span class="sidebar__version">v1.0.0</span>
      </div>
    </aside>
    
    <!-- 主要內容區 -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="header__breadcrumb">
          <h1 class="header__title">{{ pageTitle }}</h1>
        </div>
      </header>
      
      <!-- 歷史標籤 -->
      <HistoryTabs />
      
      <!-- 頁面內容 -->
      <main class="content">
        <RouterView v-slot="{ Component }">
          <Transition :name="transitionName" mode="out-in">
            <KeepAlive :include="cachedViews">
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
}

/* ==========================================
   側邊欄樣式
   ========================================== */

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  background-color: var(--color-bg-sidebar);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sidebar, 4px 0 24px -8px rgba(0, 0, 0, 0.3));
  z-index: 100;
  transition: background-color var(--transition-normal, 0.3s) ease;
}

.sidebar__header {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar__logo-icon {
  font-size: 1.75rem;
}

.sidebar__logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-inverse);
  letter-spacing: -0.02em;
}

.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.sidebar__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar__version {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}

/* ==========================================
   主要內容區樣式
   ========================================== */

.main-content {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* overflow-x: hidden; */
  max-width: calc(100vw - 260px);
}

.header {
  background-color: var(--color-bg-header);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: 
    background-color var(--transition-normal, 0.3s) ease, 
    border-color var(--transition-normal, 0.3s) ease;
}

.header__breadcrumb {
  display: flex;
  align-items: center;
}

.header__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  transition: color var(--transition-normal, 0.3s) ease;
}

.content {
  flex: 1;
  padding: 1.5rem;
  background-color: var(--color-bg-main);
  transition: background-color var(--transition-normal, 0.3s) ease;
}

/* ==========================================
   頁面切換動畫
   ========================================== */

/* 一般頁面過渡 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Boss Gallery 特殊過渡：黑色全屏淡出效果 */
.boss-gallery-fade-enter-active {
  transition: opacity 1.2s ease-out;
  position: relative;
}

.boss-gallery-fade-enter-from {
  opacity: 0;
}

.boss-gallery-fade-enter-active::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 1) 70%
  );
  z-index: 9999;
  pointer-events: none;
  animation: black-veil-fade 1.5s ease-out forwards;
}

@keyframes black-veil-fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.boss-gallery-fade-leave-active {
  transition: opacity 0.3s ease;
}

.boss-gallery-fade-leave-to {
  opacity: 0;
}
</style>
