/**
 * 暗影焰飛刀 (Shadowflame Knife)
 *
 * 近戰武器 - 困難模式 Tier 1 推薦武器
 * 來源：哥布林召喚師掉落
 */
export default {
  // 識別碼
  slug: "shadowflame-knife",

  // 基本資訊
  name: "暗影焰飛刀",
  nameEn: "Shadowflame Knife",
  class: "Melee",
  classLabel: "近戰",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/6/67/Shadowflame_Knife.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Shadowflame_Knife",

  // 數值屬性
  stats: {
    damage: {
      value: 38,
      label: "傷害",
    },
    knockback: {
      value: 3.75,
      label: "擊退",
      description: "弱",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 14,
      label: "使用時間",
      description: "非常快",
    },
  },

  // 描述
  description:
    "一把會在敵人之間彈跳的投擲飛刀，每次命中都會對敵人施加「暗影焰」減益效果，持續造成傷害。飛刀最多可彈跳 3 次，非常適合對付成群的敵人。",

  // 取得方式
  source: {
    type: "drop",
    dropFrom: "哥布林召喚師 (Goblin Summoner)",
    dropChance: "33.33% (1/3)",
    notes:
      "哥布林召喚師只會在困難模式的哥布林軍團事件中出現。你需要先擊敗血肉牆進入困難模式，然後等待或使用戰旗召喚哥布林軍團。",
  },

  // 推薦理由
  whyGood:
    "不消耗魔力、不消耗彈藥！暗影焰飛刀是近戰職業玩家的完美「風箏」武器。你可以一邊跑動一邊持續輸出，完美應對雙子魔眼 (The Twins) 的高機動性戰鬥。暗影焰減益還能讓敵人持續掉血，即使你在閃避時也能造成傷害。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "神聖",
      nameEn: "Godly",
      description: "近戰武器最佳重鑄前綴之一，提供優秀的傷害和暴擊加成",
    },
    bestAccessory: {
      name: "火徽章",
      nameEn: "Fire Gauntlet",
      icon: "https://terraria.wiki.gg/images/2/2a/Fire_Gauntlet.png",
      description: "提升近戰傷害和攻速，並施加額外的燃燒效果",
    },
    recommendedAccessories: ["惡魔之翼", "閃電靴", "黑曜石盾"],
    bestAgainst: [
      {
        name: "雙子魔眼",
        nameEn: "The Twins",
        reason: "風箏戰術完美應對高機動性，持續輸出不間斷",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "投擲會在敵人之間彈跳的飛刀，每次命中施加暗影焰減益（每秒 15 點傷害，持續 3 秒）。飛刀最多彈跳 3 次，適合對付成群敵人。",
    strategy:
      "保持移動並持續投擲飛刀，利用彈跳效果讓傷害最大化。暗影焰的 DoT 效果不受防禦影響，讓你在閃避時也能持續造成傷害。非常適合在長平台上與高機動性 Boss 戰鬥，是風箏戰術的完美武器。",
  },
};
