import type { WeaponData } from './types'
import { SourceType } from './source'

/**
 * 飛鏢步槍 / 飛鏢手槍 (Dart Rifle / Dart Pistol)
 *
 * 遠程武器 - 困難模式 Tier 1 特殊彈藥武器
 * 來源：腐化/血腥寶箱怪掉落
 */
const dartRifle: WeaponData = {
  // 識別碼
  slug: "dart-rifle",

  // 基本資訊
  name: "飛鏢步槍 / 飛鏢手槍",
  nameEn: "Dart Rifle / Dart Pistol",
  class: "Ranger",
  classLabel: "遠程",

  // 稀有度
  rarity: {
    level: 4,
    color: "#f59e0b",
    label: "稀有度 4",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/6/69/Dart_Rifle.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Dart_Rifle",

  // 數值屬性
  stats: {
    damage: {
      value: "28 (步槍) / 28 (手槍)",
      label: "基礎傷害",
    },
    knockback: {
      value: "3 (步槍) / 2.25 (手槍)",
      label: "擊退",
      description: "弱",
    },
    critChance: {
      value: "8% (步槍) / 14% (手槍)",
      label: "暴擊率",
    },
    useTime: {
      value: "26 (步槍) / 14 (手槍)",
      label: "使用時間",
      description: "步槍：快速 / 手槍：極快",
    },
  },

  // 描述
  description:
    "使用種子或飛鏢作為彈藥的特殊遠程武器。飛鏢步槍射速較慢但更穩定，飛鏢手槍射速極快但消耗彈藥更快。這類武器的真正威力來自於特殊飛鏢彈藥的獨特效果。",

  // 取得方式
  sources: [
    {
      type: SourceType.Drop,
      dropFrom: "腐化/血腥寶箱怪 (Corrupt/Crimson Mimic)",
      dropFromIcon: "https://terraria.wiki.gg/images/2/23/Corrupt_Mimic.png",
      dropChance: "20% (1/5)",
      notes: "在地下放置 15 個腐化/血腥鑰匙於空箱子中可手動召喚寶箱怪。",
    },
  ],

  // 推薦理由
  whyGood:
    "飛鏢武器的秘密武器在於彈藥！使用「水晶飛鏢 (Crystal Dart)」時，飛鏢會在牆壁和物體間彈跳並具有弱追蹤效果，形成覆蓋式攻擊網。使用「詛咒飛鏢 (Cursed Dart)」時，命中後會產生詛咒火焰雨，造成大範圍持續傷害。這使得飛鏢武器在清理小怪和控場方面極為出色，特別適合對付哥布林軍隊、海盜入侵等事件，或在地牢、叢林神廟等狹窄空間作戰。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "虛幻",
      nameEn: "Unreal",
      description: "最佳重鑄前綴，提供最大化的傷害與暴擊加成",
    },
    bestAmmo: {
      name: "水晶飛鏢",
      nameEn: "Crystal Darts",
      icon: "https://terraria.wiki.gg/images/d/d2/Crystal_Dart.png",
      description: "在牆壁間彈跳並具有弱追蹤效果，形成覆蓋式攻擊網",
    },
    recommendedAccessories: ["遊俠徽章", "狙擊鏡", "魔法箭袋"],
    bestAgainst: [
      {
        name: "哥布林軍隊 / 海盜入侵",
        nameEn: "Goblin Army / Pirate Invasion",
        reason: "彈跳飛鏢在成群敵人中造成大範圍傷害",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "使用飛鏢作為彈藥的特殊遠程武器。飛鏢步槍射速較慢但穩定，飛鏢手槍射速極快。水晶飛鏢會在牆壁間彈跳，形成覆蓋式攻擊網。",
    strategy:
      "在有牆壁和障礙物的環境中使用，讓水晶飛鏢的彈跳效果最大化。適合作為清理小怪的副武器，在狹窄走廊或多層平台的競技場中效果極佳。對付單體 Boss 時建議切換到其他主力武器。",
  },

  // 武器機制
  mechanics: {
    input: {
      autoReuse: true,
      useTurn: true,
    },
    resource: {
      ammo: {
        type: 'Dart',
      },
    },
    projectile: {
      velocity: 16,
      bounces: 3,
      homing: 'weak',
      piercing: 1,
    },
    combat: {
      specialEffects: ['水晶飛鏢會在牆壁間彈跳形成覆蓋網', '詛咒飛鏢產生詛咒火焰雨'],
    },
  },
}

export default dartRifle

