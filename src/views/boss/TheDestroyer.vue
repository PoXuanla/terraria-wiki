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
  Flame,
  Target,
  AlertTriangle,
  ChevronRight,
  Star,
  Package,
  Crosshair,
  Moon,
  Bug,
} from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";

// 當前選中的職業 Tab
const activeClassTab = ref("ranger");

/**
 * 毀滅者 (The Destroyer) - BOSS 資料
 */
const bossData = {
  // 基本資訊
  name: "毀滅者",
  nameEn: "The Destroyer",
  type: "機械 Boss",
  difficulty: "困難模式",

  // 圖片
  icon: "https://terraria.wiki.gg/images/a/a7/The_Destroyer.png",
  wikiUrl: "https://terraria.wiki.gg/wiki/The_Destroyer",

  // 召喚方式
  summoning: {
    item: "機械蠕蟲",
    itemEn: "Mechanical Worm",
    itemIcon: "https://terraria.wiki.gg/images/d/d0/Mechanical_Worm.png",
    timeRestriction: "晚上 7:30 PM 後",
    recipe: [
      {
        name: "腐肉/脊椎",
        nameEn: "Rotten Chunk/Vertebrae",
        amount: 6,
        icon: "https://terraria.wiki.gg/images/b/b8/Rotten_Chunk.png",
      },
      {
        name: "鐵錠/鉛錠",
        nameEn: "Iron/Lead Bar",
        amount: 5,
        icon: "https://terraria.wiki.gg/images/f/fc/Iron_Bar.png",
      },
      {
        name: "暗影之魂",
        nameEn: "Soul of Night",
        amount: 6,
        icon: "https://terraria.wiki.gg/images/7/77/Soul_of_Night.png",
      },
    ],
    craftStation: "秘銀/山銅砧",
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

  // 戰鬥資訊
  combat: {
    arena: {
      title: "場地準備",
      tips: [
        "在空中搭建高平台（距離地面約 100 格），讓毀滅者難以觸及",
        "建造一個有天花板的「庇護箱」，可以阻擋探測器的雷射攻擊",
        "平台長度建議 150 格以上，提供足夠的閃避空間",
        "沿途放置營火與心型燈籠，增加生命回復",
        "準備蜂蜜池用於快速回復 Buff",
      ],
    },
    behavior: [
      {
        title: "地底穿梭",
        description: "毀滅者會在地下穿梭，從各個方向衝向玩家。其超長的身體意味著攻擊面積極大。",
        icon: "🐛",
      },
      {
        title: "雷射攻擊",
        description: "身體的每個體節都會發射紅色雷射光束，當多個體節同時發射時會形成「彈幕地獄」。",
        icon: "💥",
      },
      {
        title: "探測器",
        description: "當體節受到傷害時會釋放小型探測器 (Probe)，探測器會飛向玩家並發射雷射。擊殺探測器可掉落心和星星。",
        icon: "🤖",
      },
    ],
    coreStrategy: {
      title: "核心戰術",
      priority: "穿透武器是王道！禁止使用單體攻擊！",
      reason:
        "毀滅者擁有 82 個體節，穿透攻擊可以同時命中多個體節造成驚人的傷害疊加。單體武器只能打一節，效率極低。",
      steps: [
        "在天空平台上等待毀滅者，保持與地面的距離",
        "使用代達羅斯風暴弓 + 聖箭，讓落星雨傾瀉在蟲身上",
        "清理探測器來獲取心和星星補給",
        "利用庇護箱躲避密集的雷射彈幕",
        "保持持續輸出，穿透傷害會讓戰鬥非常快速",
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
          <div class="hero__bg-glow hero__bg-glow--red"></div>
        </div>

        <div class="hero__content">
          <!-- BOSS 圖示 -->
          <div class="hero__icon-wrapper">
            <div class="hero__icon-glow"></div>
            <div class="hero__icon-frame">
              <img
                :src="bossData.icon"
                alt="The Destroyer"
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
              <span class="badge badge--easy">
                ✅ 最易擊敗
              </span>
            </div>

            <h1 class="hero__title">{{ bossData.name }}</h1>
            <p class="hero__subtitle">{{ bossData.nameEn }}</p>
            <p class="hero__description">
              世界吞噬怪的機械版本。由多個體節組成的巨型機械蠕蟲。
              若準備得當，通常被認為是三個機械 Boss 中「最容易」擊敗的一個。
              擁有穿透武器的玩家可以輕鬆秒殺它。
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
         Stats Section - 屬性數據
         ======================================== -->
      <section class="section-card">
        <h2 id="stats" class="section-heading">
          <Bug :size="20" class="section-heading__icon" />
          <span>屬性數據</span>
        </h2>

        <div class="stats-table-wrapper">
          <table class="stats-table">
            <thead>
              <tr>
                <th class="stats-table__header stats-table__header--attr">屬性</th>
                <th class="stats-table__header stats-table__header--main">
                  <div class="table-header-content">
                    <img :src="bossData.stats.main.icon" alt="The Destroyer" class="table-icon" />
                    <span>毀滅者本體</span>
                  </div>
                </th>
                <th class="stats-table__header stats-table__header--probe">
                  <div class="table-header-content">
                    <img :src="bossData.stats.probe.icon" alt="Probe" class="table-icon" />
                    <span>探測器</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="stats-table__label"><Heart :size="14" class="mr-1" /> 血量</td>
                <td class="stats-table__value stats-table__value--highlight">
                  {{ bossData.stats.main.hp.toLocaleString() }}
                </td>
                <td class="stats-table__value">{{ bossData.stats.probe.hp }}</td>
              </tr>
              <tr>
                <td class="stats-table__label"><Shield :size="14" class="mr-1" /> 防禦</td>
                <td class="stats-table__value">{{ bossData.stats.main.defense }}</td>
                <td class="stats-table__value">{{ bossData.stats.probe.defense }}</td>
              </tr>
              <tr>
                <td class="stats-table__label"><Swords :size="14" class="mr-1" /> 傷害</td>
                <td class="stats-table__value">{{ bossData.stats.main.damage }}</td>
                <td class="stats-table__value">{{ bossData.stats.probe.damage }}</td>
              </tr>
              <tr>
                <td class="stats-table__label"><AlertTriangle :size="14" class="mr-1" /> 備註</td>
                <td class="stats-table__value stats-table__value--text">
                  {{ bossData.stats.main.notes }}
                </td>
                <td class="stats-table__value stats-table__value--text">
                  {{ bossData.stats.probe.notes }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 免疫狀態警告 -->
        <div class="warning-box warning-box--info">
          <AlertTriangle :size="20" class="warning-box__icon" />
          <p class="warning-box__text">
            <strong>💀 免疫所有減益效果：</strong>毀滅者免疫所有減益狀態（如中毒、著火等），因此減益武器對它無效。專注於純傷害輸出！
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
          <span class="priority-badge priority-badge--important">⚔️ 最重要原則</span>
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
  background: linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 50%, #3d1f47 100%);
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
      rgba(239, 68, 68, 0.15) 0%,
      transparent 50%
    ),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/svg%3E");
}

.hero__bg-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(80px);
  animation: pulse-glow 4s ease-in-out infinite;
}

.hero__bg-glow--red {
  top: 30%;
  left: 40%;
  background: rgba(220, 38, 38, 0.4);
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
  background: rgba(220, 38, 38, 0.5);
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

.badge--easy {
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
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
   Stats Table
   ========================================== */
.stats-table-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.stats-table__header {
  padding: 0.875rem 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--color-border);
}

.stats-table__header--attr {
  background: var(--color-bg-main);
  color: var(--color-text-secondary);
  width: 140px;
}

.stats-table__header--main {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
  color: #dc2626;
}

.stats-table__header--probe {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  color: #3b82f6;
}

.table-header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.table-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  image-rendering: pixelated;
}

.stats-table tbody tr {
  border-bottom: 1px solid var(--color-border);
}

.stats-table tbody tr:hover {
  background: var(--color-bg-main);
}

.stats-table__label {
  padding: 0.75rem 1rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
}

.stats-table__value {
  padding: 0.75rem 1rem;
  color: var(--color-text-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.stats-table__value--highlight {
  color: #dc2626;
  font-size: 1rem;
}

.stats-table__value--text {
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 1.5;
}

/* ==========================================
   Warning Box
   ========================================== */
.warning-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 0.5rem;
}

.warning-box--info {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border-color: rgba(59, 130, 246, 0.3);
}

.warning-box__icon {
  color: #f59e0b;
  flex-shrink: 0;
}

.warning-box--info .warning-box__icon {
  color: #3b82f6;
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
  background: linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%);
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
  color: #60a5fa;
}

.strategy-highlight__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  scroll-margin-top: 6rem;
}

.strategy-highlight__priority {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.priority-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: #dc2626;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.priority-badge--important {
  background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
}

.priority-text {
  font-size: 1rem;
  font-weight: 600;
  color: #fca5a5;
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
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.4);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  color: #60a5fa;
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
}

/* ==========================================
   Helper Classes
   ========================================== */
.mr-1 {
  margin-right: 0.25rem;
}
</style>

