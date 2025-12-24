<script setup>
import { ref } from "vue";
import {
  ExternalLink,
  Skull,
  Heart,
  Swords,
  Shield,
  Zap,
  Clock,
  Target,
  AlertTriangle,
  ChevronRight,
  Star,
  Package,
  Crosshair,
  Moon,
} from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";

// 當前選中的職業 Tab
const activeClassTab = ref("ranger");

/**
 * 機械骷髏王 (Skeletron Prime) - BOSS 資料
 */
const bossData = {
  // 基本資訊
  name: "機械骷髏王",
  nameEn: "Skeletron Prime",
  type: "機械 Boss",
  difficulty: "困難模式",

  // 圖片
  icon: "https://terraria.wiki.gg/images/2/2a/Skeletron_Prime.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/Skeletron_Prime",

  // 召喚方式
  summoning: {
    item: "機械骷髏",
    itemEn: "Mechanical Skull",
    itemIcon: "https://terraria.wiki.gg/images/4/4e/Mechanical_Skull.png",
    timeRestriction: "晚上 7:30 PM 後",
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
    craftStation: "秘銀/山銅砧",
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
        description: "四隻手臂會不規則地揮動攻擊。雷射砲和火砲從遠處發射彈幕，電鋸和鉗子嘗試近距離抓取。",
        icon: "🦾",
      },
      {
        title: "頭部旋轉",
        description: "當血量降低或特定時機，頭部會開始高速旋轉並追擊玩家。旋轉時防禦下降但傷害暴增，碰到幾乎即死！",
        icon: "💀",
      },
      {
        title: "彈幕地獄",
        description: "雷射砲和火砲同時發射會造成密集的彈幕。若不優先處理這兩隻手臂，閃避會變得非常困難。",
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
</script>

<template>
  <DocLayout title="目錄">
    <div class="boss-page">
      <!-- ========================================
           Hero Section - 頂部展示區
           ======================================== -->
      <section class="hero">
        <!-- 背景裝飾 -->
        <div class="hero__bg">
          <div class="hero__bg-pattern"></div>
          <div class="hero__bg-glow"></div>
        </div>

        <div class="hero__content">
          <!-- BOSS 圖示 -->
          <div class="hero__icon-wrapper">
            <div class="hero__icon-glow"></div>
            <div class="hero__icon-frame">
              <img
                :src="bossData.icon"
                alt="Skeletron Prime"
                class="hero__icon-img"
              />
            </div>
          </div>

          <!-- BOSS 資訊 -->
          <div class="hero__info">
            <div class="hero__badges">
              <span class="badge badge--boss">
                <Skull :size="12" class="mr-1" />
                {{ bossData.type }}
              </span>
              <span class="badge badge--difficulty">
                <Star :size="12" class="mr-1" />
                {{ bossData.difficulty }}
              </span>
              <span class="badge badge--danger">
                ⚠️ 高難度
              </span>
            </div>

            <h1 class="hero__title">{{ bossData.name }}</h1>
            <p class="hero__subtitle">{{ bossData.nameEn }}</p>
            <p class="hero__description">
              骷髏王的機械版本。擁有四隻手臂（雷射砲、火砲、電鋸、鉗子）和一顆會旋轉的頭顱。
              通常被認為是機械三王中最難對付的一個。
              頭部旋轉攻擊的傷害極高，被擊中可能直接死亡！
            </p>

            <a
              :href="bossData.wikiUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hero__wiki-link"
            >
              <span>查看 Wiki 頁面</span>
              <ExternalLink :size="16" />
            </a>
          </div>
        </div>
      </section>

      <!-- ========================================
         Summoning Section - 召喚方式
         ======================================== -->
      <section class="section-card">
        <h2 id="summoning" class="section-heading">
          <Moon :size="20" class="section-heading__icon" />
          <span>召喚方式</span>
        </h2>

        <div class="summoning-content">
          <!-- 召喚物品 -->
          <div class="summon-item">
            <img
              :src="bossData.summoning.itemIcon"
              :alt="bossData.summoning.item"
              class="summon-item__icon"
            />
            <div class="summon-item__info">
              <span class="summon-item__name">{{ bossData.summoning.item }}</span>
              <span class="summon-item__name-en">{{ bossData.summoning.itemEn }}</span>
            </div>
          </div>

          <!-- 時間限制 -->
          <div class="time-restriction">
            <Clock :size="18" />
            <span>需在 <strong>{{ bossData.summoning.timeRestriction }}</strong> 使用</span>
          </div>

          <!-- 合成配方 -->
          <div class="recipe-section">
            <h3 class="recipe-title">合成配方</h3>
            <div class="recipe-grid">
              <div
                v-for="ingredient in bossData.summoning.recipe"
                :key="ingredient.name"
                class="recipe-item"
              >
                <img
                  :src="ingredient.icon"
                  :alt="ingredient.name"
                  class="recipe-item__icon"
                />
                <div class="recipe-item__info">
                  <span class="recipe-item__name">{{ ingredient.name }}</span>
                  <span class="recipe-item__amount">x{{ ingredient.amount }}</span>
                </div>
              </div>
            </div>
            <p class="recipe-station">
              🔨 製作於：<strong>{{ bossData.summoning.craftStation }}</strong>
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================
         Arena Section - 場地準備
         ======================================== -->
      <section class="section-card">
        <h2 id="arena" class="section-heading">
          <Target :size="20" class="section-heading__icon" />
          <span>{{ bossData.combat.arena.title }}</span>
        </h2>

        <ul class="arena-tips">
          <li
            v-for="(tip, index) in bossData.combat.arena.tips"
            :key="index"
            class="arena-tip"
          >
            <ChevronRight :size="16" class="arena-tip__icon" />
            <span>{{ tip }}</span>
          </li>
        </ul>
      </section>

      <!-- ========================================
         Stats Section - 各部位屬性
         ======================================== -->
      <section class="section-card">
        <h2 id="stats" class="section-heading">
          <Skull :size="20" class="section-heading__icon" />
          <span>各部位屬性</span>
        </h2>

        <div class="parts-grid">
          <div
            v-for="part in bossData.parts"
            :key="part.nameEn"
            :class="['part-card', `part-card--${part.danger}`]"
            :style="{ '--part-color': part.color }"
          >
            <div class="part-card__header">
              <img :src="part.icon" :alt="part.name" class="part-card__icon" />
              <div class="part-card__title">
                <span class="part-card__name">{{ part.name }}</span>
                <span class="part-card__name-en">{{ part.nameEn }}</span>
              </div>
              <span :class="['part-card__danger', `part-card__danger--${part.danger}`]">
                {{ part.danger === 'high' ? '高威脅' : '中等' }}
              </span>
            </div>
            <div class="part-card__stats">
              <div class="part-stat">
                <Heart :size="14" />
                <span>{{ part.hp.toLocaleString() }}</span>
              </div>
              <div class="part-stat">
                <Shield :size="14" />
                <span>{{ part.defense }}</span>
              </div>
              <div class="part-stat">
                <Swords :size="14" />
                <span>{{ part.damage }}</span>
              </div>
            </div>
            <p class="part-card__notes">{{ part.notes }}</p>
          </div>
        </div>

        <!-- 頭部警告 -->
        <div class="warning-box">
          <AlertTriangle :size="20" class="warning-box__icon" />
          <p class="warning-box__text">
            <strong>⚠️ 致命警告：</strong>頭部旋轉時防禦降低但傷害暴增至 75+！
            若沒有足夠護甲，被旋轉中的頭部碰到幾乎是<strong>即死</strong>！務必優先閃避！
          </p>
        </div>
      </section>

      <!-- ========================================
         Behavior Section - 行為模式
         ======================================== -->
      <section class="section-card">
        <h2 id="behavior" class="section-heading">
          <Zap :size="20" class="section-heading__icon" />
          <span>行為模式</span>
        </h2>

        <div class="behavior-grid">
          <div
            v-for="behavior in bossData.combat.behavior"
            :key="behavior.title"
            class="behavior-card"
          >
            <div class="behavior-card__icon">{{ behavior.icon }}</div>
            <div class="behavior-card__content">
              <h4 class="behavior-card__title">{{ behavior.title }}</h4>
              <p class="behavior-card__desc">{{ behavior.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================
         Core Strategy - 核心戰術
         ======================================== -->
      <section class="strategy-highlight">
        <div class="strategy-highlight__header">
          <Target :size="24" class="strategy-highlight__icon" />
          <h2 id="strategy" class="strategy-highlight__title">
            {{ bossData.combat.coreStrategy.title }}
          </h2>
        </div>

        <div class="strategy-highlight__priority">
          <span class="priority-badge">🎯 關鍵戰術</span>
          <p class="priority-text">{{ bossData.combat.coreStrategy.priority }}</p>
        </div>

        <p class="strategy-highlight__reason">
          {{ bossData.combat.coreStrategy.reason }}
        </p>

        <ol class="strategy-steps">
          <li
            v-for="(step, index) in bossData.combat.coreStrategy.steps"
            :key="index"
            class="strategy-step"
          >
            <span class="strategy-step__number">{{ index + 1 }}</span>
            <span class="strategy-step__text">{{ step }}</span>
          </li>
        </ol>
      </section>

      <!-- ========================================
         Equipment Section - 推薦裝備
         ======================================== -->
      <section class="section-card">
        <h2 id="equipment" class="section-heading">
          <Crosshair :size="20" class="section-heading__icon" />
          <span>推薦裝備</span>
        </h2>

        <!-- 職業 Tabs -->
        <h3 class="subsection-title">🗡️ 職業武器推薦</h3>

        <div class="class-tabs">
          <button
            v-for="tab in bossData.equipment.classTabs"
            :key="tab.id"
            :class="['class-tab', { 'class-tab--active': activeClassTab === tab.id }]"
            :style="{ '--tab-color': tab.color }"
            @click="activeClassTab = tab.id"
          >
            <span class="class-tab__icon">{{ tab.icon }}</span>
            <span class="class-tab__name">{{ tab.name }}</span>
            <span class="class-tab__name-en">{{ tab.nameEn }}</span>
          </button>
        </div>

        <!-- 職業武器列表 -->
        <div class="equipment-grid">
          <RouterLink
            v-for="weapon in bossData.equipment.classWeapons[activeClassTab]"
            :key="weapon.name"
            :to="weapon.route"
            :class="[
              'equipment-card',
              'equipment-card--clickable',
              { 'equipment-card--has-page': weapon.hasPage },
              { 'equipment-card--highlight': weapon.highlight },
            ]"
          >
            <img :src="weapon.icon" :alt="weapon.name" class="equipment-card__icon" />
            <div class="equipment-card__content">
              <span class="equipment-card__name">
                {{ weapon.name }}
                <small>({{ weapon.nameEn }})</small>
                <span v-if="weapon.highlight" class="equipment-card__star">⭐ 推薦</span>
              </span>
              <span class="equipment-card__ammo">{{ weapon.ammo === "無" ? "無消耗" : `消耗：${weapon.ammo}` }}</span>
              <p class="equipment-card__desc">{{ weapon.description }}</p>
            </div>
            <div class="equipment-card__link-indicator">
              <span v-if="weapon.hasPage" class="equipment-card__view-link">
                查看詳情
                <ChevronRight :size="14" />
              </span>
              <span v-else class="equipment-card__coming-soon">即將推出</span>
            </div>
          </RouterLink>
        </div>

        <!-- 飾品推薦 -->
        <h3 class="subsection-title">💍 飾品</h3>
        <div class="equipment-grid equipment-grid--accessories">
          <div
            v-for="accessory in bossData.equipment.accessories"
            :key="accessory.name"
            class="equipment-card equipment-card--compact"
          >
            <img :src="accessory.icon" :alt="accessory.name" class="equipment-card__icon" />
            <div class="equipment-card__content">
              <span class="equipment-card__name">{{ accessory.name }}</span>
              <p class="equipment-card__desc">{{ accessory.description }}</p>
            </div>
          </div>
        </div>

        <!-- 護甲 -->
        <h3 class="subsection-title">🛡️ 護甲</h3>
        <div class="armor-card">
          <img
            :src="bossData.equipment.armor.icon"
            :alt="bossData.equipment.armor.name"
            class="armor-card__icon"
          />
          <div class="armor-card__content">
            <span class="armor-card__name">
              {{ bossData.equipment.armor.name }}
              <small>({{ bossData.equipment.armor.nameEn }})</small>
            </span>
            <p class="armor-card__desc">{{ bossData.equipment.armor.description }}</p>
          </div>
        </div>

        <!-- Buff 藥水 -->
        <h3 class="subsection-title">🧪 推薦 Buff</h3>
        <div class="buffs-list">
          <span v-for="buff in bossData.equipment.buffs" :key="buff" class="buff-tag">
            {{ buff }}
          </span>
        </div>
      </section>

      <!-- ========================================
         Drops Section - 掉落物
         ======================================== -->
      <section class="section-card">
        <h2 id="drops" class="section-heading">
          <Package :size="20" class="section-heading__icon" />
          <span>掉落物</span>
        </h2>

        <div class="drops-grid">
          <div
            v-for="drop in bossData.drops"
            :key="drop.name"
            :class="['drop-card', { 'drop-card--highlight': drop.highlight }]"
          >
            <img :src="drop.icon" :alt="drop.name" class="drop-card__icon" />
            <div class="drop-card__content">
              <div class="drop-card__header">
                <span class="drop-card__name">
                  {{ drop.name }}
                  <span v-if="drop.highlight" class="drop-card__star">⭐</span>
                </span>
                <span class="drop-card__chance">{{ drop.chance }}</span>
              </div>
              <span class="drop-card__name-en">{{ drop.nameEn }}</span>
              <span class="drop-card__amount">數量：{{ drop.amount }}</span>
              <p class="drop-card__desc">{{ drop.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </DocLayout>
</template>

<style scoped>
/* ==========================================
   頁面容器
   ========================================== */
.boss-page {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 區塊捲動定位偏移 */
#summoning,
#arena,
#stats,
#behavior,
#strategy,
#equipment,
#drops {
  scroll-margin-top: 6rem;
}

/* ==========================================
   Hero Section
   ========================================== */
.hero {
  position: relative;
  background: linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%);
  border-radius: 1rem;
  overflow: hidden;
  padding: 2rem;
}

.hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero__bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 50% 50%,
      rgba(244, 114, 182, 0.15) 0%,
      transparent 50%
    ),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/svg%3E");
}

.hero__bg-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 30%;
  left: 40%;
  border-radius: 50%;
  background: rgba(244, 114, 182, 0.3);
  filter: blur(80px);
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.hero__content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 1;
}

/* BOSS 圖示 */
.hero__icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.hero__icon-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: rgba(244, 114, 182, 0.5);
  filter: blur(20px);
  animation: icon-glow 3s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.hero__icon-frame {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
}

.hero__icon-img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  image-rendering: pixelated;
}

