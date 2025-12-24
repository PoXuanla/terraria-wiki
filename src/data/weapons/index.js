/**
 * 武器資料庫 - 統一匯出與工具函數
 *
 * 提供：
 * - 所有武器的統一匯出
 * - 依職業/稀有度分類
 * - 搜尋與篩選功能
 */

// 匯入所有武器資料
import onyxBlaster from "./onyx-blaster";
import shadowflameKnife from "./shadowflame-knife";
import meteorStaff from "./meteor-staff";
import skyFracture from "./sky-fracture";
import sanguineStaff from "./sanguine-staff";
import daedalusStormbow from "./daedalus-stormbow";
import goldenShower from "./golden-shower";
import bladeStaff from "./blade-staff";
import dartRifle from "./dart-rifle";
import fetidBaghnakhs from "./fetid-baghnakhs";

// ==========================================
// 所有武器陣列
// ==========================================

/**
 * 所有武器資料陣列
 * @type {Array<Object>}
 */
export const weapons = [
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
];

// ==========================================
// 職業分類
// ==========================================

/**
 * 職業標籤對照表
 */
export const classLabels = {
  Ranger: "遠程",
  Melee: "近戰",
  Mage: "魔法",
  Summoner: "召喚",
};

/**
 * 職業顏色對照表 (Tailwind CSS 類別)
 */
export const classColors = {
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
};

/**
 * 依職業分類的武器
 * @type {Object<string, Array<Object>>}
 */
export const weaponsByClass = {
  Ranger: weapons.filter((w) => w.class === "Ranger"),
  Melee: weapons.filter((w) => w.class === "Melee"),
  Mage: weapons.filter((w) => w.class === "Mage"),
  Summoner: weapons.filter((w) => w.class === "Summoner"),
};

// ==========================================
// 稀有度分類
// ==========================================

/**
 * 稀有度顏色對照表
 */
export const rarityColors = {
  1: { color: "#9d9d9d", label: "灰色" },
  2: { color: "#96be00", label: "綠色" },
  3: { color: "#b200ff", label: "紫色" },
  4: { color: "#ff2864", label: "淺紅色" },
  5: { color: "#f472b6", label: "粉紅色" },
  6: { color: "#d946ef", label: "淺紫色" },
  7: { color: "#22c55e", label: "萊姆色" },
  8: { color: "#fbbf24", label: "黃色" },
};

/**
 * 依稀有度篩選武器
 * @param {number} level - 稀有度等級
 * @returns {Array<Object>} 符合稀有度的武器陣列
 */
export const getWeaponsByRarity = (level) =>
  weapons.filter((w) => w.rarity.level === level);

// ==========================================
// 查詢與搜尋功能
// ==========================================

/**
 * 依 slug 取得單一武器
 * @param {string} slug - 武器識別碼 (e.g., 'onyx-blaster')
 * @returns {Object|undefined} 武器資料或 undefined
 */
export const getWeaponBySlug = (slug) => weapons.find((w) => w.slug === slug);

/**
 * 依英文名稱取得武器
 * @param {string} nameEn - 英文名稱
 * @returns {Object|undefined} 武器資料或 undefined
 */
export const getWeaponByNameEn = (nameEn) =>
  weapons.find((w) => w.nameEn.toLowerCase() === nameEn.toLowerCase());

/**
 * 搜尋武器 (依名稱模糊搜尋)
 * @param {string} query - 搜尋關鍵字
 * @returns {Array<Object>} 符合的武器陣列
 */
export const searchWeapons = (query) => {
  const q = query.toLowerCase();
  return weapons.filter(
    (w) =>
      w.name.toLowerCase().includes(q) ||
      w.nameEn.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q)
  );
};

/**
 * 篩選武器
 * @param {Object} filters - 篩選條件
 * @param {string} [filters.class] - 職業
 * @param {number} [filters.rarity] - 稀有度
 * @param {string} [filters.sourceType] - 來源類型 ('crafting' | 'drop')
 * @returns {Array<Object>} 符合條件的武器陣列
 */
export const filterWeapons = (filters = {}) => {
  return weapons.filter((w) => {
    if (filters.class && w.class !== filters.class) return false;
    if (filters.rarity && w.rarity.level !== filters.rarity) return false;
    if (filters.sourceType && w.source.type !== filters.sourceType)
      return false;
    return true;
  });
};

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
};

// 預設匯出所有武器陣列
export default weapons;
