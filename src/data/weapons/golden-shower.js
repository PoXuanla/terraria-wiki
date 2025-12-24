/**
 * 黃金雨 (Golden Shower)
 *
 * 魔法武器 - 困難模式 Tier 1 輔助武器
 * 來源：製作（血腥世界限定）
 */
export default {
  // 識別碼
  slug: "golden-shower",

  // 基本資訊
  name: "黃金雨",
  nameEn: "Golden Shower",
  class: "Mage",
  classLabel: "魔法",

  // 稀有度
  rarity: {
    level: 4,
    color: "#f59e0b",
    label: "稀有度 4",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/0/08/Golden_Shower.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Golden_Shower",

  // 數值屬性
  stats: {
    damage: {
      value: 21,
      label: "傷害",
    },
    knockback: {
      value: 0,
      label: "擊退",
      description: "無",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 12,
      label: "使用時間",
      description: "非常快",
    },
    mana: {
      value: 7,
      label: "魔力消耗",
    },
  },

  // 描述
  description:
    "噴射一道金色靈液流，能夠穿透多個敵人。攻擊命中的敵人會被施加「靈液」減益效果，降低其 15 點防禦力，持續 10 秒。這個減益對所有傷害類型都生效。",

  // 取得方式
  source: {
    type: "crafting",
    station: "書架",
    recipe: [
      {
        name: "魔法書",
        nameEn: "Spell Tome",
        icon: "https://terraria.wiki.gg/images/5/5f/Spell_Tome.png",
        count: 1,
      },
      {
        name: "靈液",
        nameEn: "Ichor",
        icon: "https://terraria.wiki.gg/images/e/e5/Ichor.png",
        count: 20,
      },
      {
        name: "暗影之魂",
        nameEn: "Soul of Night",
        icon: "https://terraria.wiki.gg/images/7/77/Soul_of_Night.png",
        count: 15,
      },
    ],
    note: "僅限血腥世界。腐化世界對應武器為「詛咒焰」。",
  },

  // 推薦理由
  whyGood:
    "黃金雨是所有職業的必備輔助武器！它施加的「靈液」減益能降低敵人 15 點防禦力，對於 Boss 戰來說這相當於直接提升 10-15% 的團隊 DPS。即使你不是法師職業，也應該準備一把黃金雨，在開戰時先對 Boss 噴射以降低其防禦，然後切換回主武器輸出。這是困難模式前期最重要的 DPS 提升工具。",

  // 使用技巧
  tips: [
    {
      title: "輔助武器定位",
      content:
        "黃金雨的主要價值不在於傷害，而在於「靈液」減益。開戰時先用黃金雨攻擊 Boss 2-3 秒，確保減益效果施加後，再切換到主武器。",
    },
    {
      title: "全職業適用",
      content:
        "即使是遠程、近戰或召喚師職業，也應該在快捷欄保留一個位置給黃金雨，它能顯著提升整體輸出效率。",
    },
    {
      title: "穿透特性",
      content:
        "黃金雨可以穿透敵人，對付毀滅者這類多體節 Boss 時，能夠快速在多個體節上施加減益。",
    },
    {
      title: "世界限定",
      content:
        "黃金雨需要靈液，只能在血腥世界取得。如果你的世界是腐化，可以考慮創建血腥世界或與其他玩家交易。",
    },
  ],
};



