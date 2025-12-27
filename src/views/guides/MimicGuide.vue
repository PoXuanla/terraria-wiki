<script setup>
import { ref, computed } from "vue";
import {
  Skull,
  Sparkles,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Swords,
  FlaskConical,
  Flame,
  Plus,
  Equal,
  BookOpen,
  Target,
  Key,
  Info,
} from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import BaseIcon from "@/components/BaseIcon.vue";

/**
 * 生物群系寶箱怪資料
 */
const mimicTypes = [
  {
    id: "hallowed",
    name: "神聖寶箱怪",
    nameEn: "Hallowed Mimic",
    biome: "神聖之地",
    biomeColor: "#fbbf24",
    cardGradient: "linear-gradient(to bottom right, #f59e0b, #facc15)",
    borderColor: "#fbbf24",
    mimicIcon: "https://terraria.wiki.gg/images/7/7c/Hallowed_Mimic.png",
    keyRequired: {
      name: "光之鑰",
      nameEn: "Key of Light",
      icon: "https://terraria.wiki.gg/images/3/30/Key_of_Light.png",
    },
    drops: [
      {
        name: "代達羅斯風暴弓",
        nameEn: "Daedalus Stormbow",
        icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
        highlight: true,
      },
      {
        name: "飛刀匕首",
        nameEn: "Flying Knife",
        icon: "https://terraria.wiki.gg/images/4/46/Flying_Knife.png",
      },
      {
        name: "水晶碎片",
        nameEn: "Crystal Vile Shard",
        icon: "https://terraria.wiki.gg/images/1/1a/Crystal_Vile_Shard.png",
      },
    ],
  },
  {
    id: "corrupt",
    name: "腐化寶箱怪",
    nameEn: "Corrupt Mimic",
    biome: "腐化之地",
    biomeColor: "#a855f7",
    cardGradient: "linear-gradient(to bottom right, #9333ea, #8b5cf6)",
    borderColor: "#a855f7",
    mimicIcon: "https://terraria.wiki.gg/images/4/44/Corrupt_Mimic.png",
    keyRequired: {
      name: "闇之鑰",
      nameEn: "Key of Night",
      icon: "https://terraria.wiki.gg/images/9/9f/Key_of_Night.png",
    },
    drops: [
      {
        name: "鏈鍘刀",
        nameEn: "Chain Guillotines",
        icon: "https://terraria.wiki.gg/images/b/b2/Chain_Guillotines.png",
        highlight: true,
      },
      {
        name: "蛆蟲圍巾",
        nameEn: "Worm Scarf",
        icon: "https://terraria.wiki.gg/images/0/00/Worm_Scarf.png",
      },
      {
        name: "詛咒之焰",
        nameEn: "Cursed Flames",
        icon: "https://terraria.wiki.gg/images/7/7e/Clinger_Staff.png",
      },
    ],
  },
  {
    id: "crimson",
    name: "猩紅寶箱怪",
    nameEn: "Crimson Mimic",
    biome: "猩紅之地",
    biomeColor: "#ef4444",
    cardGradient: "linear-gradient(to bottom right, #dc2626, #f43f5e)",
    borderColor: "#ef4444",
    mimicIcon: "https://terraria.wiki.gg/images/b/bc/Crimson_Mimic.png",
    keyRequired: {
      name: "闇之鑰",
      nameEn: "Key of Night",
      icon: "https://terraria.wiki.gg/images/9/9f/Key_of_Night.png",
    },
    drops: [
      {
        name: "惡臭虎爪",
        nameEn: "Fetid Baghnakhs",
        icon: "https://terraria.wiki.gg/images/4/4c/Fetid_Baghnakhs.png",
        highlight: true,
      },
      {
        name: "血肉指虎",
        nameEn: "Flesh Knuckles",
        icon: "https://terraria.wiki.gg/images/e/e1/Flesh_Knuckles.png",
      },
      {
        name: "生命吸取杖",
        nameEn: "Life Drain",
        icon: "https://terraria.wiki.gg/images/b/bf/Life_Drain.png",
      },
    ],
  },
];

/**
 * 召喚步驟
 */
