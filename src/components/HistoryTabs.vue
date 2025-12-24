<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTagsViewStore } from '@/stores/tagsView'

const router = useRouter()
const route = useRoute()
const tagsViewStore = useTagsViewStore()

// 取得所有標籤
const tags = computed(() => tagsViewStore.tags)

// 判斷標籤是否為當前活動頁面
const isActive = (path) => route.path === path

// 點擊標籤跳轉
const handleTagClick = (tag) => {
  if (route.path !== tag.path) {
    router.push(tag.path)
  }
}

// 關閉標籤
const handleTagClose = (event, path) => {
  event.stopPropagation()
  
  const nextTag = tagsViewStore.removeTag(path)
  
  // 如果關閉的是當前頁面，跳轉到相鄰頁面
  if (route.path === path && nextTag) {
    router.push(nextTag.path)
  } else if (route.path === path && !nextTag) {
    // 如果沒有其他標籤，跳轉到首頁
    router.push('/')
  }
}

// 右鍵選單功能 (可擴展)
const handleContextMenu = (event, tag) => {
  event.preventDefault()
  // 未來可以加入右鍵選單：關閉其他、關閉所有等
}
</script>

<template>
  <div 
    v-if="tags.length > 0"
    class="history-tabs-container"
  >
    <div class="history-tabs-wrapper">
      <TransitionGroup name="tag" tag="div" class="history-tabs">
        <div
          v-for="tag in tags"
          :key="tag.path"
          :class="[
            'history-tag',
            { 'history-tag--active': isActive(tag.path) }
          ]"
          @click="handleTagClick(tag)"
          @contextmenu="handleContextMenu($event, tag)"
        >
          <!-- 標籤標題 -->
          <span class="history-tag__title">{{ tag.title }}</span>
          
          <!-- 關閉按鈕 -->
          <button
            class="history-tag__close"
            @click="handleTagClose($event, tag.path)"
            :aria-label="`關閉 ${tag.title}`"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              class="w-3.5 h-3.5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.history-tabs-container {
  background-color: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
}

.history-tabs-wrapper {
  overflow-x: auto;
  scrollbar-width: thin;
}

.history-tabs {
  display: flex;
  gap: 0.5rem;
  min-width: max-content;
}

.history-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background-color: var(--color-tag-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-tag-text);
  cursor: pointer;
  transition: all var(--transition-fast) ease-out;
  box-shadow: var(--shadow-tag, 0 1px 3px -1px rgba(0,0,0,0.1));
}

.history-tag:hover {
  background-color: var(--color-border-light);
  transform: translateY(-1px);
}

.history-tag--active {
  background-color: var(--color-tag-bg-active);
  border-color: var(--color-primary);
  color: var(--color-tag-text-active);
}

.history-tag--active:hover {
  background-color: var(--color-primary-hover);
}

.history-tag__title {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  color: inherit;
  opacity: 0.6;
  transition: all var(--transition-fast);
}

.history-tag__close:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.1);
}

.history-tag--active .history-tag__close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* TransitionGroup 動畫 */
.tag-enter-active {
  animation: scaleIn 0.15s ease-out;
}

.tag-leave-active {
  animation: scaleIn 0.15s ease-out reverse;
  position: absolute;
}

.tag-move {
  transition: transform 0.2s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

