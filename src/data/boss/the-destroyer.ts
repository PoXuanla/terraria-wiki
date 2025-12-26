/**
 * 毀滅者 (The Destroyer)
 *
 * 機械 Boss - 困難模式
 * 來源：機械蠕蟲召喚物
 */
import type { TheDestroyerData } from "./types";
import { BossSlug } from "./boss-slug.enum";

export const theDestroyer: TheDestroyerData = {
  // 識別碼
  slug: BossSlug.THE_DESTROYER,

  // 基本資訊
  name: "毀滅者",
  nameEn: "The Destroyer",
  type: "機械 Boss",
  difficulty: "困難模式",
  description:
    "世界吞噬怪的機械版本。由多個體節組成的巨型機械蠕蟲。若準備得當，通常被認為是三個機械 Boss 中「最容易」擊敗的一個。擁有穿透武器的玩家可以輕鬆秒殺它。",

  // 圖片
  icon: "https://terraria.wiki.gg/images/a/a7/The_Destroyer.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/The_Destroyer",

  // 召喚方式
  summoning: {
    item: "機械蠕蟲",
    itemEn: "Mechanical Worm",
    itemIcon: "https://terraria.wiki.gg/images/d/d0/Mechanical_Worm.png",
    timeRestriction: "晚上 7:30 PM 後",
    craftStation: "秘銀砧/山銅砧",
    craftStationIcon: "https://terraria.wiki.gg/images/3/38/Mythril_Anvil.png",
    recipe: [
      {
        name: "腐肉/脊椎",
        nameEn: "Rotten Chunk/Vertebrae",
        amount: 6,
        icon: "https://terraria.wiki.gg/images/b/b8/Rotten_Chunk.png",
        alternativeIcon: "https://terraria.wiki.gg/images/e/eb/Vertebra.png",
        tooltip: "腐化之地使用腐肉；猩紅之地使用脊椎",
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
        name: "暗影之魂",
        nameEn: "Soul of Night",
        amount: 6,
        icon: "https://terraria.wiki.gg/images/7/77/Soul_of_Night.png",
      },
    ],
  },

  // 屬性數據
  stats: {
    main: {
      name: "毀滅者本體",
      nameEn: "The Destroyer",
      icon: "https://terraria.wiki.gg/images/a/a7/The_Destroyer.png",
      hp: 80000,
      defense: 0,
      damage: 70,
      segments: 82,
      notes: "由 82 個體節組成，每個體節可獨立受傷",
    },
    probe: {
      name: "探測器",
      nameEn: "Probe",
      icon: "https://terraria.wiki.gg/images/5/5f/Probe.png",
      hp: 200,
      defense: 20,
      damage: 50,
      notes: "體節受傷時會釋放，最多同時存在 5 隻",
    },
  },

  // 屬性警告
  statsWarning: {
    text: "<strong>💀 免疫所有減益效果：</strong>毀滅者免疫所有減益狀態（如中毒、著火等），因此減益武器對它無效。專注於純傷害輸出！",
    type: "info",
  },

  // 戰鬥資訊
  combat: {
    arena: {
      title: "場地準備",
      architecture: {
        subtitle: "建築規格",
        icon: "🏗️",
        specs: [
          {
            text: "在空中搭建高平台",
            highlight: { value: "100 格", type: "height" },
            detail: "距離地面約 100 格，讓毀滅者難以觸及",
          },
          {
            text: "建造有天花板的「庇護箱」",
            detail: "可以阻擋探測器的雷射攻擊",
          },
          {
            text: "平台長度建議",
            highlight: { value: "150 格", type: "length" },
            detail: "提供足夠的閃避空間",
          },
        ],
      },
      facilities: {
        subtitle: "必備設施",
        icon: "⚡",
        items: [
          {
            name: "營火",
            nameEn: "Campfire",
            icon: "https://terraria.wiki.gg/images/4/4c/Campfire.png",
            effect: "生命回復",
            effectIcon: "❤️",
            buff: "+0.5 生命/秒",
          },
          {
            name: "心型燈籠",
            nameEn: "Heart Lantern",
            icon: "https://terraria.wiki.gg/images/6/6f/Heart_Lantern.png",
            effect: "生命回復",
            effectIcon: "❤️",
            buff: "+0.5 生命/秒",
          },
          {
            name: "蜂蜜池",
            nameEn: "Honey",
            icon: "https://terraria.wiki.gg/images/d/d8/Honey_Block.png",
            effect: "快速回復",
            effectIcon: "✨",
            buff: "+1 生命/秒",
          },
          {
            name: "星星瓶",
            nameEn: "Star in a Bottle",
            icon: "https://terraria.wiki.gg/images/2/29/Star_in_a_Bottle.png",
            effect: "魔力回復",
            effectIcon: "💫",
            buff: "+1.5 魔力/秒",
          },
          {
            name: "向日葵",
            nameEn: "Sunflower",
            icon: "https://terraria.wiki.gg/images/9/93/Sunflower.png",
            effect: "移動速度",
            effectIcon: "🏃",
            buff: "+10% 移速",
          },
        ],
      },
    },
    behavior: [
      {
        title: "地底穿梭",
        description:
          "毀滅者會在地下穿梭，從各個方向衝向玩家。其超長的身體意味著攻擊面積極大。",
        icon: "🐛",
      },
      {
        title: "雷射攻擊",
        description:
          "身體的每個體節都會發射紅色雷射光束，當多個體節同時發射時會形成「彈幕地獄」。",
        icon: "💥",
      },
      {
        title: "探測器",
        description:
          "當體節受到傷害時會釋放小型探測器 (Probe)，探測器會飛向玩家並發射雷射。擊殺探測器可掉落心和星星。",
        icon: "🤖",
      },
    ],
    coreStrategy: {
      title: "核心戰術",
      priority: '<strong>穿透武器</strong>是王道！禁止使用單體攻擊！',
      reason:
        '<span class="enemy-primary">毀滅者</span>擁有 <strong>82 個體節</strong>，穿透攻擊可以同時命中多個體節造成驚人的傷害疊加。單體武器只能打一節，效率極低。',
      steps: [
        '在<span class="highlight">天空平台</span>上等待毀滅者，保持與地面的距離',
        '使用<span class="weapon">代達羅斯風暴弓</span> + <span class="weapon">聖箭</span>，讓落星雨傾瀉在蟲身上',
        '清理<span class="enemy-secondary">探測器</span>來獲取心和星星補給',
        '利用庇護箱躲避密集的<strong>雷射彈幕</strong>',
        '保持持續輸出，<strong>穿透傷害</strong>會讓戰鬥非常快速',
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
          name: "代達羅斯風暴弓",
          nameEn: "Daedalus Stormbow",
          icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
          ammo: "聖箭（必備！）",
          description: "毀滅者剋星！落星可同時命中多個體節，傷害爆表",
          route: "/weapons/daedalus-stormbow",
          hasPage: true,
          highlight: true,
        },
        {
          name: "瑪瑙爆破槍",
          nameEn: "Onyx Blaster",
          icon: "https://terraria.wiki.gg/images/c/c0/Onyx_Blaster.png",
          ammo: "水晶子彈",
          description: "黑色能量彈可穿透，適合近距離爆發輸出",
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
          description: "穿透並在體節間彈跳，暗影焰持續傷害疊加",
          route: "/weapons/shadowflame-knife",
          hasPage: true,
        },
        {
          name: "死神鐮刀",
          nameEn: "Death Sickle",
          icon: "https://terraria.wiki.gg/images/3/33/Death_Sickle.png",
          ammo: "無",
          description: "日蝕掉落，發射穿透鐮刀波，傷害極高",
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
          description: "流星從天而降，同時命中多個體節",
          route: "/weapons/meteor-staff",
          hasPage: true,
          highlight: true,
        },
        {
          name: "黃金雨",
          nameEn: "Golden Shower",
          icon: "https://terraria.wiki.gg/images/0/08/Golden_Shower.png",
          ammo: "7 魔力",
          description: "噴射穿透，降低防禦 20 點，必備輔助武器",
          route: "/weapons",
          hasPage: false,
        },
        {
          name: "毒刺法杖",
          nameEn: "Nimbus Rod",
          icon: "https://terraria.wiki.gg/images/a/a0/Nimbus_Rod.png",
          ammo: "7 魔力",
          description: "放置在毀滅者必經路線上持續輸出",
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
          description: "蝙蝠會持續攻擊毀滅者身體",
          route: "/weapons/sanguine-staff",
          hasPage: true,
        },
        {
          name: "蜘蛛法杖",
          nameEn: "Spider Staff",
          icon: "https://terraria.wiki.gg/images/a/ab/Spider_Staff.png",
          ammo: "無",
          description: "蜘蛛會黏附在身體上持續輸出",
          route: "/weapons",
          hasPage: false,
        },
      ],
    },
    accessories: [
      {
        name: "翅膀（任意）",
        nameEn: "Wings",
        icon: "https://terraria.wiki.gg/images/e/e9/Angel_Wings.png",
        description: "高空作戰必備，維持空中位置",
      },
      {
        name: "十字項鏈",
        nameEn: "Cross Necklace",
        icon: "https://terraria.wiki.gg/images/8/87/Cross_Necklace.png",
        description: "延長無敵時間，被體節掃到時減少傷害",
      },
      {
        name: "遊俠/戰士/魔法徽章",
        nameEn: "Class Emblem",
        icon: "https://terraria.wiki.gg/images/8/87/Ranger_Emblem.png",
        description: "對應職業增傷，提升 DPS",
      },
    ],
    armor: {
      name: "鈦金/精金護甲",
      nameEn: "Titanium/Adamantite Armor",
      icon: "https://terraria.wiki.gg/images/c/c4/Titanium_armor.png",
      description: "困難模式礦物套裝，鈦金套裝有免傷 Buff 效果更佳",
    },
    buffs: [
      "弓箭手藥水 / 彈藥儲備藥水",
      "鐵皮藥水 / 再生藥水",
      "敏捷藥水",
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
      name: "力量之魂",
      nameEn: "Soul of Might",
      icon: "https://terraria.wiki.gg/images/7/72/Soul_of_Might.png",
      amount: "20-40",
      chance: "100%",
      description: "製作大鯊魚 (Megashark)！",
      highlight: true,
    },
    {
      name: "毀滅者紀念章",
      nameEn: "Destroyer Trophy",
      icon: "https://terraria.wiki.gg/images/4/4b/Destroyer_Trophy.png",
      amount: "1",
      chance: "10%",
      description: "裝飾物品，可掛在牆上",
    },
    {
      name: "毀滅者面具",
      nameEn: "Destroyer Mask",
      icon: "https://terraria.wiki.gg/images/7/7d/Destroyer_Mask.png",
      amount: "1",
      chance: "14.29%",
      description: "時裝頭部配件",
    },
  ],
};

export default theDestroyer;
