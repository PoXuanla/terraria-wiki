/**
 * 刃杖 (Blade Staff)
 *
 * 召喚武器 - 困難模式 Tier 1 頂級召喚物
 * 來源：史萊姆皇后掉落
 */
export default {
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
  source: {
    type: "drop",
    from: "史萊姆皇后 (Queen Slime)",
    icon: "https://terraria.wiki.gg/images/9/91/Queen_Slime.png",
    dropRate: "25% (1/4)",
    note: "史萊姆皇后需要在神聖之地使用「明膠水晶」召喚。",
  },

  // 推薦理由
  whyGood:
    "刃杖是困難模式前期最強的召喚武器！它的獨特機制「無視敵人防禦」使其在對抗高防禦 Boss 時表現驚人。更重要的是，刃杖的極快攻擊速度能不斷觸發鞭子的「標記傷害 (Tag Damage)」，當搭配冷鞭 (Cool Whip) 或刺花鞭 (Durendal) 使用時，總傷害輸出甚至能超越某些主武器。召喚師職業的核心武器，強烈建議優先擊殺史萊姆皇后取得。",

  // 使用技巧
  tips: [
    {
      title: "鞭子聯動",
      content:
        "刃杖必須搭配鞭子使用！鞭子會在敵人身上施加「標記」，刃杖每次攻擊都會觸發標記的額外傷害。推薦使用「冷鞭」或「刺花鞭」。",
    },
    {
      title: "攻擊模式",
      content:
        "先用鞭子標記敵人，然後讓刃杖自動攻擊。每 2-3 秒再次使用鞭子重新施加標記，保持標記不會消失。",
    },
    {
      title: "防禦無視機制",
      content:
        "刃杖的真實傷害會隨著敵人防禦提升而增加。對付像毀滅者體節 (0 防禦) 時普通，但對付機械骷髏王手臂 (40 防禦) 時極強。",
    },
    {
      title: "史萊姆皇后挑戰",
      content:
        "史萊姆皇后在神聖之地擊殺約 150 隻史萊姆後，會自然生成「明膠水晶」。也可以用水晶碎片、獨角獸角和靈魂製作。",
    },
    {
      title: "召喚數量",
      content:
        "每把刃杖佔用 1 個召喚欄位。在前期建議召喚 2-3 把刃杖，配合鞭子能夠提供穩定的高輸出。",
    },
  ],
};



