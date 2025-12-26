import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * 標籤視圖項目介面
 */
export interface TagItem {
  /** 標籤標題 */
  title: string
  /** 路由路徑 */
  path: string
  /** 路由名稱 */
  name: string
  /** 圖示 */
  icon: any
}

/**
 * 路由元資訊介面
 */
export interface RouteMeta {
  /** 頁面標題 */
  title?: string
  /** 頁面圖示 */
  icon?: any
}

/**
 * 路由物件介面
 */
export interface RouteInfo {
  /** 路由路徑 */
  path: string
  /** 路由名稱 */
  name?: string
  /** 路由元資訊 */
  meta?: RouteMeta
}

/**
 * 歷史標籤狀態管理
 * 用於追蹤使用者訪問過的頁面，並在 Header 下方顯示標籤列表
 */
export const useTagsViewStore = defineStore('tagsView', () => {
  // ==========================================
  // State
  // ==========================================
  
  /**
   * 訪問過的標籤列表
   */
  const visitedTags: Ref<TagItem[]> = ref([])
  
  /**
   * 快取的路由名稱列表 (用於 KeepAlive)
   */
  const cachedViews: Ref<string[]> = ref([])

  // ==========================================
  // Getters
  // ==========================================
  
  /**
   * 取得所有已訪問的標籤
   */
  const tags = computed<TagItem[]>(() => visitedTags.value)
  
  /**
   * 取得所有快取的視圖名稱
   */
  const cachedViewNames = computed<string[]>(() => cachedViews.value)

  // ==========================================
  // Actions
  // ==========================================
  
  /**
   * 新增標籤
   * @param route - 路由物件，包含 path, name, meta.title, meta.icon
   */
  function addTag(route: RouteInfo | RouteLocationNormalizedLoaded): void {
    // 檢查是否為有效路由
    if (!route.path || !route.meta?.title) {
      return
    }
    
    // 避免重複添加相同的路由
    const exists = visitedTags.value.some(tag => tag.path === route.path)
    if (exists) {
      return
    }
    
    // 新增標籤 (包含 icon)
    visitedTags.value.push({
      title: route.meta.title as string,
      path: route.path,
      name: typeof route.name === 'string' ? route.name : '',
      icon: route.meta.icon || null, // 存入 icon
    })
    
    // 加入快取列表 (用於 KeepAlive)
    if (route.name && typeof route.name === 'string' && !cachedViews.value.includes(route.name)) {
      cachedViews.value.push(route.name)
    }
  }
  
  /**
   * 移除標籤
   * @param path - 要移除的路由路徑
   * @returns 返回相鄰的標籤 (用於自動跳轉)
   */
  function removeTag(path: string): TagItem | null {
    const index = visitedTags.value.findIndex(tag => tag.path === path)
    
    if (index === -1) {
      return null
    }
    
    // 取得要移除的標籤
    const removedTag = visitedTags.value[index]
    
    // 從列表中移除
    visitedTags.value.splice(index, 1)
    
    // 從快取中移除
    if (removedTag.name) {
      const cacheIndex = cachedViews.value.indexOf(removedTag.name)
      if (cacheIndex > -1) {
        cachedViews.value.splice(cacheIndex, 1)
      }
    }
    
    // 返回相鄰標籤 (優先返回右邊的，沒有則返回左邊的)
    if (visitedTags.value.length === 0) {
      return null
    }
    
    // 如果刪除的是最後一個，返回新的最後一個
    if (index >= visitedTags.value.length) {
      return visitedTags.value[visitedTags.value.length - 1]
    }
    
    // 否則返回同位置的標籤
    return visitedTags.value[index]
  }
  
  /**
   * 關閉其他標籤 (保留當前)
   * @param currentPath - 當前路由路徑
   */
  function removeOtherTags(currentPath: string): void {
    const currentTag = visitedTags.value.find(tag => tag.path === currentPath)
    
    if (currentTag) {
      visitedTags.value = [currentTag]
      cachedViews.value = currentTag.name ? [currentTag.name] : []
    }
  }
  
  /**
   * 關閉所有標籤
   */
  function removeAllTags(): void {
    visitedTags.value = []
    cachedViews.value = []
  }
  
  /**
   * 檢查標籤是否存在
   * @param path - 路由路徑
   * @returns 是否存在
   */
  function hasTag(path: string): boolean {
    return visitedTags.value.some(tag => tag.path === path)
  }

  return {
    // State
    visitedTags,
    cachedViews,
    // Getters
    tags,
    cachedViewNames,
    // Actions
    addTag,
    removeTag,
    removeOtherTags,
    removeAllTags,
    hasTag,
  }
})