const summonSteps = [
  {
    step: 1,
    title: "取得對應鑰匙",
    description: "在對應生物群系擊殺敵人，或使用靈魂合成",
    icon: "🔑",
  },
  {
    step: 2,
    title: "準備一個空寶箱",
    description: "任何類型的寶箱都可以，確保完全清空",
    icon: "📦",
  },
  {
    step: 3,
    title: "放入鑰匙",
    description: "將 1 把鑰匙放入寶箱的第一格",
    icon: "✨",
  },
  {
    step: 4,
    title: "關閉寶箱",
    description: "寶箱立即變身為寶箱怪！",
    icon: "💀",
  },
];

/**
 * 狩獵準備清單
 */
const preparationList = ref([
  {
    id: 1,
    text: "戰鬥藥水 (Battle Potion)",
    checked: false,
    icon: FlaskConical,
  },
  { id: 2, text: "水蠟燭 (Water Candle)", checked: false, icon: Flame },
  { id: 3, text: "準備好的競技場", checked: false, icon: Swords },
  { id: 4, text: "足夠的治療藥水", checked: false, icon: FlaskConical },
  { id: 5, text: "鋼皮藥水 / 再生藥水", checked: false, icon: FlaskConical },
  { id: 6, text: "遠程武器 (推薦)", checked: false, icon: Target },
]);

/**
 * 鑰匙合成資訊
 */
const keyRecipes = [
  {
    name: "光之鑰",
    nameEn: "Key of Light",
    icon: "https://terraria.wiki.gg/images/3/30/Key_of_Light.png",
    materials: [
      {
        name: "靈魂光 x15",
        icon: "https://terraria.wiki.gg/images/4/4b/Soul_of_Light.png",
      },
    ],
    craftStation: "工作台",
    biome: "神聖之地",
    biomeColor: "#fbbf24",
  },
  {
    name: "闇之鑰",
    nameEn: "Key of Night",
    icon: "https://terraria.wiki.gg/images/9/9f/Key_of_Night.png",
    materials: [
      {
        name: "靈魂暗 x15",
        icon: "https://terraria.wiki.gg/images/a/a2/Soul_of_Night.png",
      },
    ],
    craftStation: "工作台",
    biome: "腐化/猩紅之地",
    biomeColor: "#a855f7",
  },
];

// 切換勾選狀態
const toggleCheck = (item) => {
  item.checked = !item.checked;
};

// 計算完成百分比
const completionPercent = computed(() => {
  const checked = preparationList.value.filter((item) => item.checked).length;
  return Math.round((checked / preparationList.value.length) * 100);
});
</script>

