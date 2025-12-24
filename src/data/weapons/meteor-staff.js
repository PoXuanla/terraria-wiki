/**
 * 流星法杖 (Meteor Staff)
 *
 * 魔法武器 - 困難模式 Tier 1 推薦武器
 * 來源：製作
 */
export default {
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
  source: {
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

  // 推薦理由
  whyGood:
    "法師版的代達羅斯風暴弓！流星法杖對大型目標如毀滅者 (The Destroyer) 或雙子魔眼 (The Twins) 擁有極高的爆發傷害。流星的範圍傷害可以同時命中毀滅者的多個體節，快速疊加傷害。製作材料簡單易取得，只需要一些隕石和神聖之地的素材即可。",

  // 使用技巧
  tips: [
    {
      title: "瞄準技巧",
      content:
        "將游標放在敵人「上方」一小段距離，讓流星在落下途中就能命中目標，增加有效攻擊時間。",
    },
    {
      title: "魔力管理",
      content: "每次使用消耗 9 點魔力，建議搭配魔力再生藥水和魔力花裝備。",
    },
    {
      title: "最佳場景",
      content:
        "在開闘場地（天空競技場）效果最好，沒有障礙物阻擋流星落下。地下洞穴中效果會大打折扣。",
    },
    {
      title: "對付毀滅者",
      content:
        "持續在毀滅者身體中段召喚流星，範圍傷害可以同時打中多個體節，傷害非常可觀。",
    },
  ],
};
