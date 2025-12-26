import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { debounce } from "lodash-es";
import { weapons as weaponData, classColors } from "@/data/weapons";
import type {
  WeaponListItem,
  SortKey,
  SortOrder,
} from "@/views/weapons/weapons-index/types";
import {
  DEFAULT_COLOR,
  RARITY_COLORS,
} from "@/views/weapons/weapons-index/types";

/**
 * 武器圖鑑狀態管理
 * 用於管理武器列表的篩選、排序和搜尋狀態
 */
export const useWeaponStore = defineStore("weapon", () => {
  // ==========================================
  // State - 篩選條件
  // ==========================================

  /** 搜尋關鍵字 */
  const searchQuery = ref<string>("");

  /** 選中的職業 */
  const selectedClass = ref<string>("");

  /** 選中的稀有度 */
  const selectedRarity = ref<number | "">("");

  /** 選中的取得方式 */
  const selectedSource = ref<string>("");

  /** 排序欄位 */
  const sortBy = ref<SortKey>("damage");

  /** 排序順序 */
  const sortOrder = ref<SortOrder>("desc");

  // ==========================================
  // Getters - 計算資料
  // ==========================================

  /**
   * 所有武器列表（帶處理後的資料）
   */
  const weapons = computed<WeaponListItem[]>(() => {
    return weaponData.map((w) => ({
      ...w,
      id: w.slug,
      // 提取數值用於排序（處理 "28 (步槍) / 28 (手槍)" 這類格式）
      damageNum:
        typeof w.stats.damage.value === "number"
          ? w.stats.damage.value
          : parseInt(String(w.stats.damage.value).match(/\d+/)?.[0] || "0"),
    }));
  });

  /**
   * 是否有任何篩選條件
   */
  const hasFilters = computed<boolean>(() => {
    return Boolean(
      searchQuery.value ||
        selectedClass.value ||
        selectedRarity.value ||
        selectedSource.value
    );
  });

  /**
   * 篩選後的武器列表
   */
  const filteredWeapons = computed<WeaponListItem[]>(() => {
    let result = [...weapons.value];

    // 搜尋過濾
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          w.nameEn.toLowerCase().includes(query)
      );
    }

    // 職業過濾
    if (selectedClass.value) {
      result = result.filter((w) => w.class === selectedClass.value);
    }

    // 稀有度過濾
    if (selectedRarity.value) {
      result = result.filter((w) => w.rarity.level === selectedRarity.value);
    }

    // 取得方式過濾
    if (selectedSource.value) {
      result = result.filter((w) =>
        w.sources.some((s) => s.type === selectedSource.value)
      );
    }

    // 排序
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy.value) {
        case "damage":
          comparison = a.damageNum - b.damageNum;
          break;
        case "rarity":
          comparison = a.rarity.level - b.rarity.level;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name, "zh-TW");
          break;
      }

      return sortOrder.value === "desc" ? -comparison : comparison;
    });

    return result;
  });

  /**
   * 武器數量
   */
  const weaponCount = computed<number>(() => filteredWeapons.value.length);

  /**
   * 稀有度選項（從資料中提取唯一值）
   */
  const rarityLevels = computed<number[]>(() => {
    return [...new Set(weapons.value.map((w) => w.rarity.level))].sort(
      (a, b) => a - b
    );
  });

  // ==========================================
  // Actions - 修改狀態的方法
  // ==========================================

  /**
   * 設定搜尋關鍵字（使用 debounce）
   */
  const setSearchQuery = debounce((query: string) => {
    searchQuery.value = query;
  }, 300);

  /**
   * 設定搜尋關鍵字（立即）
   */
  const setSearchQueryImmediate = (query: string) => {
    searchQuery.value = query;
  };

  /**
   * 設定職業
   */
  const setClass = (className: string) => {
    selectedClass.value = className;
  };

  /**
   * 設定稀有度
   */
  const setRarity = (level: number | "") => {
    selectedRarity.value = level;
  };

  /**
   * 設定取得方式
   */
  const setSource = (source: string) => {
    selectedSource.value = source;
  };

  /**
   * 設定排序欄位
   */
  const setSortBy = (key: SortKey) => {
    sortBy.value = key;
  };

  /**
   * 切換排序順序
   */
  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
  };

  /**
   * 清除所有篩選條件
   */
  const clearFilters = () => {
    searchQuery.value = "";
    selectedClass.value = "";
    selectedRarity.value = "";
    selectedSource.value = "";
  };

  // ==========================================
  // 工具方法
  // ==========================================

  /**
   * 取得職業顏色
   */
  const getClassColor = (className: string): string => {
    return classColors[className]?.hex || DEFAULT_COLOR;
  };

  /**
   * 取得稀有度顏色
   */
  const getRarityColor = (level: number | ""): string => {
    if (level === "") return DEFAULT_COLOR;
    return RARITY_COLORS[level] || DEFAULT_COLOR;
  };

  // ==========================================
  // 返回 Store
  // ==========================================

  return {
    // State
    searchQuery,
    selectedClass,
    selectedRarity,
    selectedSource,
    sortBy,
    sortOrder,

    // Getters
    weapons,
    hasFilters,
    filteredWeapons,
    weaponCount,
    rarityLevels,

    // Actions
    setSearchQuery,
    setSearchQueryImmediate,
    setClass,
    setRarity,
    setSource,
    setSortBy,
    toggleSortOrder,
    clearFilters,

    // Utils
    getClassColor,
    getRarityColor,
  };
});
