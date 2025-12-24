import type { WeaponData } from './types'

/**
 * 血紅法杖 (Sanguine Staff)
 *
 * 召喚武器 - 困難模式 Tier 1 推薦武器
 * 來源：恐懼鸚鵡螺掉落
 */
const sanguineStaff: WeaponData = {
  // 識別碼
  slug: "sanguine-staff",

  // 基本資訊
  name: "血紅法杖",
  nameEn: "Sanguine Staff",
  class: "Summoner",
  classLabel: "召喚",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/e/e7/Sanguine_Staff.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Sanguine_Staff",

  // 數值屬性
  stats: {
    damage: {
      value: 35,
      label: "傷害",
    },
    knockback: {
      value: 3,
      label: "擊退",
      description: "非常弱",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 36,
      label: "使用時間",
      description: "非常慢",
    },
  },

  // 描述
  description:
    "召喚血紅蝙蝠為你作戰。這些蝙蝠擁有完美的追蹤 AI，會緊緊跟隨敵人不放，即使目標快速移動也能精準命中。每隻蝙蝠佔用一個召喚欄位。",

  // 取得方式
  source: {
    type: "drop",
    dropFrom: "恐懼鸚鵡螺 (Dreadnautilus)",
    dropChance: "50% (1/2)",
    notes:
      "恐懼鸚鵡螺是血月期間釣魚時可能出現的迷你 Boss。牠非常強大，建議做好充分準備再挑戰。在困難模式下，牠會掉落血紅法杖、血腥淚滴等強力物品。",
  },

  // 推薦理由
  whyGood:
    "蝙蝠永不脫靶！血紅法杖召喚的蝙蝠擁有遊戲中最好的追蹤 AI，會緊緊黏住快速移動的目標。雖然恐懼鸚鵡螺 (Dreadnautilus) 很難對付，但這把武器絕對值得你花時間刷取。它是機械 Boss 前最強的召喚武器，沒有之一。完美追蹤的特性讓召喚師可以專心閃避，不用擔心召喚物打空。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "無情",
      nameEn: "Ruthless",
      description: "召喚武器最佳重鑄前綴，提供最大傷害加成",
    },
    bestWhip: {
      name: "冷鞭",
      nameEn: "Cool Whip",
      icon: "https://terraria.wiki.gg/images/4/44/Cool_Whip.png",
      description: "施加雪花標記，蝙蝠每次攻擊觸發額外傷害",
    },
    recommendedAccessories: ["召喚師徽章", "蜜蜂背包", "侏儒項鍊"],
    bestAgainst: [
      {
        name: "雙子魔眼",
        nameEn: "The Twins",
        reason: "完美追蹤 AI 能緊緊跟隨高速移動的眼睛",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "召喚血紅蝙蝠為你作戰。蝙蝠擁有完美的追蹤 AI，會緊緊跟隨敵人不放，即使目標快速移動也能精準命中。",
    strategy:
      "利用蝙蝠完美的追蹤特性專心閃避，讓召喚物自動輸出。搭配冷鞭標記目標提供額外傷害加成。盡可能提升召喚上限，多隻蝙蝠可以對單一目標造成恐怖的持續傷害，特別適合對付雙子魔眼這類高機動性 Boss。",
  },
}

export default sanguineStaff

