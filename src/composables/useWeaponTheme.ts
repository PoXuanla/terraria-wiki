/**
 * useWeaponTheme - 武器主題相關的可復用邏輯
 * 
 * 提供武器稀有度、職業等主題相關的工具函數
 */

/**
 * 稀有度等級對應的 Tailwind 漸層背景類名
 */
const RARITY_GRADIENTS: Record<number, string> = {
  4: "from-red-600 to-orange-500",
  5: "from-pink-500 to-rose-400",
  6: "from-purple-500 to-violet-400",
  7: "from-lime-500 to-green-400",
  8: "from-yellow-500 to-amber-400",
};

/**
 * 職業圖示對應
 */
const CLASS_ICONS: Record<string, string> = {
  Ranger: "🏹",
  Melee: "⚔️",
  Mage: "🔮",
  Summoner: "👻",
};

/**
 * 稀有度顏色對應 (HEX)
 */
const RARITY_COLORS: Record<number, string> = {
  4: "#f59e0b",
  5: "#f472b6",
  6: "#a855f7",
  7: "#22c55e",
  8: "#fbbf24",
};

export function useWeaponTheme() {
  /**
   * 取得稀有度漸層背景類名
   * @param level - 稀有度等級
   * @returns Tailwind 漸層類名
   */
  const getRarityGradient = (level: number): string => {
    return RARITY_GRADIENTS[level] || RARITY_GRADIENTS[5];
  };

  /**
   * 取得稀有度顏色
   * @param level - 稀有度等級
   * @returns HEX 顏色代碼
   */
  const getRarityColor = (level: number): string => {
    return RARITY_COLORS[level] || RARITY_COLORS[5];
  };

  /**
   * 取得職業圖示
   * @param className - 職業名稱
   * @returns Emoji 圖示
   */
  const getClassIcon = (className: string): string => {
    return CLASS_ICONS[className] || "⚔️";
  };

  /**
   * 取得職業顯示名稱（中文）
   * @param className - 職業英文名稱
   * @returns 中文名稱
   */
  const getClassLabel = (className: string): string => {
    const labels: Record<string, string> = {
      Ranger: "遠程",
      Melee: "近戰",
      Mage: "魔法",
      Summoner: "召喚",
    };
    return labels[className] || className;
  };

  return {
    getRarityGradient,
    getRarityColor,
    getClassIcon,
    getClassLabel,
  };
}

