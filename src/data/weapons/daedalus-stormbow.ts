import type { WeaponData } from './types'

/**
 * 代達羅斯風暴弓 (Daedalus Stormbow)
 *
 * 遠程武器 - 困難模式 Tier 1 推薦武器
 * 來源：神聖寶箱怪掉落
 */
const daedalusStormbow: WeaponData = {
  // 識別碼
  slug: "daedalus-stormbow",

  // 基本資訊
  name: "代達羅斯風暴弓",
  nameEn: "Daedalus Stormbow",
  class: "Ranger",
  classLabel: "遠程",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Daedalus_Stormbow",

  // 數值屬性
  stats: {
    damage: {
      value: 43,
      label: "傷害",
    },
    knockback: {
      value: 2.25,
      label: "擊退",
      description: "非常弱",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 19,
      label: "使用時間",
      description: "非常快",
    },
    velocity: {
      value: 1,
      label: "箭矢速度",
      description: "極慢 (從天降落)",
    },
  },

  // 描述
  description:
    "射出的箭矢會從天空降落，搭配聖箭使用時效果極佳，是對付機械Boss的神器。",

  // 取得方式
  source: {
    type: "drop",
    dropFrom: "神聖寶箱怪 (Hallowed Mimic)",
    dropFromIcon: "https://terraria.wiki.gg/images/7/7c/Hallowed_Mimic.png",
    dropChance: "25% (1/4)",
    notes: "需要在困難模式的神聖之地生成，或使用光之鑰召喚。",
  },

  // 推薦理由
  whyGood:
    "搭配聖箭使用時，每支箭矢落地時會額外召喚 2 顆落星。對付毀滅者這類長條型多段體 Boss 時，大量的落星能夠同時命中多個體節，造成毀滅性的傷害。是困難模式初期最強的遠程武器之一。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "虛幻",
      nameEn: "Unreal",
      description: "最佳重鑄前綴，提供最大化的傷害與暴擊加成",
    },
    bestAmmo: {
      name: "聖箭",
      nameEn: "Holy Arrows",
      icon: "https://terraria.wiki.gg/images/0/0e/Holy_Arrow.png",
      description: "擊中時召喚額外的落星，造成大量 AOE 傷害",
    },
    recommendedAccessories: ["遊俠徽章", "魔法箭袋", "狙擊鏡"],
    bestAgainst: [
      {
        name: "毀滅者",
        nameEn: "The Destroyer",
        reason: "多段體對落星傷害極度敏感",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "發射箭矢時，箭矢會從角色上方的天空中落下，而非直接從弓射出。這使得它能夠繞過障礙物打擊敵人。",
    strategy:
      "配合聖箭使用時，每支箭矢落地時會額外召喚 2 顆落星。對付毀滅者這類長條型多段體 Boss 時，大量的落星能夠同時命中多個體節，造成毀滅性的傷害。",
  },

  // 武器機制
  mechanics: {
    input: {
      autoReuse: true,
      useTurn: true,
    },
    resource: {
      ammo: {
        type: 'Arrow',
      },
    },
    projectile: {
      velocity: 1,
      piercing: 0,
      tileIgnore: true,
      homing: false,
    },
    combat: {
      specialEffects: ['箭矢從天空降落，可繞過障礙物', '配合聖箭召喚額外落星造成 AOE'],
    },
  },
}

export default daedalusStormbow

