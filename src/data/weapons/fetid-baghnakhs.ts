import type { WeaponData } from './types'

/**
 * 腐臭虎爪 (Fetid Baghnakhs)
 *
 * 近戰武器 - 困難模式 Tier 1 極端 DPS 武器
 * 來源：血腥寶箱怪掉落
 */
const fetidBaghnakhs: WeaponData = {
  // 識別碼
  slug: "fetid-baghnakhs",

  // 基本資訊
  name: "腐臭虎爪",
  nameEn: "Fetid Baghnakhs",
  class: "Melee",
  classLabel: "近戰",

  // 稀有度
  rarity: {
    level: 5,
    color: "#f472b6",
    label: "稀有度 5",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/3/3f/Fetid_Baghnakhs.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Fetid_Baghnakhs",

  // 數值屬性
  stats: {
    damage: {
      value: 70,
      label: "傷害",
    },
    knockback: {
      value: 1.5,
      label: "擊退",
      description: "極弱",
    },
    critChance: {
      value: 4,
      label: "暴擊率",
    },
    useTime: {
      value: 7,
      label: "使用時間",
      description: "瘋狂 (Insane)",
      note: "遊戲中攻擊速度最快的近戰武器之一",
    },
  },

  // 描述
  description:
    "一對帶有劇毒的虎爪武器，攻擊範圍極短但攻擊速度瘋狂。每次攻擊都會對敵人施加「靈液」減益，降低其 15 點防禦。這是一把「Face-Tanking」專用武器，需要玩家貼身肉搏才能發揮最大效果。",

  // 取得方式
  source: {
    type: "drop",
    from: "血腥寶箱怪 (Crimson Mimic)",
    icon: "https://terraria.wiki.gg/images/e/e9/Crimson_Mimic.png",
    dropRate: "20% (1/5)",
    note: "僅限血腥世界。在地下放置 15 個血腥鑰匙於空箱子中可手動召喚。",
  },

  // 推薦理由
  whyGood:
    "腐臭虎爪是「硬碰硬」戰術的王者！它的 DPS 輸出在困難模式前期幾乎無人能敵，瘋狂的攻擊速度能讓你在 3-5 秒內打出數十次攻擊。當搭配高防禦護甲（如鈦金/精金全套）、再生藥水、營火 Buff 時，你可以直接站在 Boss 身體裡面進行「互毆」，並在 Boss 殺死你之前先將其擊殺。這種極端打法需要一定的裝備支撐和操作技巧，但一旦成功，擊殺速度極快。特別適合對付移動速度慢、血量高的 Boss。",

  // 額外攻略資訊
  meta: {
    bestModifier: {
      name: "傳奇",
      nameEn: "Legendary",
      description: "近戰武器最佳重鑄前綴，全面提升所有屬性",
    },
    bestAccessory: {
      name: "肉山護盾 / 蠕蟲圍巾",
      nameEn: "Flesh Knuckles / Worm Scarf",
      icon: "https://terraria.wiki.gg/images/1/1b/Flesh_Knuckles.png",
      description: "提供減傷效果，讓你能在 Boss 面前硬扛傷害",
    },
    recommendedAccessories: ["十字項鏈", "黑曜石盾", "火徽章"],
    bestAgainst: [
      {
        name: "毀滅者",
        nameEn: "The Destroyer",
        reason: "站在體節旁邊瘋狂輸出，極快攻速造成恐怖 DPS",
      },
    ],
  },

  // 詳細描述
  detailedDescription: {
    attackPattern:
      "帶有劇毒的虎爪武器，攻擊範圍極短但攻擊速度瘋狂（使用時間僅 7）。每次攻擊施加靈液減益，降低敵人 15 點防禦。",
    strategy:
      "Face-Tanking 專用武器！搭配高防禦護甲、減傷飾品和再生 Buff，直接貼身站在 Boss 體內持續揮動。開戰前先用黃金雨降低 Boss 防禦，然後快速接近並開始互毆。這是高風險高回報的打法，需要充分準備和熟悉 Boss 攻擊模式。",
  },
}

export default fetidBaghnakhs

