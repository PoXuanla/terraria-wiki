/**
 * 武器圖鑑索引頁面 - TypeScript 類型定義
 */

import type { WeaponData } from "@/data/weapons/types";

// ==========================================
// 篩選選項類型
// ==========================================

/**
 * 通用篩選選項
 */
export interface FilterOption<T = string> {
  key: T;
  label: string;
  icon?: string;
}

/**
 * 職業選項
 */
export type ClassOption = FilterOption<string>;

/**
 * 稀有度選項
 */
export interface RarityOption {
  key: number | "";
  label: string;
}

/**
 * 取得方式選項
 */
export type SourceOption = FilterOption<string>;

/**
 * 排序選項
 */
export interface SortOption {
  key: SortKey;
  label: string;
}

// ==========================================
// 排序與篩選類型
// ==========================================

/**
 * 排序欄位
 */
export type SortKey = "damage" | "rarity" | "name";

/**
 * 排序方向
 */
export type SortOrder = "asc" | "desc";

/**
 * 職業類型
 */
export type WeaponClass = "Ranger" | "Melee" | "Mage" | "Summoner" | "";

/**
 * 取得方式類型
 */
export type SourceType = "crafting" | "drop" | "";

// ==========================================
// 武器列表項目
// ==========================================

/**
 * 擴展武器資料（用於列表顯示）
 */
export interface WeaponListItem extends WeaponData {
  /** 列表項目 ID（等同於 slug） */
  id: string;
  /** 數值化的傷害值（用於排序） */
  damageNum: number;
}

// ==========================================
// 稀有度顏色映射
// ==========================================

/**
 * 稀有度等級對應顏色
 */
export const RARITY_COLORS: Record<number, string> = {
  4: "#f59e0b",
  5: "#f472b6",
  6: "#a855f7",
  7: "#22c55e",
  8: "#fbbf24",
};

/**
 * 預設顏色
 */
export const DEFAULT_COLOR = "#6b7280";