/* BOSS 資訊 */
.hero__info {
  flex: 1;
  color: white;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge--boss {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
}

.badge--difficulty {
  background-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.badge--danger {
  background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
  color: white;
}

.hero__title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.hero__subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0 0;
  font-style: italic;
}

.hero__description {
  margin: 1rem 0;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.hero__wiki-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.hero__wiki-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  color: white;
}

/* ==========================================
   通用區塊樣式
   ========================================== */
.section-card {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .section-card {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
}

.section-heading__icon {
  color: var(--color-primary);
}

.subsection-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 1.5rem 0 0.75rem;
}

.subsection-title:first-of-type {
  margin-top: 0;
}

/* ==========================================
   Summoning Section
   ========================================== */
.summoning-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summon-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.summon-item__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
}

.summon-item__info {
  display: flex;
  flex-direction: column;
}

.summon-item__name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.summon-item__name-en {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.time-restriction {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 0.5rem;
  color: #c4b5fd;
  font-size: 0.875rem;
}

.time-restriction strong {
  color: #fbbf24;
}

.recipe-section {
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.recipe-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem;
}

.recipe-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.recipe-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-bg-card);
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
}

.recipe-item__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  image-rendering: pixelated;
}

.recipe-item__info {
  display: flex;
  flex-direction: column;
}

