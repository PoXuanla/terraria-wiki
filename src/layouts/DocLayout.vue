<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { List, ArrowUp } from "lucide-vue-next";

/**
 * DocLayout - 文檔佈局組件
 *
 * 功能：
 * 1. 提供左側 TOC 目錄 + 右側內容區的佈局
 * 2. 自動掃描 slot 內的 <h2> 標籤生成目錄
 * 3. 使用 IntersectionObserver 實現 Scroll Spy
 * 4. 點擊目錄項目平滑捲動到對應位置
 *
 * 注意：此組件不套用內容樣式，樣式由各頁面自行決定
 */

// Props
interface Props {
  /** 頁面標題 (顯示在目錄上方) */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "目錄",
});

// ==========================================
// State
// ==========================================

/** TOC 項目類型 */
interface TocItem {
  id: string;
  text: string;
  element: HTMLElement;
}

/** 內容容器的 ref */
const contentRef = ref<HTMLElement | null>(null);

/** 目錄項目陣列 */
const tocItems = ref<TocItem[]>([]);

/** 當前活動的標題 ID */
const activeId = ref<string>("");

/** IntersectionObserver 實例 */
let observer: IntersectionObserver | null = null;

// ==========================================
// Methods
// ==========================================

/**
 * 掃描內容區域的所有 <h2> 標籤
 * 如果沒有 id，自動賦予唯一 id
 */
const scanHeadings = (): void => {
  if (!contentRef.value) return;

  const headings = contentRef.value.querySelectorAll("h2");
  const items: TocItem[] = [];

  headings.forEach((heading, index) => {
    // 如果沒有 id，自動賦予
    if (!heading.id) {
      heading.id = `section-${index}`;
    }

    items.push({
      id: heading.id,
      text: heading.textContent?.trim() || `Section ${index + 1}`,
      element: heading,
    });
  });

  tocItems.value = items;

  // 設定初始 activeId
  if (items.length > 0) {
    activeId.value = items[0].id;
  }
};

/**
 * 設定 IntersectionObserver 進行 Scroll Spy
 */
const setupScrollSpy = () => {
  if (tocItems.value.length === 0) return;

  // 建立 Observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    {
      // rootMargin: 上方偏移 -10%, 下方偏移 -80%
      // 這讓標題在進入視窗上方 10% 時觸發
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    }
  );

  // 觀察所有標題
  tocItems.value.forEach((item) => {
    if (item.element && observer) {
      observer.observe(item.element);
    }
  });
};

/**
 * 平滑捲動到指定標題
 */
const scrollToHeading = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // 手動更新 activeId
    activeId.value = id;
  }
};

/**
 * 判斷項目是否為當前活動項目
 */
const isActive = (id: string): boolean => activeId.value === id;

/**
 * 平滑捲動回到頁面頂部
 */
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// ==========================================
// Lifecycle
// ==========================================

onMounted(async () => {
  // 等待 DOM 完全渲染
  await nextTick();

  // 稍微延遲以確保 slot 內容已渲染
  setTimeout(() => {
    scanHeadings();
    setupScrollSpy();
  }, 100);
});

onUnmounted(() => {
  // 清理 Observer
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<template>
  <div class="doc-layout">
    <!-- 側邊目錄 -->
    <aside class="doc-toc">
      <div class="doc-toc__inner">
        <div
          class="doc-toc__header"
          @click="scrollToTop"
          title="點擊回到最上面"
          role="button"
          tabindex="0"
          @keydown.enter="scrollToTop"
          @keydown.space.prevent="scrollToTop"
        >
          <div class="doc-toc__header-left">
            <List :size="16" class="doc-toc__header-icon" />
            <span class="doc-toc__title">{{ title }}</span>
          </div>

          <div class="doc-toc__back-to-top">
            <ArrowUp :size="14" />
          </div>
        </div>

        <nav class="doc-toc__nav">
          <ul class="doc-toc__list">
            <li v-for="item in tocItems" :key="item.id">
              <a
                :href="`#${item.id}`"
                :class="[
                  'doc-toc__link',
                  { 'doc-toc__link--active': isActive(item.id) },
                ]"
                @click.prevent="scrollToHeading(item.id)"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- 空狀態 -->
        <div v-if="tocItems.length === 0" class="doc-toc__empty">
          <span class="doc-toc__empty-text">尚無目錄項目</span>
          <span class="doc-toc__empty-hint"
            >請在內容中加入 &lt;h2&gt; 標題</span
          >
        </div>
      </div>
    </aside>

    <!-- 主要內容區 -->
    <article ref="contentRef" class="doc-content">
      <slot />
    </article>
  </div>
</template>

<style scoped>
.doc-layout {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  /* overflow-x: hidden; */
  align-items: flex-start;
}

/* ==========================================
   側邊目錄
   ========================================== */
.doc-toc {
  flex-shrink: 0;
  width: 220px;
  position: sticky;
  top: 5.5rem;
}

.doc-toc__inner {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  padding: 1rem;
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  transition: background-color 0.3s ease;
}

.doc-toc__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem;
  margin: -0.5rem -0.5rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0.5rem 0.5rem 0 0;
  cursor: pointer;
  transition: background-color 0.15s ease;
  user-select: none;
}