<template>
  <DocLayout title="本頁目錄">
    <div class="guide-page">
      <!-- ========================================
           Hero Banner
           ======================================== -->
      <header class="hero-banner">
        <div class="hero-banner__bg"></div>
        <div class="hero-banner__content">
          <div class="hero-banner__icon">
            <img
              src="https://terraria.wiki.gg/images/7/7c/Hallowed_Mimic.png"
              alt="Hallowed Mimic"
              class="hero-banner__img"
            />
          </div>
          <div class="hero-banner__text">
            <div class="hero-banner__badge">
              <BookOpen :size="14" />
              <span>攻略指南</span>
            </div>
            <h1 class="hero-banner__title">寶箱怪狩獵指南</h1>
            <p class="hero-banner__subtitle">Biome Mimic Hunting Guide</p>
            <p class="hero-banner__desc">
              學習如何召喚生物群系寶箱怪，取得困難模式的強力武器與配件！
            </p>
          </div>
        </div>
      </header>

      <!-- ========================================
           Section 1: 召喚方式
           ======================================== -->
      <section class="section-card">
        <h2 id="summon">召喚方式</h2>

        <p>
          生物群系寶箱怪 (Biome Mimics) 是困難模式中三種強大的特殊敵人，
          分別對應<strong>神聖之地</strong>、<strong>腐化之地</strong>和<strong>猩紅之地</strong>。
          與自然生成的普通寶箱怪不同，這些特殊寶箱怪必須透過<em>鑰匙召喚</em>。
        </p>

        <p>召喚生物群系寶箱怪非常簡單，只需要對應的鑰匙和一個空寶箱。</p>

        <!-- 算式視覺 -->
        <div class="summon-formula">
          <div class="formula-item">
            <div class="formula-item__icon-box formula-item__icon-box--chest">
              <span class="formula-item__emoji">📦</span>
            </div>
            <span class="formula-item__label">空寶箱</span>
          </div>

          <div class="formula-operator">
            <Plus :size="24" />
          </div>

          <div class="formula-item">
            <div class="formula-item__icon-box formula-item__icon-box--key">
              <BaseIcon
                icon="https://terraria.wiki.gg/images/3/30/Key_of_Light.png"
                :size="40"
              />
            </div>
            <span class="formula-item__label">鑰匙 × 1</span>
          </div>

          <div class="formula-operator">
            <Equal :size="24" />
          </div>

          <div class="formula-item">
            <div class="formula-item__icon-box formula-item__icon-box--mimic">
              <BaseIcon
                icon="https://terraria.wiki.gg/images/7/7c/Hallowed_Mimic.png"
                :size="48"
              />
            </div>
            <span class="formula-item__label">寶箱怪！</span>
          </div>
        </div>

        <!-- 注意事項 -->
        <div class="summon-warning">
          <AlertTriangle :size="18" class="summon-warning__icon" />
          <p class="summon-warning__text">
            <strong>注意：</strong>寶箱必須是<em>空的</em>，且只需放入
            <strong>1 把</strong>鑰匙。 關閉寶箱後會立即變身，請做好戰鬥準備！
          </p>
        </div>

        <!-- 步驟說明 -->
        <div class="summon-steps">
          <div v-for="step in summonSteps" :key="step.step" class="step-card">
            <div class="step-card__number">{{ step.step }}</div>
            <div class="step-card__content">
              <div class="step-card__icon">{{ step.icon }}</div>
              <h3 class="step-card__title">{{ step.title }}</h3>
              <p class="step-card__desc">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================
           Section 2: 寶箱怪種類
           ======================================== -->
      <section class="section-card">
        <h2 id="types">寶箱怪種類</h2>

        <p>
          共有三種生物群系寶箱怪，每種都有專屬的掉落物。
          點選下方卡片了解各類型的召喚條件與關鍵掉落。
        </p>

        <!-- 卡片網格 -->
        <div class="mimic-grid">
          <article
            v-for="mimic in mimicTypes"
            :key="mimic.id"
            class="mimic-card"
            :style="{ '--card-accent': mimic.borderColor }"
          >
            <!-- 卡片頂部 - 寶箱怪資訊 -->
            <div
              class="mimic-card__header"
              :style="{ background: mimic.cardGradient }"
            >
              <img
                :src="mimic.mimicIcon"
                :alt="mimic.name"
                class="mimic-card__icon"
              />
              <div class="mimic-card__title-group">
                <h3 class="mimic-card__name">{{ mimic.name }}</h3>
                <span class="mimic-card__name-en">{{ mimic.nameEn }}</span>
              </div>
              <span class="mimic-card__biome-tag">{{ mimic.biome }}</span>
            </div>

            <!-- 召喚條件 -->
            <div class="mimic-card__summon">
              <span class="mimic-card__summon-label">召喚所需</span>
              <div class="mimic-card__key">
                <BaseIcon :icon="mimic.keyRequired.icon" :size="28" />
                <span class="mimic-card__key-name">{{
                  mimic.keyRequired.name
                }}</span>
              </div>
            </div>

            <!-- 掉落物 -->
            <div class="mimic-card__drops">
              <span class="mimic-card__drops-label">
                <Swords :size="14" />
                關鍵掉落物
              </span>
              <div class="mimic-card__drops-list">
                <div
                  v-for="drop in mimic.drops"
                  :key="drop.nameEn"
                  :class="[
                    'drop-item',
                    { 'drop-item--highlight': drop.highlight },
                  ]"
                >
                  <BaseIcon
                    :icon="drop.icon"
                    :size="32"
                    class="drop-item__icon"
                  />
                  <span class="drop-item__name">{{ drop.name }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ========================================
           Section 3: 戰前準備
           ======================================== -->
      <section class="section-card">
        <h2 id="preparation">戰前準備</h2>

        <p>
          生物群系寶箱怪的血量約為 <code>3,500</code>，攻擊力也相當高。
          建議在戰鬥前做好以下準備，勾選已完成的項目：
        </p>

        <!-- 互動式清單 -->
        <div class="preparation-section">
          <!-- 進度條 -->
          <div class="preparation-progress">
            <div class="preparation-progress__bar">
              <div
                class="preparation-progress__fill"
                :style="{ width: `${completionPercent}%` }"
              ></div>
            </div>
            <span class="preparation-progress__text">
              {{ completionPercent }}% 完成
            </span>
          </div>

          <!-- 清單項目 -->
          <div class="checklist">
            <div
              v-for="item in preparationList"
              :key="item.id"
              :class="[
                'checklist-item',
                { 'checklist-item--checked': item.checked },
              ]"
              @click="toggleCheck(item)"
            >
              <div class="checklist-item__checkbox">
                <CheckCircle2
                  v-if="item.checked"
                  :size="20"
                  class="checklist-item__icon--checked"
                />
                <Circle
                  v-else
                  :size="20"
                  class="checklist-item__icon--unchecked"
                />
              </div>
              <component
                :is="item.icon"
                :size="18"
                class="checklist-item__type-icon"
              />
              <span class="checklist-item__text">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================
           Section 4: 鑰匙取得
           ======================================== -->
      <section class="section-card">
        <h2 id="keys">鑰匙取得</h2>

        <p>
          召喚鑰匙可以透過<strong>合成製作</strong>取得。
          在對應的地下生物群系刷怪，收集靈魂後即可合成。
        </p>

        <!-- 鑰匙合成卡片 -->
        <div class="recipes-grid">
          <div
            v-for="key in keyRecipes"
            :key="key.nameEn"
            class="recipe-card"
            :style="{ '--recipe-accent': key.biomeColor }"
          >
            <div class="recipe-card__header">
              <BaseIcon :icon="key.icon" :size="36" class="recipe-card__icon" />
              <div class="recipe-card__title">
                <span class="recipe-card__name">{{ key.name }}</span>
                <span class="recipe-card__name-en">{{ key.nameEn }}</span>
              </div>
            </div>

            <div class="recipe-card__content">
              <div class="recipe-card__materials">
                <span class="recipe-card__label">合成材料</span>
                <div
                  v-for="mat in key.materials"
                  :key="mat.name"
                  class="recipe-card__material"
                >
                  <BaseIcon :icon="mat.icon" :size="24" />
                  <span>{{ mat.name }}</span>
                </div>
              </div>

              <div class="recipe-card__info">
                <div class="recipe-card__info-row">
                  <span class="recipe-card__label">合成站</span>
                  <span>{{ key.craftStation }}</span>
                </div>
                <div class="recipe-card__info-row">
                  <span class="recipe-card__label">刷取地點</span>
                  <span
                    class="recipe-card__biome"
                    :style="{ color: key.biomeColor }"
                    >{{ key.biome }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 提示 -->
        <div class="recipe-tip">
          <Info :size="20" class="recipe-tip__icon" />
          <p class="recipe-tip__text">
            <strong>刷取技巧：</strong
            >在地底的神聖/腐化/猩紅區域刷怪，可以同時取得對應的靈魂。
            建議使用戰鬥藥水和水蠟燭來加速刷取效率！
          </p>
        </div>
      </section>

      <!-- ========================================
           Section 5: 戰鬥技巧
           ======================================== -->
      <section class="section-card">
        <h2 id="combat">戰鬥技巧</h2>

        <p>
          寶箱怪會進行跳躍攻擊，動作有明顯的預備動作。以下是一些實用的戰鬥建議：
        </p>

        <ul>
          <li><strong>保持移動</strong> - 利用翅膀保持距離，不要被逼到角落</li>
          <li><strong>遠程優先</strong> - 使用弓箭或槍械可以更安全地輸出</li>
          <li><strong>場地準備</strong> - 建造約 50-80 格長的平坦戰鬥場地</li>
          <li><strong>回復設施</strong> - 放置篝火和心形燈籠增加回復速度</li>
        </ul>

        <div class="tip-box">
          <strong>💡 專家提示：</strong
          >神聖寶箱怪掉落的代達羅斯風暴弓搭配聖箭，是對付毀滅者 (The Destroyer)
          的神器。 絕對值得多刷幾隻！
        </div>
      </section>
    </div>
  </DocLayout>
</template>

<style scoped>
/* ==========================================
   頁面容器
   ========================================== */
.guide-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ==========================================
   Section Card
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

.section-card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
  padding-bottom: 0.625rem;
  border-bottom: 2px solid var(--color-primary-light);
  scroll-margin-top: 6rem;
}

