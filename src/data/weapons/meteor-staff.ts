import type { WeaponData } from './types'

/**
 * 流星法杖 (Meteor Staff)
 *
 * 魔法武器 - 困難模式 Tier 1 推薦武器
 * 來源：製作
 */
const meteorStaff: WeaponData = {
  // 識別碼
  slug: "meteor-staff",

  // 基本資訊
  name: "流星法杖",
  nameEn: "Meteor Staff",
  class: "Mage",
  classLabel: "魔法",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/c/cd/Meteor_Staff.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Meteor_Staff",

  // 數值屬性
  stats: {
    damage: {
      value: 50,
      label: "傷害",
    },
    knockback: {
      value: 4.5,
      label: "擊退",
      description: "普通",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 10,
      label: "使用時間",
      description: "非常快",
    },
  },

  // 描述
  description:
    "從天空召喚流星攻擊滑鼠游標位置。流星會從畫面上方隨機位置落下，造成範圍傷害並產生小型爆炸效果。每次使用消耗 9 點魔力。",

  // 取得方式
  sources: [
    {
      type: "crafting",
      station: "秘銀砧 / 山銅砧",
      recipe: [
        {
          name: "隕石錠",
          nameEn: "Meteorite Bar",
          icon: "https://terraria.wiki.gg/images/b/b4/Meteorite_Bar.png",
          count: 20,
        },
        {
          name: "妖精塵",
          nameEn: "Pixie Dust",
          icon: "https://terraria.wiki.gg/images/5/56/Pixie_Dust.png",
          count: 10,
        },
        {
          name: "光明之魂",
          nameEn: "Soul of Light",
          icon: "https://terraria.wiki.gg/images/6/63/Soul_of_Light.png",
          count: 10,
        },
      ],
    },
  ],

  // 推薦理由
  whyGood:
    "法師版的代達羅斯風暴弓！流星法杖對大型目標如毀滅者 (The Destroyer) 或雙子魔眼 (The Twins) 擁有極高的爆發傷害。流星的範圍傷害可以同時命中毀滅者的多個體節，快速疊加傷害。製作材料簡單易取得，只需要一些隕石和神聖之地的素材即可。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "神話",
      nameEn: "Mythical",
      description: "魔法武器最佳重鑄前綴，全面提升屬性",
    },
    bestAccessory: {
      name: "魔力花",
      nameEn: "Mana Flower",
      icon: "https://terraria.wiki.gg/images/1/1b/Mana_Flower.png",
      description: "自動使用魔力藥水，讓你持續召喚流星不間斷",
    },
    recommendedAccessories: ["法師徽章", "天界徽章", "魔法手銬"],
    bestAgainst: [
      {
        name: "毀滅者",
        nameEn: "The Destroyer",
        reason: "範圍傷害同時命中多個體節，造成恐怖 DPS",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "從天空召喚流星攻擊游標位置。流星從畫面上方隨機位置落下，造成範圍傷害並產生小型爆炸效果。",
    strategy:
      "將游標放在敵人上方一小段距離，讓流星在落下途中就能命中。在開闊場地（天空競技場）效果最好，地下洞穴會被障礙物阻擋。對付毀滅者時持續在身體中段召喚流星，範圍傷害可以同時打中多個體節，造成毀滅性傷害。",
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
      velocity: 20,
      piercing: 1,
      tileIgnore: true,
      homing: false,
    },
    combat: {
      specialEffects: ['範圍爆炸傷害', '流星從天空隨機位置落下'],
    },
  },
}

export default meteorStaff

