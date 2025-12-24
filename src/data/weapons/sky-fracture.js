/**
 * 天裂 (Sky Fracture)
 *
 * 魔法武器 - 困難模式 Tier 1 推薦武器
 * 來源：製作
 */
export default {
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
  source: {
    type: "crafting",
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

  // 推薦理由
  whyGood:
    "優秀的手感與穩定的 DPS 輸出！天裂是困難模式初期最可靠的魔法武器之一。三連發的攻擊方式讓它在面對任何目標時都能保持穩定的傷害輸出，無論是單體 Boss 還是群體敵人都能應對自如。製作材料相對容易取得，是法師玩家的必備武器。",

  // 使用技巧
  tips: [
    {
      title: "暴擊堆疊",
      content:
        "天裂的每一把劍都有獨立的暴擊判定，配合法師暴擊裝備可以頻繁觸發暴擊，大幅提升 DPS。",
    },
    {
      title: "取得魔法導彈",
      content:
        "魔法導彈可以在地牢的黃金寶箱中找到，或者使用黃金鑰匙開啟。建議在進入困難模式前先取得。",
    },
    {
      title: "刷取光明碎片",
      content:
        "光明碎片由地表神聖沙漠的光明木乃伊掉落，掉落率為 10%。建議在神聖沙漠建立簡單的刷怪場。",
    },
    {
      title: "多用途武器",
      content:
        "天裂在各種情況下都表現穩定，即使後期也可以作為清理雜魚的備用武器使用。",
    },
  ],
};