.section-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 1.25rem 0 0.5rem;
}

.section-card p {
  margin: 0 0 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.section-card ul,
.section-card ol {
  margin: 0 0 1rem;
  padding-left: 1.5rem;
  color: var(--color-text-secondary);
}

.section-card li {
  margin-bottom: 0.375rem;
  line-height: 1.6;
}

.section-card code {
  background: var(--color-bg-main);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-weight: 500;
  color: var(--color-primary);
}

.section-card strong {
  color: var(--color-text-primary);
}

/* ==========================================
   Tip Box
   ========================================== */
.tip-box {
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #1e40af;
  line-height: 1.6;
}

:global(.dark) .tip-box {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #93c5fd;
}

/* ==========================================
   Hero Banner
   ========================================== */
.hero-banner {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  border-radius: 1rem;
  overflow: hidden;
  padding: 2rem;
}

.hero-banner__bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 80% 20%,
      rgba(251, 191, 36, 0.15) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 20% 80%,
      rgba(168, 85, 247, 0.1) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(239, 68, 68, 0.08) 0%,
      transparent 50%
    );
}

.hero-banner__content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 1;
}

.hero-banner__icon {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

.hero-banner__img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.5));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.hero-banner__text {
  flex: 1;
  color: white;
}

.hero-banner__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: rgba(99, 102, 241, 0.3);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a5b4fc;
  margin-bottom: 0.75rem;
}

