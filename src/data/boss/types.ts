/**
 * Boss 資料 TypeScript 類型定義
 */

// ==========================================
// 基礎類型定義
// ==========================================

/**
 * 召喚物合成材料
 */
export interface SummoningRecipeItem {
  name: string;
  nameEn: string;
  amount: number;
  icon: string;
}

/**
 * 召喚方式
 */
export interface BossSummoning {
  item: string;
  itemEn: string;
  itemIcon: string;
  timeRestriction: string;
  recipe: SummoningRecipeItem[];
  craftStation: string;
}

/**
 * Boss 行為模式
 */
export interface BossBehavior {
  title: string;
  description: string;
  icon: string;
}

/**
 * 戰鬥階段
 */
export interface BossPhase {
  phase: string;
  description: string;
  danger: "low" | "medium" | "high";
}

/**
 * 核心戰術
 */
export interface BossCoreStrategy {
  title: string;
  priority: string;
  reason: string;
  steps: string[];
}

/**
 * 戰鬥資訊
 */
export interface BossCombat {
  arena: {
    title: string;
    tips: string[];
  };
  behavior: BossBehavior[];
  coreStrategy: BossCoreStrategy;
  phases?: BossPhase[]; // 可選，只有 The Twins 有
}

// ==========================================
// 裝備相關類型
// ==========================================

/**
 * 職業標籤
 */
export interface ClassTab {
  id: "ranger" | "melee" | "mage" | "summoner";
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

/**
 * 推薦武器
 */
export interface BossWeapon {
  name: string;
  nameEn: string;
  icon: string;
  ammo: string;
  description: string;
  route: string;
  hasPage: boolean;
  highlight?: boolean;
}

/**
 * 飾品
 */
export interface BossAccessory {
  name: string;
  nameEn: string;
  icon: string;
  description: string;
}

/**
 * 護甲
 */
export interface BossArmor {
  name: string;
  nameEn: string;
  icon: string;
  description: string;
}

/**
 * 裝備資訊
 */
export interface BossEquipment {
  classTabs: ClassTab[];
  classWeapons: {
    ranger: BossWeapon[];
    melee: BossWeapon[];
    mage: BossWeapon[];
    summoner: BossWeapon[];
  };
  accessories: BossAccessory[];
  armor: BossArmor;
  buffs: string[];
  weapons?: BossWeapon[]; // The Twins 的額外屬性
}

/**
 * 掉落物
 */
export interface BossDrop {
  name: string;
  nameEn: string;
  icon: string;
  amount: string;
  chance: string;
  description: string;
  highlight?: boolean;
}

// ==========================================
// 基礎 Boss 資料
// ==========================================

/**
 * 基礎 Boss 資料（所有 Boss 共有的屬性）
 */
export interface BaseBossData {
  slug: string;
  name: string;
  nameEn: string;
  type: string;
  difficulty: string;
  wikiUrl: string;
  summoning: BossSummoning;
  combat: BossCombat;
  equipment: BossEquipment;
  drops: BossDrop[];
}

// ==========================================
// Boss 特定類型擴展
// ==========================================

/**
 * Boss 屬性數據
 */
export interface BossStats {
  name: string;
  nameEn: string;
  icon: string;
  hp: number;
  defense: number;
  damage: number;
  segments?: number;
  notes: string;
}

/**
 * Boss 部位
 */
export interface BossPart {
  name: string;
  nameEn: string;
  icon: string;
  hp: number;
  defense: number;
  damage: number;
  notes: string;
  color: string;
  danger: "low" | "medium" | "high";
}

/**
 * 雙子 Boss 階段資訊
 */
export interface PhaseInfo {
  attack: string;
  behavior: string;
}

/**
 * 雙子 Boss 詳細資訊
 */
export interface TwinBossInfo {
  name: string;
  nameEn: string;
  color: string;
  icon: string;
  stats: {
    maxLife: number;
    defense: number;
    damage: number;
  };
  phase1: PhaseInfo;
  phase2: PhaseInfo & {
    trigger: string;
    specialMove: string;
    warning?: string;
  };
}

// ==========================================
// 具體 Boss 類型
// ==========================================

/**
 * 機械魔眼 (The Twins)
 */
export interface TheTwinsData extends BaseBossData {
  icons: {
    retinazer: string;
    spazmatism: string;
  };
  twins: {
    retinazer: TwinBossInfo;
    spazmatism: TwinBossInfo;
  };
}

/**
 * 毀滅者 (The Destroyer)
 */
export interface TheDestroyerData extends BaseBossData {
  icon: string;
  stats: {
    main: BossStats;
    probe: BossStats;
  };
}

/**
 * 機械骷髏王 (Skeletron Prime)
 */
export interface SkeletronPrimeData extends BaseBossData {
  icon: string;
  parts: BossPart[];
}

// ==========================================
// 聯合類型
// ==========================================

/**
 * 所有 Boss 資料的聯合類型
 */
export type BossData = TheTwinsData | TheDestroyerData | SkeletronPrimeData;

// ==========================================
// 類型守衛函數
// ==========================================

/**
 * 檢查是否為 The Twins
 */
export function isTheTwins(boss: BossData): boss is TheTwinsData {
  return boss.slug === "the-twins";
}

/**
 * 檢查是否為 The Destroyer
 */
export function isTheDestroyer(boss: BossData): boss is TheDestroyerData {
  return boss.slug === "the-destroyer";
}

/**
 * 檢查是否為 Skeletron Prime
 */
export function isSkeletronPrime(boss: BossData): boss is SkeletronPrimeData {
  return boss.slug === "skeletron-prime";
}

// ==========================================
// 常數類型
// ==========================================

/**
 * Boss 類型對照
 */
export type BossType = "機械 Boss" | "困難模式 Boss" | "困難模式前 Boss";

/**
 * 難度標籤
 */
export type DifficultyLevel = "easy" | "medium" | "hard";

/**
 * 難度標籤配置
 */
export interface DifficultyLabel {
  label: string;
  color: string;
  icon: string;
}