.recipe-item__name {
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

.recipe-item__amount {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
}

.recipe-station {
  margin: 1rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* ==========================================
   Arena Tips
   ========================================== */
.arena-tips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.arena-tip {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  background: var(--color-bg-main);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  line-height: 1.5;
}

.arena-tip__icon {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* ==========================================
   Parts Grid - 各部位屬性
   ========================================== */
.parts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.part-card {
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  padding: 1rem;
  border-left: 3px solid var(--part-color);
}

.part-card--high {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, var(--color-bg-main) 100%);
}

.part-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.part-card__icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  image-rendering: pixelated;
}

.part-card__title {
  flex: 1;
}

.part-card__name {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.part-card__name-en {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.part-card__danger {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
}

.part-card__danger--high {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
}

.part-card__danger--medium {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.part-card__stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.part-stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.part-stat svg {
  color: var(--color-primary);
}

.part-stat span {
  font-weight: 600;
  color: var(--color-text-primary);
}

.part-card__notes {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* ==========================================
   Warning Box
   ========================================== */
.warning-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
}

.warning-box__icon {
  color: #ef4444;
  flex-shrink: 0;
}

.warning-box__text {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  line-height: 1.6;
}

/* ==========================================
   Behavior Grid
   ========================================== */
.behavior-grid {
  display: grid;
  gap: 1rem;
}

.behavior-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.behavior-card__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.behavior-card__content {
  flex: 1;
}

.behavior-card__title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem;
}

.behavior-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* ==========================================
   Strategy Highlight
   ========================================== */
.strategy-highlight {
  background: linear-gradient(135deg, #3f3f46 0%, #27272a 100%);
  border-radius: 0.75rem;
  padding: 1.5rem;
  color: white;
}

.strategy-highlight__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.strategy-highlight__icon {
  color: #f472b6;
}

.strategy-highlight__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  scroll-margin-top: 6rem;
}

.strategy-highlight__priority {
  background: rgba(244, 114, 182, 0.2);
  border: 1px solid rgba(244, 114, 182, 0.4);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.priority-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.priority-text {
  font-size: 1rem;
  font-weight: 600;
  color: #f9a8d4;
  margin: 0;
}

.strategy-highlight__reason {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0 0 1rem;
}

.strategy-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.strategy-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
}

.strategy-step__number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(244, 114, 182, 0.2);
  border: 1px solid rgba(244, 114, 182, 0.4);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  color: #f472b6;
  flex-shrink: 0;
}

.strategy-step__text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

/* ==========================================
   Equipment Section
   ========================================== */
.class-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.class-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--color-bg-main);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.class-tab:hover {
  border-color: var(--tab-color);
  background: color-mix(in srgb, var(--tab-color) 10%, transparent);
}

.class-tab--active {
  border-color: var(--tab-color);
  background: color-mix(in srgb, var(--tab-color) 15%, transparent);
}

.class-tab__icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.class-tab__name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.class-tab__name-en {
  font-size: 0.625rem;
  color: var(--color-text-secondary);
}

.equipment-grid {
  display: grid;
  gap: 0.75rem;
}

.equipment-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.equipment-card--clickable {
  cursor: pointer;
}

.equipment-card--clickable:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.equipment-card--highlight {
  border-color: #f59e0b;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, var(--color-bg-main) 100%);
}

.equipment-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.equipment-card__content {
  flex: 1;
  min-width: 0;
}

.equipment-card__name {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.equipment-card__name small {
  font-weight: 400;
  color: var(--color-text-secondary);
}

.equipment-card__star {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.125rem 0.375rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
  color: white;
}

.equipment-card__ammo {
  display: block;
  font-size: 0.6875rem;
  color: var(--color-primary);
  margin-top: 0.125rem;
}

.equipment-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0;
  line-height: 1.4;
}

.equipment-card__link-indicator {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.equipment-card__view-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
}

.equipment-card__coming-soon {
  font-size: 0.6875rem;
  color: var(--color-text-secondary);
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-card);
  border-radius: 9999px;
}