.hero-banner__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.hero-banner__subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0.25rem 0 0;
  font-style: italic;
}

.hero-banner__desc {
  margin: 0.75rem 0 0;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

/* ==========================================
   召喚算式視覺
   ========================================== */
.summon-formula {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%);
  border-radius: 0.75rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.formula-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.formula-item__icon-box {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 3px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15);
}

.formula-item__icon-box--chest {
  background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
}

.formula-item__icon-box--key {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.formula-item__icon-box--mimic {
  background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
  animation: shake 0.5s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-3px) rotate(-2deg);
  }
  75% {
    transform: translateX(3px) rotate(2deg);
  }
}

.formula-item__emoji {
  font-size: 2rem;
}

.formula-item__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #78350f;
}

.formula-operator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  color: #78350f;
}

/* ==========================================
   警告框
   ========================================== */
.summon-warning {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.summon-warning__icon {
  color: #dc2626;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.summon-warning__text {
  font-size: 0.875rem;
  color: #991b1b;
  margin: 0;
  line-height: 1.5;
}

.summon-warning__text em {
  font-style: normal;
  text-decoration: underline;
  text-decoration-style: wavy;
  text-underline-offset: 3px;
}

/* ==========================================
   步驟卡片
   ========================================== */
.summon-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.step-card:hover {
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
}

.step-card__number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-accent) 100%
  );
  border-radius: 50%;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
}

.step-card__content {
  flex: 1;
}

.step-card__icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.step-card__title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem;
}

.step-card__desc {
  font-size: 0.6875rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* ==========================================
   寶箱怪卡片網格
   ========================================== */
.mimic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.mimic-card {
  border-radius: 0.75rem;
  overflow: hidden;
  border: 2px solid var(--card-accent);
  background: var(--color-bg-card);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mimic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.15);
}

.mimic-card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  color: white;
}

.mimic-card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.mimic-card__title-group {
  flex: 1;
  min-width: 0;
}

