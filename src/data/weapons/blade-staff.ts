import type { WeaponData } from './types'

/**
 * 刃杖 (Blade Staff)
 *
 * 召喚武器 - 困難模式 Tier 1 頂級召喚物
 * 來源：史萊姆皇后掉落
 */
const bladeStaff: WeaponData = {
  // 識別碼
  slug: "blade-staff",

  // 基本資訊
  name: "刃杖",
  nameEn: "Blade Staff",
  class: "Summoner",
  classLabel: "召喚",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/d/d8/Blade_Staff.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Blade_Staff",

  // 數值屬性
  stats: {
    damage: {
      value: 6,
      label: "基礎傷害",
      note: "表面數值低，但實戰強度極高",
    },
    knockback: {
      value: 3,
      label: "擊退",
      description: "極弱",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 24,
      label: "使用時間",
      description: "快",
    },
    summonSlots: {
      value: 1,
      label: "召喚欄位",
    },
  },

  // 描述
  description:
    "召喚一把附魔匕首懸浮在玩家上方，以極快的速度攻擊附近敵人。匕首的攻擊速度隨著敵人防禦力的提升而加快，且無視大量敵人防禦。",

  // 取得方式
  sources: [
    {
      type: "drop",
      dropFrom: "史萊姆皇后 (Queen Slime)",
      dropFromIcon: "https://terraria.wiki.gg/images/9/91/Queen_Slime.png",
      dropChance: "25% (1/4)",
      notes: "史萊姆皇后需要在神聖之地使用「明膠水晶」召喚。",
    },
  ],

  // 推薦理由
  whyGood:
    "刃杖是困難模式前期最強的召喚武器！它的獨特機制「無視敵人防禦」使其在對抗高防禦 Boss 時表現驚人。更重要的是，刃杖的極快攻擊速度能不斷觸發鞭子的「標記傷害 (Tag Damage)」，當搭配冷鞭 (Cool Whip) 或刺花鞭 (Durendal) 使用時，總傷害輸出甚至能超越某些主武器。召喚師職業的核心武器，強烈建議優先擊殺史萊姆皇后取得。",

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
      description: "施加雪花標記，刃杖每次攻擊觸發額外傷害，完美搭配",
    },
    recommendedAccessories: ["召喚師徽章", "蜜蜂背包", "侏儒項鍊"],
    bestAgainst: [
      {
        name: "機械骷髏王",
        nameEn: "Skeletron Prime",
        reason: "高防禦的手臂讓刃杖的防禦無視機制發揮極致",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "召喚附魔匕首懸浮在玩家上方，以極快速度自動攻擊附近敵人。攻擊速度隨敵人防禦力提升而加快，且無視大量防禦。",
    strategy:
      "先用鞭子標記敵人，讓刃杖自動攻擊觸發標記的額外傷害。每 2-3 秒重新使用鞭子保持標記效果。刃杖的防禦無視機制讓它對高防禦 Boss 特別有效，搭配鞭子的標記傷害能造成恐怖的 DPS。",
  },

  // 武器機制
  mechanics: {
    input: {
      autoReuse: true,
      useTurn: true,
    },
    summon: {
      slots: 1,
      aiType: 'melee',
      tracking: true,
      attackSpeed: '極快',
      requiresWhip: true,
      specialAbility: '攻擊速度隨敵人防禦力提升而加快，無視大量防禦',
    },
  },
}

export default bladeStaff

