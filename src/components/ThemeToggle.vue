<script setup>
import { ref, onMounted, watch } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

/**
 * ThemeToggle - 深色模式切換組件
 * 
 * 功能：
 * 1. 點擊切換 Light / Dark 模式
 * 2. 使用 localStorage 持久化使用者選擇
 * 3. 在 html 標籤上添加/移除 'dark' class
 */

// 當前主題狀態 (true = dark mode)
const isDark = ref(false)

// localStorage key
const STORAGE_KEY = 'terraria-wiki-theme'

/**
 * 切換主題
 */
const toggleTheme = () => {
  isDark.value = !isDark.value
}

/**
 * 應用主題到 DOM
 */
const applyTheme = (dark) => {
  const html = document.documentElement
  
  if (dark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  
  // 儲存到 localStorage
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
}

/**
 * 初始化：讀取使用者偏好
 */
const initTheme = () => {
  // 1. 優先讀取 localStorage
  const stored = localStorage.getItem(STORAGE_KEY)
  
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    // 2. 次之，檢查系統偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
  }
  
  // 立即應用
  applyTheme(isDark.value)
}

// 監聽 isDark 變化
watch(isDark, (newValue) => {
  applyTheme(newValue)
})

// 元件掛載時初始化
onMounted(() => {
  initTheme()
})
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :class="{ 'theme-toggle--dark': isDark }"
    :aria-label="isDark ? '切換至淺色模式' : '切換至深色模式'"
    :title="isDark ? '切換至淺色模式' : '切換至深色模式'"
    @click="toggleTheme"
  >
    <span class="theme-toggle__track">
      <span class="theme-toggle__thumb">
        <Transition name="icon-fade" mode="out-in">
          <Sun v-if="!isDark" :size="14" class="theme-toggle__icon" />
          <Moon v-else :size="14" class="theme-toggle__icon" />
        </Transition>
      </span>
    </span>
    <span class="theme-toggle__label">
      {{ isDark ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0.75rem 0.375rem 0.375rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Track (軌道) */
.theme-toggle__track {
  position: relative;
  width: 40px;
  height: 22px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 9999px;
  transition: background 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.theme-toggle--dark .theme-toggle__track {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

/* Thumb (圓形滑塊) */
.theme-toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle--dark .theme-toggle__thumb {
  transform: translateX(18px);
}

/* Icon */
.theme-toggle__icon {
  color: #f59e0b;
}

.theme-toggle--dark .theme-toggle__icon {
  color: #6366f1;
}

/* Label */
.theme-toggle__label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-sidebar-text);
  min-width: 32px;
}

/* Icon transition */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>

