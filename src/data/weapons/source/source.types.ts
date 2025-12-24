import { SourceType } from './source-type.enum'

/**
 * 製作配方素材
 */
export interface RecipeItem {
  /** 素材名稱 */
  name: string;
  /** 素材英文名 */
  nameEn: string;
  /** 素材圖示 URL */
  icon: string;
  /** 所需數量 */
  count: number;
}

/**
 * 製作來源
 */
export interface CraftingSource {
  type: SourceType.Crafting;
  /** 製作站名稱 */
  station: string;
  /** 配方列表 */
  recipe: RecipeItem[];
  /** 額外備註 */
  note?: string;
}

/**
 * 怪物/Boss 掉落
 */
export interface DropSource {
  type: SourceType.Drop;
  /** 掉落怪物名稱 */
  dropFrom: string;
  /** 掉落怪物圖示 URL */
  dropFromIcon?: string;
  /** 掉落機率 */
  dropChance: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * NPC 購買
 */
export interface PurchaseSource {
  type: SourceType.Purchase;
  /** NPC 名稱 */
  npc: string;
  /** NPC 圖示 URL */
  npcIcon?: string;
  /** 價格（如 "5 金幣"） */
  price: string;
  /** 購買條件（如 "血月期間"） */
  condition?: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * 寶箱獲得
 */
export interface ChestSource {
  type: SourceType.Chest;
  /** 寶箱類型（如 "金箱子", "暗影箱"） */
  chestType: string;
  /** 寶箱圖示 URL */
  chestIcon?: string;
  /** 所在位置（如 "地牢", "地獄"） */
  location: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * 釣魚獲得
 */
export interface FishingSource {
  type: SourceType.Fishing;
  /** 釣魚環境（如 "血月", "海洋"） */
  biome: string;
  /** 釣獲機率 */
  catchChance?: string;
  /** 需要的釣魚力 */
  fishingPower?: number;
  /** 額外備註 */
  notes?: string;
}

/**
 * 木箱/寶箱包獲得
 */
export interface CrateSource {
  type: SourceType.Crate;
  /** 木箱類型（如 "神聖匣", "鐵匣"） */
  crateType: string;
  /** 木箱圖示 URL */
  crateIcon?: string;
  /** 掉落機率 */
  dropChance: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * 任務獎勵
 */
export interface QuestSource {
  type: SourceType.Quest;
  /** 任務給予者（如 "釣魚人"） */
  questGiver: string;
  /** 任務給予者圖示 URL */
  questGiverIcon?: string;
  /** 任務名稱 */
  questName?: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * 事件獎勵
 */
export interface EventSource {
  type: SourceType.Event;
  /** 事件名稱（如 "海盜入侵", "哥布林軍團"） */
  eventName: string;
  /** 事件圖示 URL */
  eventIcon?: string;
  /** 掉落來源怪物 */
  dropFrom?: string;
  /** 掉落機率 */
  dropChance?: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * Boss 寶藏袋
 */
export interface BagSource {
  type: SourceType.Bag;
  /** Boss 名稱 */
  bossName: string;
  /** Boss 圖示 URL */
  bossIcon?: string;
  /** 寶藏袋圖示 URL */
  bagIcon?: string;
  /** 掉落機率（如 "專家模式限定"） */
  dropChance: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * 其他特殊方式
 */
export interface OtherSource {
  type: SourceType.Other;
  /** 獲取方式描述 */
  description: string;
  /** 圖示 URL */
  icon?: string;
  /** 額外備註 */
  notes?: string;
}

/**
 * 武器取得方式（統一類型）
 */
export type WeaponSource =
  | CraftingSource
  | DropSource
  | PurchaseSource
  | ChestSource
  | FishingSource
  | CrateSource
  | QuestSource
  | EventSource
  | BagSource
  | OtherSource;

