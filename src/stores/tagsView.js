import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
   * @type {Ref<Array<{title: string, path: string, name: string}>>}
   */
  const visitedTags = ref([])
  
  /**
   * 快取的路由名稱列表 (用於 KeepAlive)
   * @type {Ref<string[]>}
   */
  const cachedViews = ref([])

  // ==========================================
  // Getters
  // ==========================================
  
  /**
   * 取得所有已訪問的標籤
   */
  const tags = computed(() => visitedTags.value)
  
  /**
   * 取得所有快取的視圖名稱
   */
  const cachedViewNames = computed(() => cachedViews.value)

  // ==========================================
  // Actions
  // ==========================================
  
  /**
   * 新增標籤
   * @param {Object} route - 路由物件，包含 path, name, meta.title
   */
  function addTag(route) {
    // 檢查是否為有效路由
    if (!route.path || !route.meta?.title) {
      return
    }
    
    // 避免重複添加相同的路由
    const exists = visitedTags.value.some(tag => tag.path === route.path)
    if (exists) {
      return
    }
    
    // 新增標籤
    visitedTags.value.push({
      title: route.meta.title,
      path: route.path,
      name: route.name || '',
    })
    
    // 加入快取列表 (用於 KeepAlive)
    if (route.name && !cachedViews.value.includes(route.name)) {
      cachedViews.value.push(route.name)
    }
  }
  
  /**
   * 移除標籤
   * @param {string} path - 要移除的路由路徑
   * @returns {Object|null} 返回相鄰的標籤 (用於自動跳轉)
   */
  function removeTag(path) {
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
   * @param {string} currentPath - 當前路由路徑
   */
  function removeOtherTags(currentPath) {
    const currentTag = visitedTags.value.find(tag => tag.path === currentPath)
    
    if (currentTag) {
      visitedTags.value = [currentTag]
      cachedViews.value = currentTag.name ? [currentTag.name] : []
    }
  }
  
  /**
   * 關閉所有標籤
   */
  function removeAllTags() {
    visitedTags.value = []
    cachedViews.value = []
  }
  
  /**
   * 檢查標籤是否存在
   * @param {string} path - 路由路徑
   * @returns {boolean}
   */
  function hasTag(path) {
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

