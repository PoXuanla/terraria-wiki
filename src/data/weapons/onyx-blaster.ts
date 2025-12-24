import type { WeaponData } from './types'

/**
 * 瑪瑙爆破槍 (Onyx Blaster)
 *
 * 遠程武器 - 困難模式 Tier 1 推薦武器
 * 來源：製作
 */
const onyxBlaster: WeaponData = {
  // 識別碼
  slug: "onyx-blaster",

  // 基本資訊
  name: "瑪瑙爆破槍",
  nameEn: "Onyx Blaster",
  class: "Ranger",
  classLabel: "遠程",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/c/c0/Onyx_Blaster.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Onyx_Blaster",

  // 數值屬性
  stats: {
    damage: {
      value: 24,
      label: "傷害",
    },
    knockback: {
      value: 6.5,
      label: "擊退",
      description: "強",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 45,
      label: "使用時間",
      description: "非常慢",
    },
  },

  // 描述
  description:
    "霰彈槍的強化版本，除了發射霰彈子彈散射外，還會同時發射一顆巨大的黑色能量彈，造成額外的爆發傷害。能量彈擁有穿透能力，可擊中多個敵人。",

  // 取得方式
  source: {
    type: "crafting",
    station: "秘銀砧 / 山銅砧",
    recipe: [
      {
        name: "霰彈槍",
        nameEn: "Shotgun",
        icon: "https://terraria.wiki.gg/images/0/09/Shotgun.png",
        count: 1,
      },
      {
        name: "暗黑碎片",
        nameEn: "Dark Shard",
        icon: "https://terraria.wiki.gg/images/8/86/Dark_Shard.png",
        count: 2,
      },
      {
        name: "暗影之魂",
        nameEn: "Soul of Night",
        icon: "https://terraria.wiki.gg/images/7/77/Soul_of_Night.png",
        count: 10,
      },
    ],
  },

  // 推薦理由
  whyGood:
    "百鯊的最佳替代品！瑪瑙爆破槍擁有極高的爆發傷害，製作材料容易取得，可以在挑戰任何機械 Boss 之前就製作完成。黑色能量彈的穿透效果讓它在面對群體敵人時也非常有效。對於沒有刷到代達羅斯風暴弓的遠程職業玩家來說，這是進入困難模式後的首選武器。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "虛幻",
      nameEn: "Unreal",
      description: "最佳重鑄前綴，提供最大化的傷害與暴擊加成",
    },
    bestAmmo: {
      name: "水晶子彈",
      nameEn: "Crystal Bullets",
      icon: "https://terraria.wiki.gg/images/2/26/Crystal_Bullet.png",
      description: "擊中時分裂成碎片，造成額外傷害，非常適合近距離爆發",
    },
    recommendedAccessories: ["遊俠徽章", "狙擊鏡", "魔法箭袋"],
    bestAgainst: [
      {
        name: "雙子魔眼",
        nameEn: "The Twins",
        reason: "能量彈可同時命中兩隻眼睛，高爆發傷害效率極佳",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "每次射擊會發射散射的霰彈子彈，同時發射一顆穿透性的黑色能量彈。能量彈可穿透多個敵人，適合對付成群的敵人。",
    strategy:
      "保持中等距離確保霰彈和能量彈都能命中目標。對付機械 Boss 時，能量彈的穿透效果可以同時命中多個部位，大幅提升傷害效率。",
  },

  // 武器機制
  mechanics: {
    input: {
      autoReuse: true,
      useTurn: true,
    },
    resource: {
      ammo: {
        type: 'Bullet',
      },
    },
    projectile: {
      velocity: 7,
      piercing: 2,
      homing: false,
    },
    combat: {
      specialEffects: ['同時發射霰彈散射和穿透能量彈', '能量彈可同時命中多個部位'],
    },
  },
}

export default onyxBlaster