.equipment-card--compact {
  padding: 0.75rem;
}

.equipment-grid--accessories {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/* Armor Card */
.armor-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, var(--color-bg-main) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.5rem;
}

.armor-card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
}

.armor-card__content {
  flex: 1;
}

.armor-card__name {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.armor-card__name small {
  font-weight: 400;
  color: var(--color-text-secondary);
}

.armor-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.25rem 0 0;
}

/* Buffs List */
.buffs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.buff-tag {
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-size: 0.8125rem;
  color: var(--color-text-primary);
}

/* ==========================================
   Drops Section
   ========================================== */
.drops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.drop-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.drop-card--highlight {
  border-color: #f59e0b;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, var(--color-bg-main) 100%);
}

.drop-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.drop-card__content {
  flex: 1;
  min-width: 0;
}

.drop-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.drop-card__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.drop-card__star {
  color: #f59e0b;
}

.drop-card__chance {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  padding: 0.125rem 0.375rem;
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  border-radius: 9999px;
}

.drop-card__name-en {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.drop-card__amount {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

.drop-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0.375rem 0 0;
  line-height: 1.4;
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 640px) {
  .hero__content {
    flex-direction: column;
    text-align: center;
  }

  .hero__badges {
    justify-content: center;
  }

  .hero__title {
    font-size: 1.5rem;
  }

  .class-tabs {
    justify-content: center;
  }

  .equipment-grid--accessories {
    grid-template-columns: 1fr;
  }

  .parts-grid {
    grid-template-columns: 1fr;
  }
}

/* ==========================================
   Helper Classes
   ========================================== */
.mr-1 {
  margin-right: 0.25rem;
}
</style>