.doc-toc__header:hover {
  background-color: var(--color-bg-main);
}

.doc-toc__header:hover .doc-toc__back-to-top {
  color: var(--color-primary);
  transform: translateY(-1px);
}

.doc-toc__header:active .doc-toc__back-to-top {
  transform: translateY(0);
}

.doc-toc__header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.doc-toc__header-icon {
  color: var(--color-primary);
}

.doc-toc__title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.doc-toc__back-to-top {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--color-text-muted);
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.doc-toc__nav {
  overflow-y: auto;
}

.doc-toc__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.doc-toc__link {
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 0.375rem;
  border-left: 3px solid transparent;
  transition: all 0.15s ease;
  line-height: 1.4;
}

.doc-toc__link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-main);
}

.doc-toc__link--active {
  color: var(--color-primary);
  font-weight: 600;
  background-color: rgba(99, 102, 241, 0.08);
  border-left-color: var(--color-primary);
}

.doc-toc__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0.5rem;
  text-align: center;
}

.doc-toc__empty-text {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.doc-toc__empty-hint {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  opacity: 0.7;
}

/* ==========================================
   主要內容區 - 只負責佈局，不套用卡片樣式
   ========================================== */
.doc-content {
  flex: 1;
  min-width: 0;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 1024px) {
  .doc-layout {
    flex-direction: column;
  }

  .doc-toc {
    width: 100%;
    order: 2;
  }

  .doc-toc__inner {
    position: static;
    max-height: none;
  }

  .doc-content {
    order: 1;
  }
}
</style>

<style>
/* ==========================================
   共用內容卡片樣式
   可供各頁面使用
   ========================================== */
.content-card {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  transition: background-color 0.3s ease;
}

@media (max-width: 640px) {
  .content-card {
    padding: 1.5rem;
  }
}

/* ==========================================
   共用 Prose (Typography) 樣式
   可供各頁面使用：加上 .content-prose class
   ========================================== */
.content-prose {
  color: var(--color-text-secondary);
}

.content-prose h2 {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.625rem;
  border-bottom: 2px solid #c7d2fe;
  scroll-margin-top: 6rem;
}

.content-prose h2:first-child {
  margin-top: 0;
}

.content-prose h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  scroll-margin-top: 6rem;
}

.content-prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
}

.content-prose ul,
.content-prose ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.content-prose li {
  margin-bottom: 0.375rem;
}

.content-prose a {
  color: var(--color-primary);
  font-weight: 500;
}

.content-prose a:hover {
  text-decoration: underline;
}

.content-prose blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--color-text-secondary);
  background: var(--color-bg-main);
  padding: 1rem 1rem 1rem 1.25rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.content-prose code {
  background: var(--color-bg-main);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-weight: 500;
  color: var(--color-primary);
}

.content-prose pre {
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.content-prose pre code {
  background: transparent;
  padding: 0;
  color: #e2e8f0;
  font-size: 0.875rem;
}

/* h2 邊框顏色調整（深色風格） */
.content-prose h2 {
  border-bottom-color: #4f46e5;
}

.content-prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.content-prose th,
.content-prose td {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  text-align: left;
}

.content-prose th {
  background: var(--color-bg-main);
  font-weight: 600;
  color: var(--color-text-primary);
}

.content-prose img {
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
}

/* 特殊樣式：提示框 */
.content-prose .tip {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}

.content-prose .tip-title {
  font-weight: 600;
  color: #93c5fd;
  margin-bottom: 0.5rem;
}

.content-prose .warning {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}

.content-prose .warning-title {
  font-weight: 600;
  color: #fcd34d;
  margin-bottom: 0.5rem;
}
</style>