.mimic-card__name {
  font-size: 0.9375rem;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mimic-card__name-en {
  font-size: 0.6875rem;
  opacity: 0.85;
}

.mimic-card__biome-tag {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.2rem 0.4rem;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mimic-card__summon {
  padding: 0.75rem 1rem;
  background: var(--color-bg-main);
  border-bottom: 1px solid var(--color-border);
}

.mimic-card__summon-label {
  display: block;
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: 0.375rem;
}

.mimic-card__key {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mimic-card__key-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.mimic-card__drops {
  padding: 0.75rem 1rem;
}

.mimic-card__drops-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #4b5563; /* gray-600 - 更深的標籤文字 */
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

:global(.dark) .mimic-card__drops-label {
  color: #d1d5db; /* gray-300 */
}

.mimic-card__drops-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.drop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.375rem;
  background: var(--color-bg-main);
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
  min-width: 60px;
  transition: all 0.15s ease;
}

.drop-item:hover {
  border-color: var(--card-accent);
}

.drop-item--highlight {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-color: #fbbf24;
}

:global(.dark) .drop-item--highlight {
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.3) 0%,
    rgba(251, 191, 36, 0.15) 100%
  );
  border-color: #d97706;
}

.drop-item__icon {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.drop-item__name {
  font-size: 0.5625rem;
  font-weight: 500;
  color: var(--color-text-secondary); /* gray-700 - 更深的物品名稱 */
  text-align: center;
  line-height: 1.2;
  transition: color 0.3s ease;
}

:global(.dark) .drop-item__name {
  color: #e5e7eb; /* gray-200 */
}

/* 高亮物品 - 確保文字在黃色背景上可讀 */
.drop-item--highlight .drop-item__name {
  color: #78350f; /* amber-900 - 深棕色 */
}

:global(.dark) .drop-item--highlight .drop-item__name {
  color: #fcd34d; /* amber-300 - 亮黃色 */
}

/* ==========================================
   準備清單
   ========================================== */
.preparation-section {
  margin: 1.5rem 0;
}

.preparation-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.preparation-progress__bar {
  flex: 1;
  height: 8px;
  background: var(--color-bg-main);
  border-radius: 9999px;
  overflow: hidden;
}

.preparation-progress__fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-accent) 100%
  );
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.preparation-progress__text {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 70px;
  text-align: right;
}

.checklist {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--color-bg-main);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.checklist-item:hover {
  border-color: var(--color-primary-light);
}

.checklist-item--checked {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-color: #86efac;
}

.checklist-item--checked .checklist-item__text {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.checklist-item__checkbox {
  flex-shrink: 0;
}

.checklist-item__icon--checked {
  color: #16a34a;
}

.checklist-item__icon--unchecked {
  color: var(--color-text-muted);
}

.checklist-item__type-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.checklist-item__text {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-primary);
  transition: all 0.15s ease;
}

/* ==========================================
   鑰匙合成卡片
   ========================================== */
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.recipe-card {
  padding: 1.25rem;
  background: var(--color-bg-main);
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--recipe-accent);
}

.recipe-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.recipe-card__icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.recipe-card__title {
  display: flex;
  flex-direction: column;
}

.recipe-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.recipe-card__name-en {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.recipe-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recipe-card__materials {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.recipe-card__label {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.recipe-card__material {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.recipe-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.recipe-card__info-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
}

.recipe-card__biome {
  font-weight: 600;
}

/* ==========================================
   提示框
   ========================================== */
.recipe-tip {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #93c5fd;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}

.recipe-tip__icon {
  color: #2563eb;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.recipe-tip__text {
  font-size: 0.875rem;
  color: #1e40af;
  margin: 0;
  line-height: 1.6;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 900px) {
  .mimic-grid {
    grid-template-columns: 1fr;
  }

  .summon-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero-banner__content {
    flex-direction: column;
    text-align: center;
  }

  .summon-formula {
    gap: 0.75rem;
    padding: 1rem;
  }

  .formula-item__icon-box {
    width: 56px;
    height: 56px;
  }

  .formula-operator {
    width: 32px;
    height: 32px;
  }

  .summon-steps {
    grid-template-columns: 1fr;
  }

  .checklist {
    grid-template-columns: 1fr;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
