/**
 * Boss 資料庫 - 統一匯出與工具函數
 *
 * 提供：
 * - 所有 Boss 的統一匯出
 * - 依類型分類
 * - 搜尋與篩選工具函數
 */

// 匯入所有 Boss 資料
import theTwins from "./the-twins";
import theDestroyer from "./the-destroyer";
import skeletronPrime from "./skeletron-prime";

// ==========================================
// Boss 陣列
// ==========================================

/**
 * 所有 Boss 陣列
 */
export const bosses = [theTwins, theDestroyer, skeletronPrime];

// ==========================================
// 常數與對照表
// ==========================================

/**
 * Boss 類型對照
 */
export const bossTypes = {
  mechanical: "機械 Boss",
  hardmode: "困難模式 Boss",
  prehardmode: "困難模式前 Boss",
};

/**
 * Boss 難度標籤
 */
export const difficultyLabels = {
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
 * @param {string} slug - Boss 識別碼
 * @returns {Object|undefined} Boss 資料或 undefined
 */
export const getBossBySlug = (slug) => bosses.find((b) => b.slug === slug);

/**
 * 依英文名稱取得 Boss 資料
 * @param {string} nameEn - Boss 英文名稱
 * @returns {Object|undefined} Boss 資料或 undefined
 */
export const getBossByNameEn = (nameEn) =>
  bosses.find((b) => b.nameEn.toLowerCase() === nameEn.toLowerCase());

/**
 * 搜尋 Boss（依名稱或描述）
 * @param {string} query - 搜尋關鍵字
 * @returns {Array<Object>} 符合的 Boss 陣列
 */
export const searchBosses = (query) => {
  const q = query.toLowerCase();
  return bosses.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.nameEn.toLowerCase().includes(q) ||
      b.type.toLowerCase().includes(q)
  );
};

/**
 * 篩選 Boss
 * @param {Object} filters - 篩選條件
 * @param {string} [filters.type] - Boss 類型
 * @param {string} [filters.difficulty] - 難度
 * @returns {Array<Object>} 符合條件的 Boss 陣列
 */
export const filterBosses = (filters = {}) => {
  return bosses.filter((b) => {
    if (filters.type && b.type !== filters.type) return false;
    if (filters.difficulty && b.difficulty !== filters.difficulty) return false;
    return true;
  });
};

/**
 * 取得 Boss 的所有掉落物
 * @param {string} slug - Boss 識別碼
 * @returns {Array<Object>} 掉落物陣列
 */
export const getBossDrops = (slug) => {
  const boss = getBossBySlug(slug);
  return boss ? boss.drops : [];
};

/**
 * 取得 Boss 的推薦武器（依職業）
 * @param {string} slug - Boss 識別碼
 * @param {string} classType - 職業類型 (ranger, melee, mage, summoner)
 * @returns {Array<Object>} 武器陣列
 */
export const getBossWeaponsByClass = (slug, classType) => {
  const boss = getBossBySlug(slug);
  if (!boss || !boss.equipment?.classWeapons) return [];
  return boss.equipment.classWeapons[classType] || [];
};

// ==========================================
// 具名匯出
// ==========================================
export { theTwins, theDestroyer, skeletronPrime };

// 預設匯出所有 Boss 陣列
export default bosses;

