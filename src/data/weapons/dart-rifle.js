/**
 * 飛鏢步槍 / 飛鏢手槍 (Dart Rifle / Dart Pistol)
 *
 * 遠程武器 - 困難模式 Tier 1 特殊彈藥武器
 * 來源：腐化/血腥寶箱怪掉落
 */
export default {
  // 識別碼
  slug: "dart-rifle",

  // 基本資訊
  name: "飛鏢步槍 / 飛鏢手槍",
  nameEn: "Dart Rifle / Dart Pistol",
  class: "Ranger",
  classLabel: "遠程",

  // 稀有度
  rarity: {
    level: 4,
    color: "#f59e0b",
    label: "稀有度 4",
  },

  // 圖示與連結
  icon: "https://terraria.wiki.gg/images/6/69/Dart_Rifle.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Dart_Rifle",

  // 數值屬性
  stats: {
    damage: {
      value: "28 (步槍) / 28 (手槍)",
      label: "基礎傷害",
    },
    knockback: {
      value: "3 (步槍) / 2.25 (手槍)",
      label: "擊退",
      description: "弱",
    },
    critChance: {
      value: "8% (步槍) / 14% (手槍)",
      label: "暴擊率",
    },
    useTime: {
      value: "26 (步槍) / 14 (手槍)",
      label: "使用時間",
      description: "步槍：快速 / 手槍：極快",
    },
  },

  // 描述
  description:
    "使用種子或飛鏢作為彈藥的特殊遠程武器。飛鏢步槍射速較慢但更穩定，飛鏢手槍射速極快但消耗彈藥更快。這類武器的真正威力來自於特殊飛鏢彈藥的獨特效果。",

  // 取得方式
  source: {
    type: "drop",
    from: "腐化/血腥寶箱怪 (Corrupt/Crimson Mimic)",
    icon: "https://terraria.wiki.gg/images/2/23/Corrupt_Mimic.png",
    dropRate: "20% (1/5)",
    note: "在地下放置 15 個腐化/血腥鑰匙於空箱子中可手動召喚寶箱怪。",
  },

  // 推薦理由
  whyGood:
    "飛鏢武器的秘密武器在於彈藥！使用「水晶飛鏢 (Crystal Dart)」時，飛鏢會在牆壁和物體間彈跳並具有弱追蹤效果，形成覆蓋式攻擊網。使用「詛咒飛鏢 (Cursed Dart)」時，命中後會產生詛咒火焰雨，造成大範圍持續傷害。這使得飛鏢武器在清理小怪和控場方面極為出色，特別適合對付哥布林軍隊、海盜入侵等事件，或在地牢、叢林神廟等狹窄空間作戰。",

  // 使用技巧
  tips: [
    {
      title: "彈藥選擇",
      content:
        "水晶飛鏢：最佳選擇！牆壁反彈 + 弱追蹤效果，適合所有場景。詛咒飛鏢：對付大型慢速敵人時造成恐怖的持續傷害。種子彈藥：僅供前期過渡使用，效果遠不如飛鏢。",
    },
    {
      title: "步槍 vs 手槍",
      content:
        "飛鏢步槍：更穩定，適合精準射擊和 Boss 戰。飛鏢手槍：射速極快，適合清理小怪和事件入侵，但消耗彈藥驚人。",
    },
    {
      title: "地形優勢",
      content:
        "在有牆壁和障礙物的環境中，水晶飛鏢的彈跳效果能讓傷害倍增。嘗試在狹窄走廊或有多層平台的競技場使用。",
    },
    {
      title: "寶箱怪召喚",
      content:
        "在地下（地表以下）放置一個空箱子，然後在裡面放入 15 個「腐化之鑰」或「血腥之鑰」（擊殺對應生態敵人會掉落鑰匙模具，用於製作），寶箱怪會立即生成。",
    },
    {
      title: "與其他武器配合",
      content:
        "飛鏢武器適合作為副武器，主要用於清理小怪。對付單體 Boss 時，大鯊魚或代達羅斯風暴弓通常更有效。",
    },
  ],
};



