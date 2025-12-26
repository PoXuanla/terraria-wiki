import type { WeaponData } from './types'
import { SourceType } from './source'

/**
 * 天裂 (Sky Fracture)
 *
 * 魔法武器 - 困難模式 Tier 1 推薦武器
 * 來源：製作
 */
const skyFracture: WeaponData = {
  // 識別碼
  slug: "sky-fracture",

  // 基本資訊
  name: "天裂",
  nameEn: "Sky Fracture",
  class: "Mage",
  classLabel: "魔法",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/5/50/Sky_Fracture.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Sky_Fracture",

  // 數值屬性
  stats: {
    damage: {
      value: 38,
      label: "傷害",
    },
    knockback: {
      value: 6,
      label: "擊退",
      description: "普通",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 22,
      label: "使用時間",
      description: "快",
    },
  },

  // 描述
  description:
    "每次攻擊會快速連續發射三把光劍，光劍會自動追蹤游標方向。擁有較高的基礎暴擊率，搭配法師裝備可以達到驚人的暴擊頻率。每次使用消耗 9 點魔力。",

  // 取得方式
  sources: [
    {
      type: SourceType.Crafting,
      station: "秘銀砧 / 山銅砧",
      recipe: [
        {
          name: "魔法導彈",
          nameEn: "Magic Missile",
          icon: "https://terraria.wiki.gg/images/7/76/Magic_Missile.png",
          count: 1,
        },
        {
          name: "光明碎片",
          nameEn: "Light Shard",
          icon: "https://terraria.wiki.gg/images/6/62/Light_Shard.png",
          count: 2,
        },
        {
          name: "光明之魂",
          nameEn: "Soul of Light",
          icon: "https://terraria.wiki.gg/images/6/63/Soul_of_Light.png",
          count: 16,
        },
      ],
    },
  ],

  // 推薦理由
  whyGood:
    "優秀的手感與穩定的 DPS 輸出！天裂是困難模式初期最可靠的魔法武器之一。三連發的攻擊方式讓它在面對任何目標時都能保持穩定的傷害輸出，無論是單體 Boss 還是群體敵人都能應對自如。製作材料相對容易取得，是法師玩家的必備武器。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "神話",
      nameEn: "Mythical",
      description: "魔法武器最佳重鑄前綴，全面提升屬性",
    },
    bestAccessory: {
      name: "法師徽章",
      nameEn: "Sorcerer Emblem",
      icon: "https://terraria.wiki.gg/images/8/89/Sorcerer_Emblem.png",
      description: "提升 15% 魔法傷害，必備的魔法傷害提升飾品",
    },
    recommendedAccessories: ["天界徽章", "魔力花", "魔法手銬"],
    bestAgainst: [
      {
        name: "通用型武器",
        nameEn: "All-Purpose Weapon",
        reason: "三連發穩定輸出，適合各種 Boss 和敵人",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "每次攻擊快速連續發射三把追蹤光劍，光劍會自動追蹤游標方向。每把劍都有獨立的暴擊判定，配合法師暴擊裝備可以頻繁觸發暴擊。",
    strategy:
      "天裂是多用途武器，在各種情況下都表現穩定。三連發的攻擊方式讓它面對任何目標都能保持穩定輸出。配合法師暴擊裝備可以大幅提升 DPS，即使後期也可以作為清理雜魚的備用武器使用。",
  },

  // 武器機制
  mechanics: {
    input: {
      autoReuse: true,
      useTurn: true,
    },
    resource: {
      manaCost: 9,
    },
    projectile: {
      velocity: 12,
      piercing: 0,
      homing: true,
      tileIgnore: false,
    },
    combat: {
      specialEffects: ['每次攻擊連發三把光劍', '每把劍有獨立暴擊判定'],
    },
  },
}

export default skyFracture

