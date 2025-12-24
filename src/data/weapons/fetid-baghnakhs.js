/**
 * 腐臭虎爪 (Fetid Baghnakhs)
 *
 * 近戰武器 - 困難模式 Tier 1 極端 DPS 武器
 * 來源：血腥寶箱怪掉落
 */
export default {
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

  // 使用技巧
  tips: [
    {
      title: "Face-Tanking 裝備需求",
      content:
        "必備：鈦金/精金全套護甲（近戰頭盔）、十字項鏈（延長無敵時間）、肉山護盾（減傷 17%）、蠕蟲圍巾（減傷 17%）。推薦：克蘇魯之盾（衝刺閃避致命攻擊）、黑曜石盾（擊退免疫 + 近戰提升）。",
    },
    {
      title: "Buff 準備",
      content:
        "鐵皮藥水（+8 防禦）、再生藥水（加快回血）、敏捷藥水（移動速度）、營火 + 心型燈籠（持續回血）、蜂蜜池（快速浸泡獲得回血 Buff）。",
    },
    {
      title: "戰術要點",
      content:
        "開戰前先用黃金雨降低 Boss 防禦（靈液效果可疊加）。使用衝刺或翅膀快速接近 Boss，貼身站在 Boss 身體內部持續揮動。注意觀察血量，在血量低於 1/3 時準備使用治療藥水或傳送回護士 NPC。",
    },
    {
      title: "適用 Boss",
      content:
        "毀滅者：站在體節旁邊瘋狂輸出，記得清理探測器。機械骷髏王：等手臂被摧毀後再使用虎爪對付頭部。雙子魔眼：較不推薦，眼睛移動速度快難以貼身。",
    },
    {
      title: "風險提示",
      content:
        "這是一種高風險高回報的打法。新手不建議使用，容易因為操作失誤而暴毙。建議先用遠程武器熟悉 Boss 攻擊模式後再嘗試。",
    },
    {
      title: "世界限定",
      content:
        "腐臭虎爪僅限血腥世界。如果你的世界是腐化，需要創建血腥世界或與其他玩家交易。",
    },
  ],
};



