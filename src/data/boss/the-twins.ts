/**
 * 機械魔眼 (The Twins)
 *
 * 機械 Boss - 困難模式
 * 來源：機械魔眼召喚物
 */
import type { TheTwinsData } from "./types";
import { BossSlug } from "./boss-slug.enum";

export const theTwins: TheTwinsData = {
  // 識別碼
  slug: BossSlug.THE_TWINS,

  // 基本資訊
  name: "機械魔眼",
  nameEn: "The Twins",
  type: "機械 Boss",
  difficulty: "困難模式",
  description:
    "困難模式三大機械 Boss 之一。由雷射眼 (Retinazer) 與魔焰眼 (Spazmatism) 組成的雙子 Boss，需要同時應對兩種截然不同的攻擊模式。",

  // 圖片
  icons: {
    retinazer: "https://terraria.wiki.gg/images/5/55/Retinazer.png",
    spazmatism: "https://terraria.wiki.gg/images/1/1b/Spazmatism.png",
  },
  wikiUrl: "https://terraria.wiki.gg/wiki/The_Twins",

  // 召喚方式
  summoning: {
    item: "機械魔眼",
    itemEn: "Mechanical Eye",
    itemIcon: "https://terraria.wiki.gg/images/0/01/Mechanical_Eye.png",
    timeRestriction: "晚上 7:30 PM 後",
    craftStation: "秘銀砧/山銅砧",
    craftStationIcon: "https://terraria.wiki.gg/images/3/38/Mythril_Anvil.png",
    recipe: [
      {
        name: "晶狀體",
        nameEn: "Lens",
        amount: 3,
        icon: "https://terraria.wiki.gg/images/6/68/Lens.png",
      },
      {
        name: "鐵錠/鉛錠",
        nameEn: "Iron/Lead Bar",
        amount: 5,
        icon: "https://terraria.wiki.gg/images/f/fc/Iron_Bar.png",
        alternativeIcon: "https://terraria.wiki.gg/images/5/5c/Lead_Bar.png",
        tooltip: "鐵錠或鉛錠，取決於世界生成時的礦石",
      },
      {
        name: "光明之魂",
        nameEn: "Soul of Light",
        amount: 6,
        icon: "https://terraria.wiki.gg/images/3/39/Soul_of_Light.png",
      },
    ],
  },

  // 雙眼屬性比較
  twins: {
    retinazer: {
      name: "雷射眼",
      nameEn: "Retinazer",
      color: "#ef4444",
      icon: "https://terraria.wiki.gg/images/5/55/Retinazer.png",
      stats: {
        maxLife: 24000,
        defense: 10,
        damage: 50,
      },
      phase1: {
        attack: "發射雷射光束",
        behavior: "遠距離攻擊，保持距離追蹤玩家",
      },
      phase2: {
        trigger: "血量低於 50%",
        attack: "快速連續雷射",
        behavior: "攻擊頻率大幅提升，但傷害模式較為單純",
        specialMove: "發射快速連續雷射光束",
      },
    },
    spazmatism: {
      name: "魔焰眼",
      nameEn: "Spazmatism",
      color: "#22c55e",
      icon: "https://terraria.wiki.gg/images/1/1b/Spazmatism.png",
      stats: {
        maxLife: 24000,
        defense: 10,
        damage: 50,
      },
      phase1: {
        attack: "噴射詛咒焰彈",
        behavior: "遠距離發射可穿透的詛咒焰彈",
      },
      phase2: {
        trigger: "血量低於 50%",
        attack: "噴射火焰 + 瘋狂衝撞",
        behavior: "變身後攻擊模式劇變，極度危險",
        specialMove: "持續噴射詛咒火焰並進行高速衝撞",
        warning: "第二階段的衝撞與噴火傷害極高，是戰鬥的最大威脅！",
      },
    },
  },

  // 戰鬥資訊
  combat: {
    arena: {
      title: "場地準備",
      tips: [
        "搭建多層長平台（至少 3-4 層，每層間隔約 15-20 格）",
        "平台長度建議 100 格以上，提供足夠的橫向移動空間",
        "沿途放置營火與心型燈籠，增加生命回復",
        "在平台旁放置蜂蜜池（快速浸泡獲得回復 Buff）",
        "準備護士 NPC 附近傳送點（緊急補血用）",
      ],
    },
    phases: [
      {
        phase: "第一階段",
        description:
          "兩隻眼睛同時存在，交替攻擊。雷射眼發射雷射，魔焰眼噴射詛咒焰彈。此階段相對容易，保持移動即可閃避多數攻擊。",
        danger: "medium",
      },
      {
        phase: "第二階段",
        description:
          "當任一眼血量低於 50% 時，該眼會進行變身。雷射眼變形後持續發射快速雷射。魔焰眼變形後會進行高頻率衝撞並噴射詛咒火焰，傷害極高且難以預測！",
        danger: "high",
      },
    ],
    behavior: [
      {
        title: "第一階段",
        description:
          "兩隻眼睛同時存在，交替攻擊。雷射眼發射雷射，魔焰眼噴射詛咒焰彈。此階段相對容易，保持移動即可閃避多數攻擊。",
        icon: "👁️",
      },
      {
        title: "第二階段",
        description:
          "當任一眼血量低於 50% 時，該眼會進行變身。雷射眼變形後持續發射快速雷射。魔焰眼變形後會進行高頻率衝撞並噴射詛咒火焰，傷害極高且難以預測！",
        icon: "💀",
      },
    ],
    coreStrategy: {
      title: "核心戰術",
      priority: "優先集火擊殺魔焰眼（綠眼）！",
      reason:
        "魔焰眼第二階段的瘋狂衝撞與持續噴火是本戰最危險的部分。優先擊殺可大幅降低戰鬥難度。",
      steps: [
        "開戰後立即對魔焰眼（綠眼）集中輸出",
        "保持在平台上水平移動，利用高度差閃避攻擊",
        "魔焰眼進入第二階段時，預判衝撞方向並反向移動",
        "擊殺魔焰眼後，雷射眼相對容易處理",
        "注意觀察眼睛的瞳孔方向，預判攻擊來源",
      ],
    },
  },

  // 推薦裝備 - 職業分類
  equipment: {
    classTabs: [
      {
        id: "ranger",
        name: "遠程",
        nameEn: "Ranger",
        icon: "🏹",
        color: "#22c55e",
      },
      {
        id: "melee",
        name: "近戰",
        nameEn: "Melee",
        icon: "⚔️",
        color: "#ef4444",
      },
      {
        id: "mage",
        name: "魔法",
        nameEn: "Mage",
        icon: "🔮",
        color: "#3b82f6",
      },
      {
        id: "summoner",
        name: "召喚",
        nameEn: "Summoner",
        icon: "👻",
        color: "#a855f7",
      },
    ],
    classWeapons: {
      ranger: [
        {
          name: "大鯊魚",
          nameEn: "Megashark",
          icon: "https://terraria.wiki.gg/images/4/4f/Megashark.png",
          ammo: "水晶子彈 / 詛咒子彈",
          description: "高射速、穩定輸出，配合穿透彈藥效果極佳",
          route: "/weapons",
          hasPage: false,
        },
        {
          name: "代達羅斯風暴弓",
          nameEn: "Daedalus Stormbow",
          icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
          ammo: "聖箭",
          description: "從天降落的箭矢能持續命中，搭配聖箭效果驚人",
          route: "/weapons/daedalus",
          hasPage: true,
        },
        {
          name: "瑪瑙爆破槍",
          nameEn: "Onyx Blaster",
          icon: "https://terraria.wiki.gg/images/c/c0/Onyx_Blaster.png",
          ammo: "任意子彈",
          description: "百鯊替代品！高爆發傷害，黑色能量彈可穿透",
          route: "/weapons/onyx-blaster",
          hasPage: true,
        },
      ],
      melee: [
        {
          name: "暗影焰飛刀",
          nameEn: "Shadowflame Knife",
          icon: "https://terraria.wiki.gg/images/6/67/Shadowflame_Knife.png",
          ammo: "無",
          description: "可在敵人間彈跳，附帶暗影焰減益，完美的風箏武器",
          route: "/weapons/shadowflame-knife",
          hasPage: true,
        },
        {
          name: "冰鎌刀",
          nameEn: "Ice Sickle",
          icon: "https://terraria.wiki.gg/images/4/46/Ice_Sickle.png",
          ammo: "無",
          description: "發射穿透冰鎌，可在空中持續輸出",
          route: "/weapons",
          hasPage: false,
        },
        {
          name: "真空刃",
          nameEn: "Bladetongue",
          icon: "https://terraria.wiki.gg/images/4/44/Bladetongue.png",
          ammo: "無",
          description: "發射穿透劍氣，血腥釣魚可取得",
          route: "/weapons",
          hasPage: false,
        },
      ],
      mage: [
        {
          name: "流星法杖",
          nameEn: "Meteor Staff",
          icon: "https://terraria.wiki.gg/images/c/cd/Meteor_Staff.png",
          ammo: "9 魔力",
          description: "法師版代達羅斯！從天降落流星，對大型目標極有效",
          route: "/weapons/meteor-staff",
          hasPage: true,
        },
        {
          name: "天裂",
          nameEn: "Sky Fracture",
          icon: "https://terraria.wiki.gg/images/5/50/Sky_Fracture.png",
          ammo: "9 魔力",
          description: "發射三把光劍，高暴擊率，手感極佳",
          route: "/weapons/sky-fracture",
          hasPage: true,
        },
        {
          name: "黃金雨",
          nameEn: "Golden Shower",
          icon: "https://terraria.wiki.gg/images/0/08/Golden_Shower.png",
          ammo: "7 魔力",
          description: "降低敵人防禦 20 點！必備輔助武器",
          route: "/weapons",
          hasPage: false,
        },
      ],
      summoner: [
        {
          name: "血紅法杖",
          nameEn: "Sanguine Staff",
          icon: "https://terraria.wiki.gg/images/e/e7/Sanguine_Staff.png",
          ammo: "無",
          description: "召喚完美追蹤的血紅蝙蝠，機械 Boss 前最強召喚物",
          route: "/weapons/sanguine-staff",
          hasPage: true,
        },
        {
          name: "蜘蛛法杖",
          nameEn: "Spider Staff",
          icon: "https://terraria.wiki.gg/images/a/ab/Spider_Staff.png",
          ammo: "無",
          description: "蜘蛛會黏附在敵人身上持續輸出",
          route: "/weapons",
          hasPage: false,
        },
        {
          name: "冷鞭",
          nameEn: "Cool Whip",
          icon: "https://terraria.wiki.gg/images/d/de/Cool_Whip.png",
          ammo: "無",
          description: "鞭子攻擊並召喚小雪人幫助戰鬥",
          route: "/weapons",
          hasPage: false,
        },
      ],
    },
    weapons: [
      {
        name: "大鯊魚",
        nameEn: "Megashark",
        icon: "https://terraria.wiki.gg/images/4/4f/Megashark.png",
        ammo: "水晶子彈 / 詛咒子彈",
        description: "高射速、穩定輸出，配合穿透彈藥效果極佳",
        route: "/weapons",
        hasPage: false,
      },
      {
        name: "代達羅斯風暴弓",
        nameEn: "Daedalus Stormbow",
        icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
        ammo: "聖箭",
        description: "從天降落的箭矢能持續命中，搭配聖箭效果驚人",
        route: "/weapons/daedalus",
        hasPage: true,
      },
      {
        name: "黃金雨/水晶蛇",
        nameEn: "Golden Shower / Crystal Serpent",
        icon: "https://terraria.wiki.gg/images/0/08/Golden_Shower.png",
        ammo: "魔力",
        description: "魔法武器替代方案，黃金雨可降低敵人防禦",
        route: "/weapons",
        hasPage: false,
      },
    ],
    accessories: [
      {
        name: "克蘇魯之盾",
        nameEn: "Shield of Cthulhu",
        icon: "https://terraria.wiki.gg/images/3/3e/Shield_of_Cthulhu.png",
        description: "衝刺閃避，應對衝撞的最佳選擇",
      },
      {
        name: "翅膀（任意）",
        nameEn: "Wings",
        icon: "https://terraria.wiki.gg/images/e/e9/Angel_Wings.png",
        description: "垂直機動力來源，必備飾品",
      },
      {
        name: "十字項鏈",
        nameEn: "Cross Necklace",
        icon: "https://terraria.wiki.gg/images/8/87/Cross_Necklace.png",
        description: "延長無敵時間，大幅降低連續受傷風險",
      },
      {
        name: "遊俠徽章",
        nameEn: "Ranger Emblem",
        icon: "https://terraria.wiki.gg/images/8/87/Ranger_Emblem.png",
        description: "遠程職業增傷，提升 DPS",
      },
    ],
    armor: {
      name: "鈦金/精金護甲",
      nameEn: "Titanium/Adamantite Armor",
      icon: "https://terraria.wiki.gg/images/c/c4/Titanium_armor.png",
      description: "困難模式礦物套裝，提供充足的防禦與傷害加成",
    },
    buffs: [
      "弓箭手藥水 / 彈藥儲備藥水",
      "鐵皮藥水 / 再生藥水",
      "敏捷藥水 / 重力藥水（可選）",
      "營火 + 心型燈籠 Buff",
    ],
  },

  // 掉落物
  drops: [
    {
      name: "神聖錠",
      nameEn: "Hallowed Bar",
      icon: "https://terraria.wiki.gg/images/e/ec/Hallowed_Bar.png",
      amount: "15-30",
      chance: "100%",
      description: "製作神聖裝備的核心材料",
    },
    {
      name: "視域之魂",
      nameEn: "Soul of Sight",
      icon: "https://terraria.wiki.gg/images/a/a0/Soul_of_Sight.png",
      amount: "20-40",
      chance: "100%",
      description: "製作光明神系列武器與飾品",
    },
    {
      name: "機械魔眼紀念章",
      nameEn: "Twins Trophy",
      icon: "https://terraria.wiki.gg/images/b/be/Twins_Trophy.png",
      amount: "1",
      chance: "10%",
      description: "裝飾物品，可掛在牆上",
    },
    {
      name: "雙子面具",
      nameEn: "Twins Mask",
      icon: "https://terraria.wiki.gg/images/f/f4/Retinazer_Mask.png",
      amount: "1",
      chance: "14.29%",
      description: "時裝頭部配件",
    },
  ],
};

export default theTwins;
