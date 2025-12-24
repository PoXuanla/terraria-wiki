/**
 * 武器資料庫 - 統一匯出與工具函數
 *
 * 提供：
 * - 所有武器的統一匯出
 * - 依職業/稀有度分類
 * - 搜尋與篩選功能
 */

import type { WeaponData } from './types'

// 匯入所有武器資料
import onyxBlaster from "./onyx-blaster"
import shadowflameKnife from "./shadowflame-knife"
import meteorStaff from "./meteor-staff"
import skyFracture from "./sky-fracture"
import sanguineStaff from "./sanguine-staff"
import daedalusStormbow from "./daedalus-stormbow"
import goldenShower from "./golden-shower"
import bladeStaff from "./blade-staff"
import dartRifle from "./dart-rifle"
import fetidBaghnakhs from "./fetid-baghnakhs"

// ==========================================
// 所有武器陣列
// ==========================================

/**
 * 所有武器資料陣列
 */
export const weapons: WeaponData[] = [
  onyxBlaster,
  shadowflameKnife,
  meteorStaff,
  skyFracture,
  sanguineStaff,
  daedalusStormbow,
  goldenShower,
  bladeStaff,
  dartRifle,
  fetidBaghnakhs,
]

// ==========================================
// 職業分類
// ==========================================

/**
 * 職業標籤對照表
 */
export const classLabels: Record<string, string> = {
  Ranger: "遠程",
  Melee: "近戰",
  Mage: "魔法",
  Summoner: "召喚",
}

/**
 * 職業顏色對照表 (Tailwind CSS 類別)
 */
export const classColors: Record<string, {
  bg: string
  text: string
  darkBg: string
  darkText: string
  hex: string
}> = {
  Ranger: {
    bg: "bg-green-100",
    text: "text-green-700",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-400",
    hex: "#22c55e",
  },
  Melee: {
    bg: "bg-red-100",
    text: "text-red-700",
    darkBg: "dark:bg-red-900/30",
    darkText: "dark:text-red-400",
    hex: "#ef4444",
  },
  Mage: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    darkBg: "dark:bg-purple-900/30",
    darkText: "dark:text-purple-400",
    hex: "#a855f7",
  },
  Summoner: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    darkBg: "dark:bg-cyan-900/30",
    darkText: "dark:text-cyan-400",
    hex: "#06b6d4",
  },
}

/**
 * 依職業分類的武器
 */
export const weaponsByClass: Record<string, WeaponData[]> = {
  Ranger: weapons.filter((w) => w.class === "Ranger"),
  Melee: weapons.filter((w) => w.class === "Melee"),
  Mage: weapons.filter((w) => w.class === "Mage"),
  Summoner: weapons.filter((w) => w.class === "Summoner"),
}

// ==========================================
// 稀有度分類
// ==========================================

/**
 * 稀有度顏色對照表
 */
export const rarityColors: Record<number, { color: string; label: string }> = {
  1: { color: "#9d9d9d", label: "灰色" },
  2: { color: "#96be00", label: "綠色" },
  3: { color: "#b200ff", label: "紫色" },
  4: { color: "#ff2864", label: "淺紅色" },
  5: { color: "#f472b6", label: "粉紅色" },
  6: { color: "#d946ef", label: "淺紫色" },
  7: { color: "#22c55e", label: "萊姆色" },
  8: { color: "#fbbf24", label: "黃色" },
}

/**
 * 依稀有度篩選武器
 */
export const getWeaponsByRarity = (level: number): WeaponData[] =>
  weapons.filter((w) => w.rarity.level === level)

// ==========================================
// 查詢與搜尋功能
// ==========================================

/**
 * 依 slug 取得單一武器
 */
export const getWeaponBySlug = (slug: string): WeaponData | undefined =>
  weapons.find((w) => w.slug === slug)

/**
 * 依英文名稱取得武器
 */
export const getWeaponByNameEn = (nameEn: string): WeaponData | undefined =>
  weapons.find((w) => w.nameEn.toLowerCase() === nameEn.toLowerCase())

/**
 * 搜尋武器 (依名稱模糊搜尋)
 */
export const searchWeapons = (query: string): WeaponData[] => {
  const q = query.toLowerCase()
  return weapons.filter(
    (w) =>
      w.name.toLowerCase().includes(q) ||
      w.nameEn.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q)
  )
}

interface WeaponFilters {
  class?: string
  rarity?: number
  sourceType?: string
}

/**
 * 篩選武器
 */
export const filterWeapons = (filters: WeaponFilters = {}): WeaponData[] => {
  return weapons.filter((w) => {
    if (filters.class && w.class !== filters.class) return false
    if (filters.rarity && w.rarity.level !== filters.rarity) return false
    if (filters.sourceType && w.source.type !== filters.sourceType)
      return false
    return true
  })
}

// ==========================================
// 個別匯出 (方便單頁直接使用)
// ==========================================

export {
  onyxBlaster,
  shadowflameKnife,
  meteorStaff,
  skyFracture,
  sanguineStaff,
  daedalusStormbow,
  goldenShower,
  bladeStaff,
  dartRifle,
  fetidBaghnakhs,
}

// 類型匯出
export type { WeaponData, WeaponMeta, DetailedDescription } from './types'

// 預設匯出所有武器陣列
export default weapons

