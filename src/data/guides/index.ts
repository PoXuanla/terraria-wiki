/**
 * 指南資料庫 - 統一匯出
 */
import type { Component } from 'vue'
import { FileText } from 'lucide-vue-next'

/**
 * 指南資料類型
 */
export interface GuideData {
  /** URL slug */
  slug: string
  /** 中文名稱 */
  name: string
  /** 英文名稱（可選） */
  nameEn?: string
  /** 圖示（Component 或 URL） */
  icon: Component | string
  /** 組件名稱（用於動態導入） */
  componentName: string
  /** 簡短描述（可選） */
  description?: string
}

/**
 * 所有指南資料陣列
 */
export const guides: GuideData[] = [
  {
    slug: 'mimic',
    name: '寶藏怪狩獵指南',
    nameEn: 'Mimic Hunting Guide',
    componentName: 'MimicGuide',
    icon: 'https://terraria.wiki.gg/images/f/f5/Mimic.png',
    description: '教你如何高效率狩獵寶藏怪'
  },
  {
    slug: 'clentaminator',
    name: '環境治理指南',
    nameEn: 'Clentaminator Guide',
    componentName: 'ClentaminatorGuide',
    icon: 'https://terraria.wiki.gg/images/9/9b/Clentaminator.png',
    description: '淨化世界的完整指南'
  },
  {
    slug: 'mimic-doc',
    name: '寶箱怪指南 (文檔版)',
    nameEn: 'Mimic Guide (Doc Version)',
    componentName: 'MimicHuntingDoc',
    icon: FileText,
    description: '詳細的文檔版本指南'
  }
]

/**
 * 依 slug 取得單一指南
 */
export const getGuideBySlug = (slug: string): GuideData | undefined =>
  guides.find((g) => g.slug === slug)

/**
 * 搜尋指南 (依名稱模糊搜尋)
 */
export const searchGuides = (query: string): GuideData[] => {
  const q = query.toLowerCase()
  return guides.filter(
    (g) =>
      g.name.toLowerCase().includes(q) ||
      g.nameEn?.toLowerCase().includes(q) ||
      g.description?.toLowerCase().includes(q)
  )
}

export default guides

