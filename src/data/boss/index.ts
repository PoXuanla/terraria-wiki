/**
 * Boss 資料庫 - 統一匯出與工具函數
 *
 * 提供：
 * - 所有 Boss 的統一匯出
 * - 依類型分類
 * - 搜尋與篩選工具函數
 */

// 匯入類型定義
import type {
  BossData,
  BossType,
  DifficultyLevel,
  DifficultyLabel,
} from "./types";

// 匯入所有 Boss 資料
import { theTwins } from "./the-twins";
import { theDestroyer } from "./the-destroyer";
import { skeletronPrime } from "./skeletron-prime";

// ==========================================
// Boss 陣列
// ==========================================

/**
 * 所有 Boss 陣列
 */
export const bosses: BossData[] = [theTwins, theDestroyer, skeletronPrime];

// ==========================================
// 常數與對照表
// ==========================================

/**
 * Boss 類型對照
 */
export const bossTypes: Record<string, BossType> = {
  mechanical: "機械 Boss",
  hardmode: "困難模式 Boss",
  prehardmode: "困難模式前 Boss",
};

/**
 * Boss 難度標籤
 */
export const difficultyLabels: Record<DifficultyLevel, DifficultyLabel> = {
  easy: { label: "最易擊敗", color: "#22c55e", icon: "✅" },
  medium: { label: "中等難度", color: "#f59e0b", icon: "⚠️" },
  hard: { label: "高難度", color: "#ef4444", icon: "💀" },
};

// ==========================================
// 分類篩選
// ==========================================

/**
 * 依類型分類的 Boss
 */
export const bossesByType = {
  mechanical: bosses.filter((b) => b.type === "機械 Boss"),
};

/**
 * 機械三王（便捷匯出）
 */
export const mechanicalBosses = bossesByType.mechanical;

// ==========================================
// 工具函數
// ==========================================

/**
 * 依 slug 取得 Boss 資料
 * @param slug - Boss 識別碼
 * @returns Boss 資料或 undefined
 */
export const getBossBySlug = (slug: string): BossData | undefined =>
  bosses.find((b) => b.slug === slug);

/**
 * 依英文名稱取得 Boss 資料
 * @param nameEn - Boss 英文名稱
 * @returns Boss 資料或 undefined
 */
export const getBossByNameEn = (nameEn: string): BossData | undefined =>
  bosses.find((b) => b.nameEn.toLowerCase() === nameEn.toLowerCase());

/**
 * 搜尋 Boss（依名稱或描述）
 * @param query - 搜尋關鍵字
 * @returns 符合的 Boss 陣列
 */
export const searchBosses = (query: string): BossData[] => {
  const q = query.toLowerCase();
  return bosses.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.nameEn.toLowerCase().includes(q) ||
      b.type.toLowerCase().includes(q)
  );
};

/**
 * 篩選條件介面
 */
export interface BossFilters {
  /** Boss 類型 */
  type?: string;
  /** 難度 */
  difficulty?: string;
}

/**
 * 篩選 Boss
 * @param filters - 篩選條件
 * @returns 符合條件的 Boss 陣列
 */
export const filterBosses = (filters: BossFilters = {}): BossData[] => {
  return bosses.filter((b) => {
    if (filters.type && b.type !== filters.type) return false;
    if (filters.difficulty && b.difficulty !== filters.difficulty) return false;
    return true;
  });
};

/**
 * 取得 Boss 的所有掉落物
 * @param slug - Boss 識別碼
 * @returns 掉落物陣列
 */
export const getBossDrops = (slug: string) => {
  const boss = getBossBySlug(slug);
  return boss ? boss.drops : [];
};

/**
 * 取得 Boss 的推薦武器（依職業）
 * @param slug - Boss 識別碼
 * @param classType - 職業類型 (ranger, melee, mage, summoner)
 * @returns 武器陣列
 */
export const getBossWeaponsByClass = (
  slug: string,
  classType: "ranger" | "melee" | "mage" | "summoner"
) => {
  const boss = getBossBySlug(slug);
  if (!boss || !boss.equipment?.classWeapons) return [];
  return boss.equipment.classWeapons[classType] || [];
};

// ==========================================
// 具名匯出
// ==========================================
export { theTwins, theDestroyer, skeletronPrime };

// 匯出類型
export * from "./types";

// 預設匯出所有 Boss 陣列
export default bosses;
