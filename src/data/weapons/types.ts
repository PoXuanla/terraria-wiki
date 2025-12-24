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
// 武器機制類型 (Weapon Mechanics)
// ==========================================

/**
 * 操作機制 - 決定玩家按滑鼠時的手感
 */
export interface InputMechanics {
  /** 自動揮舞/連發 - 按住左鍵持續攻擊 */
  autoReuse: boolean;
  /** 持續引導 - 需按住維持效果（雷射、溜溜球） */
  channeling?: boolean;
  /** 攻擊轉向 - 攻擊動作中是否可轉身 */
  useTurn?: boolean;
}

/**
 * 彈藥消耗設定
 */
export interface AmmoConfig {
  /** 彈藥類型 (Bullet, Arrow, Dart, Rocket, etc.) */
  type: string;
  /** 省彈機率 (0-100)，100 = 無限彈藥 */
  saveChance?: number;
}

/**
 * 資源消耗 - 決定使用的成本
 */
export interface ResourceConsumption {
  /** 魔力消耗 */
  manaCost?: number;
  /** 彈藥消耗設定 */
  ammo?: AmmoConfig;
  /** 是否為消耗品（投擲類武器） */
  consumable?: boolean;
}

/**
 * 彈道與物理 - 決定攻擊如何擊中敵人
 */
export interface ProjectilePhysics {
  /** 穿透數 (-1 = 無限穿透) */
  piercing?: number;
  /** 反彈次數 */
  bounces?: number;
  /** 穿牆 (忽略地形碰撞) */
  tileIgnore?: boolean;
  /** 追蹤能力 */
  homing?: boolean | 'weak' | 'strong';
  /** 飛行速度 */
  velocity?: number;
}

/**
 * 減益效果
 */
export interface Debuff {
  /** 減益名稱 */
  name: string;
  /** 減益英文名 */
  nameEn: string;
  /** 圖示 URL */
  icon?: string;
  /** 持續時間（秒） */
  duration?: number;
  /** 每秒傷害 (DoT) */
  damagePerSecond?: number;
  /** 特殊效果描述 */
  effect?: string;
}

/**
 * 戰鬥效果 - 攻擊命中後會發生什麼
 */
export interface CombatEffects {
  /** 施加的減益效果 */
  debuffs?: Debuff[];
  /** 吸血比例 (0-1) */
  lifeSteal?: number;
  /** 真近戰 - 劍刃本體造成傷害 */
  trueMelee?: boolean;
  /** 額外效果描述 */
  specialEffects?: string[];
}

/**
 * 召喚物特性 - 召喚武器專用
 */
export interface SummonBehavior {
  /** 召喚欄位消耗 */
  slots: number;
  /** AI 類型 */
  aiType: 'melee' | 'ranged' | 'flying' | 'stationary' | 'whip';
  /** 追蹤能力 */
  tracking?: boolean | 'weak' | 'strong' | 'perfect';
  /** 攻擊速度描述 */
  attackSpeed?: string;
  /** 是否需要鞭子標記 */
  requiresWhip?: boolean;
  /** 特殊能力 */
  specialAbility?: string;
}

/**
 * 近戰特性 - 近戰武器專用
 */
export interface MeleeProperties {
  /** 攻擊範圍 (tiles) */
  range?: number;
  /** 揮擊角度 */
  swingArc?: number;
  /** 是否發射劍氣 */
  projectile?: boolean;
  /** 無視防禦比例 (0-1) */
  armorPenetration?: number;
}

/**
 * 武器機制 - 完整的操作與效果資訊
 */
export interface WeaponMechanics {
  /** 操作機制 */
  input: InputMechanics;
  /** 資源消耗 */
  resource?: ResourceConsumption;
  /** 彈道與物理（魔法/遠程武器） */
  projectile?: ProjectilePhysics;
  /** 戰鬥效果 */
  combat?: CombatEffects;
  /** 召喚物特性（召喚武器） */
  summon?: SummonBehavior;
  /** 近戰特性（近戰武器） */
  melee?: MeleeProperties;
}

// ==========================================
// 取得方式類型 (Source)
// ==========================================

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
  type: 'crafting';
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
  type: 'drop';
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
  type: 'purchase';
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
  type: 'chest';
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
  type: 'fishing';
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
  type: 'crate';
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
  type: 'quest';
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
  type: 'event';
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
  type: 'bag';
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
  type: 'other';
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
  /** 取得方式（支援複數來源） */
  sources: WeaponSource[];
  whyGood: string;
  /** 戰術資訊 */
  meta: WeaponMeta;
  /** 詳細描述 */
  detailedDescription: DetailedDescription;
  /** 武器機制（選填） */
  mechanics?: WeaponMechanics;
}

