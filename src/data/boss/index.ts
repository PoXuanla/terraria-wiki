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

// 匯入 Boss Slug 枚舉
import { BossSlug } from "./boss-slug.enum";

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
// Boss 系列切換器配置
// ==========================================

/**
 * Boss 切換器配置項
 */
export interface BossSwitcherConfig {
  slug: string;
  name: string;
  nameEn: string;
  icon: string;
  route: string;
  glowColor: string;
}

/**
 * Boss 系列配置
 */
export interface BossSeriesConfig {
  /** 系列 ID */
  id: string;
  /** 系列名稱 */
  label: string;
  /** 系列中的 Boss 列表 */
  bosses: BossSwitcherConfig[];
}

/**
 * 所有 Boss 系列配置
 */
export const bossSeriesConfigs: Record<string, BossSeriesConfig> = {
  mechanical: {
    id: "mechanical",
    label: "機械三王",
    bosses: [
      {
        slug: BossSlug.THE_TWINS,
        name: "機械魔眼",
        nameEn: "The Twins",
        icon: "https://terraria.wiki.gg/images/5/55/Retinazer.png",
        route: `/boss/${BossSlug.THE_TWINS}`,
        glowColor: "rgba(220, 38, 38, 0.5)", // 红色
      },
      {
        slug: BossSlug.THE_DESTROYER,
        name: "毀滅者",
        nameEn: "The Destroyer",
        icon: "https://terraria.wiki.gg/images/a/a7/The_Destroyer.png",
        route: `/boss/${BossSlug.THE_DESTROYER}`,
        glowColor: "rgba(244, 114, 182, 0.5)", // 粉色
      },
      {
        slug: BossSlug.SKELETRON_PRIME,
        name: "機械骷髏王",
        nameEn: "Skeletron Prime",
        icon: "https://terraria.wiki.gg/images/2/2a/Skeletron_Prime.png",
        route: `/boss/${BossSlug.SKELETRON_PRIME}`,
        glowColor: "rgba(168, 85, 247, 0.5)", // 紫色
      },
    ],
  },
  // 未來可以添加其他系列，例如：
  // prehardmode: {
  //   id: "prehardmode",
  //   label: "困難模式前 Boss",
  //   bosses: [...],
  // },
  // pillars: {
  //   id: "pillars",
  //   label: "天界柱",
  //   bosses: [...],
  // },
};

/**
 * 依 Boss slug 取得其所屬系列配置
 * @param slug - Boss 識別碼
 * @returns Boss 系列配置或 undefined
 */
export const getBossSeriesConfig = (
  slug: string
): BossSeriesConfig | undefined => {
  return Object.values(bossSeriesConfigs).find((series) =>
    series.bosses.some((boss) => boss.slug === slug)
  );
};

/**
 * 取得指定系列的切換器配置
 * @param seriesId - 系列 ID
 * @returns Boss 系列配置或 undefined
 */
export const getBossSeriesById = (
  seriesId: string
): BossSeriesConfig | undefined => {
  return bossSeriesConfigs[seriesId];
};

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
