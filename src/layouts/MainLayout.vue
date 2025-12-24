<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsViewStore } from '@/stores/tagsView'
import { menuConfig } from '@/router'
import HistoryTabs from '@/components/HistoryTabs.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'

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
</script>

<template>
  <div class="main-layout">
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
      
      <!-- 底部資訊 -->
      <div class="sidebar__footer">
        <span class="text-xs text-text-muted">v1.0.0</span>
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
          <Transition name="page-fade" mode="out-in">
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
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
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
}

.header {
  background-color: var(--color-bg-header);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 50;
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
}

.content {
  flex: 1;
  padding: 1.5rem;
  background-color: var(--color-bg-main);
}

/* ==========================================
   頁面切換動畫
   ========================================== */

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
</style>

