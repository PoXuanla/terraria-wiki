/**
 * 機械骷髏王 (Skeletron Prime)
 *
 * 機械 Boss - 困難模式
 * 來源：機械骷髏召喚物
 */
import type { SkeletronPrimeData } from "./types";

export const skeletronPrime: SkeletronPrimeData = {
  // 識別碼
  slug: "skeletron-prime",

  // 基本資訊
  name: "機械骷髏王",
  nameEn: "Skeletron Prime",
  type: "機械 Boss",
  difficulty: "困難模式",
  description:
    "骷髏王的機械版本。擁有四隻手臂（雷射砲、火砲、電鋸、鉗子）和一顆會旋轉的頭顱。通常被認為是機械三王中最難對付的一個。頭部旋轉攻擊的傷害極高，被擊中可能直接死亡！",

  // 圖片
  icon: "https://terraria.wiki.gg/images/2/2a/Skeletron_Prime.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Skeletron_Prime",

  // 召喚方式
  summoning: {
    item: "機械骷髏",
    itemEn: "Mechanical Skull",
    itemIcon: "https://terraria.wiki.gg/images/4/4e/Mechanical_Skull.png",
    timeRestriction: "晚上 7:30 PM 後",
    craftStation: "秘銀砧/山銅砧",
    craftStationIcon: "https://terraria.wiki.gg/images/3/38/Mythril_Anvil.png",
    recipe: [
      {
        name: "骨頭",
        nameEn: "Bone",
        amount: 30,
        icon: "https://terraria.wiki.gg/images/d/d0/Bone.png",
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
        amount: 3,
        icon: "https://terraria.wiki.gg/images/3/39/Soul_of_Light.png",
      },
      {
        name: "暗影之魂",
        nameEn: "Soul of Night",
        amount: 3,
        icon: "https://terraria.wiki.gg/images/7/77/Soul_of_Night.png",
      },
    ],
  },

  // 各部位屬性
  parts: [
    {
      name: "頭部",
      nameEn: "Head",
      icon: "https://terraria.wiki.gg/images/2/2a/Skeletron_Prime.png",
      hp: 28000,
      defense: 24,
      damage: 47,
      notes: "旋轉時傷害達 75+，接觸即死風險！",
      color: "#f472b6",
      danger: "high",
    },
    {
      name: "雷射砲",
      nameEn: "Prime Laser",
      icon: "https://terraria.wiki.gg/images/b/bd/Prime_Laser.png",
      hp: 6000,
      defense: 20,
      damage: 29,
      notes: "快速發射雷射，優先擊殺！",
      color: "#ef4444",
      danger: "high",
    },
    {
      name: "火砲",
      nameEn: "Prime Cannon",
      icon: "https://terraria.wiki.gg/images/5/55/Prime_Cannon.png",
      hp: 7000,
      defense: 25,
      damage: 30,
      notes: "發射榴彈，需要優先處理",
      color: "#f97316",
      danger: "high",
    },
    {
      name: "電鋸",
      nameEn: "Prime Saw",
      icon: "https://terraria.wiki.gg/images/d/de/Prime_Saw.png",
      hp: 9000,
      defense: 40,
      damage: 52,
      notes: "近戰攻擊，防禦高但威脅較低",
      color: "#22c55e",
      danger: "medium",
    },
    {
      name: "鉗子",
      nameEn: "Prime Vice",
      icon: "https://terraria.wiki.gg/images/c/c6/Prime_Vice.png",
      hp: 9000,
      defense: 35,
      damage: 45,
      notes: "近戰攻擊，抓取玩家",
      color: "#3b82f6",
      danger: "medium",
    },
  ],

  // 戰鬥資訊
  combat: {
    arena: {
      title: "場地準備",
      tips: [
        "搭建多層水平平台（3-4 層，間隔 15-20 格）",
        "平台長度建議 150 格以上，需要大量橫向移動空間",
        "保持平台之間有足夠的垂直跳躍距離",
        "放置營火與心型燈籠增加回復",
        "準備蜂蜜池作為緊急回復點",
      ],
    },
    behavior: [
      {
        title: "手臂攻擊",
        description:
          "四隻手臂會不規則地揮動攻擊。雷射砲和火砲從遠處發射彈幕，電鋸和鉗子嘗試近距離抓取。",
        icon: "🦾",
      },
      {
        title: "頭部旋轉",
        description:
          "當血量降低或特定時機，頭部會開始高速旋轉並追擊玩家。旋轉時防禦下降但傷害暴增，碰到幾乎即死！",
        icon: "💀",
      },
      {
        title: "彈幕地獄",
        description:
          "雷射砲和火砲同時發射會造成密集的彈幕。若不優先處理這兩隻手臂，閃避會變得非常困難。",
        icon: "💥",
      },
    ],
    coreStrategy: {
      title: "核心戰術",
      priority: "優先擊殺雷射砲與火砲！",
      reason:
        "雷射砲 (Prime Laser) 和火砲 (Prime Cannon) 是主要的遠程威脅來源。消滅它們後，剩下的電鋸和鉗子只能近戰，戰鬥會變得非常輕鬆。",
      steps: [
        "開戰後立即鎖定雷射砲 (紅色) 集中火力",
        "雷射砲消滅後，轉而攻擊火砲 (橙色)",
        "利用平台高度差閃避頭部衝撞",
        "避開頭部旋轉攻擊，此時它的傷害極高",
        "最後處理電鋸和鉗子，或直接攻擊頭部",
        "保持移動！停下來就是死！",
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
          description: "若已擊敗毀滅者，這是最佳選擇！高射速穩定輸出",
          route: "/weapons",
          hasPage: false,
          highlight: true,
        },
        {
          name: "瑪瑙爆破槍",
          nameEn: "Onyx Blaster",
          icon: "https://terraria.wiki.gg/images/c/c0/Onyx_Blaster.png",
          ammo: "任意子彈",
          description: "大鯊魚的替代品，高爆發傷害",
          route: "/weapons/onyx-blaster",
          hasPage: true,
        },
        {
          name: "代達羅斯風暴弓",
          nameEn: "Daedalus Stormbow",
          icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
          ammo: "聖箭",
          description: "對單體效果較差，但仍可使用",
          route: "/weapons/daedalus-stormbow",
          hasPage: true,
        },
      ],
      melee: [
        {
          name: "暗影焰飛刀",
          nameEn: "Shadowflame Knife",
          icon: "https://terraria.wiki.gg/images/6/67/Shadowflame_Knife.png",
          ammo: "無",
          description: "無消耗的風箏武器，保持距離持續輸出",
          route: "/weapons/shadowflame-knife",
          hasPage: true,
        },
        {
          name: "冰鎌刀",
          nameEn: "Ice Sickle",
          icon: "https://terraria.wiki.gg/images/4/46/Ice_Sickle.png",
          ammo: "無",
          description: "發射穿透冰鎌波，傷害穩定",
          route: "/weapons",
          hasPage: false,
        },
      ],
      mage: [
        {
          name: "天裂",
          nameEn: "Sky Fracture",
          icon: "https://terraria.wiki.gg/images/5/50/Sky_Fracture.png",
          ammo: "9 魔力",
          description: "三連發光劍，高暴擊率，對單體有效",
          route: "/weapons/sky-fracture",
          hasPage: true,
          highlight: true,
        },
        {
          name: "流星法杖",
          nameEn: "Meteor Staff",
          icon: "https://terraria.wiki.gg/images/c/cd/Meteor_Staff.png",
          ammo: "9 魔力",
          description: "對多隻手臂同時在場時效果不錯",
          route: "/weapons/meteor-staff",
          hasPage: true,
        },
        {
          name: "黃金雨",
          nameEn: "Golden Shower",
          icon: "https://terraria.wiki.gg/images/0/08/Golden_Shower.png",
          ammo: "7 魔力",
          description: "降低防禦 20 點，必備輔助武器",
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
          description: "完美追蹤的蝙蝠，機械 Boss 前最強召喚物",
          route: "/weapons/sanguine-staff",
          hasPage: true,
          highlight: true,
        },
        {
          name: "蜘蛛法杖",
          nameEn: "Spider Staff",
          icon: "https://terraria.wiki.gg/images/a/ab/Spider_Staff.png",
          ammo: "無",
          description: "蜘蛛會跳到手臂上持續輸出",
          route: "/weapons",
          hasPage: false,
        },
        {
          name: "刺花鞭",
          nameEn: "Durendal",
          icon: "https://terraria.wiki.gg/images/9/9d/Durendal.png",
          ammo: "無",
          description: "標記目標並提供攻擊速度加成",
          route: "/weapons",
          hasPage: false,
        },
      ],
    },
    accessories: [
      {
        name: "克蘇魯之盾",
        nameEn: "Shield of Cthulhu",
        icon: "https://terraria.wiki.gg/images/3/3e/Shield_of_Cthulhu.png",
        description: "衝刺閃避頭部旋轉攻擊的救命飾品",
      },
      {
        name: "翅膀（任意）",
        nameEn: "Wings",
        icon: "https://terraria.wiki.gg/images/e/e9/Angel_Wings.png",
        description: "垂直機動力必備，閃避手臂攻擊",
      },
      {
        name: "十字項鏈",
        nameEn: "Cross Necklace",
        icon: "https://terraria.wiki.gg/images/8/87/Cross_Necklace.png",
        description: "延長無敵時間，減少連續傷害",
      },
      {
        name: "職業徽章",
        nameEn: "Class Emblem",
        icon: "https://terraria.wiki.gg/images/8/87/Ranger_Emblem.png",
        description: "對應職業增傷，提升 DPS",
      },
    ],
    armor: {
      name: "鈦金/精金護甲",
      nameEn: "Titanium/Adamantite Armor",
      icon: "https://terraria.wiki.gg/images/c/c4/Titanium_armor.png",
      description: "鈦金套裝的「暗影閃避」效果極佳，可免疫一次傷害",
    },
    buffs: [
      "鐵皮藥水 / 再生藥水",
      "敏捷藥水",
      "弓箭手藥水 / 法力再生藥水",
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
      name: "恐懼之魂",
      nameEn: "Soul of Fright",
      icon: "https://terraria.wiki.gg/images/4/42/Soul_of_Fright.png",
      amount: "20-40",
      chance: "100%",
      description: "製作火焰噴射器等強力武器！",
      highlight: true,
    },
    {
      name: "機械骷髏王紀念章",
      nameEn: "Skeletron Prime Trophy",
      icon: "https://terraria.wiki.gg/images/2/2e/Skeletron_Prime_Trophy.png",
      amount: "1",
      chance: "10%",
      description: "裝飾物品，可掛在牆上",
    },
    {
      name: "機械骷髏王面具",
      nameEn: "Skeletron Prime Mask",
      icon: "https://terraria.wiki.gg/images/4/4c/Skeletron_Prime_Mask.png",
      amount: "1",
      chance: "14.29%",
      description: "時裝頭部配件",
    },
  ],
};

export default skeletronPrime;
