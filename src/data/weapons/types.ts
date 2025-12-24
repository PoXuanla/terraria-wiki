/**
 * 武器資料 TypeScript 類型定義
 */

// ==========================================
// 戰術資訊類型（StrategyGuide 使用）
// ==========================================

/**
 * 推薦物品（用於第一張策略卡片）
 */
export interface RecommendedItem {
  name: string;
  nameEn: string;
  icon: string;
  description: string;
}

/**
 * 最佳對付目標
 */
export interface BestAgainstTarget {
  name: string;
  nameEn: string;
  reason: string;
}

/**
 * 最佳重鑄前綴
 */
export interface BestModifier {
  name: string;
  nameEn: string;
  description: string;
}

/**
 * 武器戰術資訊
 */
export interface WeaponMeta {
  /** 最佳重鑄前綴 */
  bestModifier: BestModifier;
  /** 推薦彈藥（遠程武器） */
  bestAmmo?: RecommendedItem;
  /** 推薦鞭子（召喚武器） */
  bestWhip?: RecommendedItem;
  /** 核心飾品（近戰/魔法武器） */
  bestAccessory?: RecommendedItem;
  /** 核心用途（輔助武器） */
  bestUseCase?: RecommendedItem;
  /** 推薦飾品列表 */
  recommendedAccessories: string[];
  /** 最佳對付的 Boss/敵人 */
  bestAgainst: BestAgainstTarget[];
}

/**
 * 詳細描述
 */
export interface DetailedDescription {
  attackPattern: string;
  strategy: string;
}

// ==========================================
// 武器資料完整類型（其他欄位暫用 any）
// ==========================================

/**
 * 武器資料
 */
export interface WeaponData {
  slug: string;
  name: string;
  nameEn: string;
  class: string;
  classLabel: string;
  rarity: any;
  icon: string;
  wikiUrl: string;
  stats: any;
  description: string;
  source: any;
  whyGood: string;
  /** 戰術資訊 */
  meta: WeaponMeta;
  /** 詳細描述 */
  detailedDescription: DetailedDescription;
}

