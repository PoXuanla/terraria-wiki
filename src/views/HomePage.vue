<script setup>
import {
  Skull,
  Crosshair,
  Sword,
  Shield,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Crown,
  Star,
  ArrowRight,
  Play,
  BookOpen,
} from "lucide-vue-next";
import { BossSlug } from "@/data/boss/boss-slug.enum";

/**
 * HomePage - 專業首頁
 *
 * 設計靈感：現代遊戲 Wiki / 文檔網站
 * 包含：Hero Banner、遊戲進度路線圖、分類卡片、精選指南
 */

// 遊戲進度階段
const progressStages = [
  {
    id: "pre-hardmode",
    title: "探索與準備",
    titleEn: "Pre-Hardmode",
    description: "收集資源、探索地牢、擊敗初期 Boss",
    icon: "⛏️",
    status: "completed",
  },
  {
    id: "wall-of-flesh",
    title: "肉山",
    titleEn: "Wall of Flesh",
    description: "困難模式的開端",
    icon: "🔥",
    status: "completed",
  },
  {
    id: "mechanical-bosses",
    title: "機械三王",
    titleEn: "Mechanical Bosses",
    description: "毀滅者、雙子魔眼、機械骷髏王",
    icon: "⚙️",
    status: "current",
  },
  {
    id: "plantera",
    title: "世紀之花",
    titleEn: "Plantera",
    description: "叢林深處的強敵",
    icon: "🌸",
    status: "upcoming",
  },
  {
    id: "golem",
    title: "石巨人",
    titleEn: "Golem",
    description: "叢林神廟守護者",
    icon: "🗿",
    status: "upcoming",
  },
  {
    id: "moon-lord",
    title: "月亮領主",
    titleEn: "Moon Lord",
    description: "最終 Boss",
    icon: "🌙",
    status: "upcoming",
  },
];

// 分類卡片
const categories = [
  {
    id: "boss",
    title: "Boss 攻略",
    titleEn: "Boss Guides",
    description: "詳細的戰鬥策略、競技場設計與攻擊模式分析",
    icon: Skull,
    color: "#ef4444",
    gradient: "from-red-500 to-orange-500",
    link: `/boss/${BossSlug.THE_TWINS}`,
    linkText: "查看攻略",
  },
  {
    id: "weapons",
    title: "武器圖鑑",
    titleEn: "Weapon Database",
    description: "武器評級、製作配方與數值資料",
    icon: Crosshair,
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-500",
    link: "/weapons",
    linkText: "瀏覽武器",
  },
  {
    id: "loadouts",
    title: "職業裝備",
    titleEn: "Class Loadouts",
    description: "近戰、遠程、魔法、召喚師的最佳裝備搭配",
    icon: Shield,
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-500",
    link: "#",
    linkText: "即將推出",
    disabled: true,
  },
  {
    id: "guides",
    title: "實用指南",
    titleEn: "Guides & Tips",
    description: "狩獵技巧、農場設計與遊戲機制解析",
    icon: BookOpen,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-500",
    link: "/guides/mimic",
    linkText: "閱讀指南",
  },
];

// 精選指南資訊
const featuredGuide = {
  title: "如何擊敗雙子魔眼",
  titleEn: "How to Defeat The Twins",
  description:
    "機械三王中最具挑戰性的 Boss！本指南涵蓋完整的競技場建設、裝備推薦、戰鬥策略與各職業專屬技巧。",
  highlights: [
    "詳細的攻擊模式分析",
    "各職業推薦裝備",
    "競技場設計藍圖",
    "實戰技巧與走位建議",
  ],
  image: "https://terraria.wiki.gg/images/5/55/Retinazer.png",
  image2: "https://terraria.wiki.gg/images/d/d2/Spazmatism.png",
  link: `/boss/${BossSlug.THE_TWINS}`,
};
</script>

<template>
  <div class="home-page">
    <!-- ========================================
         Section 1: Hero Banner
         ======================================== -->
    <section class="hero">
      <!-- 背景效果 -->
      <div class="hero__bg">
        <div class="hero__bg-grid"></div>
        <div class="hero__bg-glow hero__bg-glow--1"></div>
        <div class="hero__bg-glow hero__bg-glow--2"></div>
        <div class="hero__bg-stars">
          <span
            v-for="i in 20"
            :key="i"
            class="hero__star"
            :style="{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }"
          ></span>
        </div>
      </div>

      <div class="hero__content">
        <!-- 徽章 -->
        <div class="hero__badge">
          <Sparkles :size="14" />
          <span>困難模式完全攻略</span>
        </div>

        <!-- 標題 -->
        <h1 class="hero__title">
          <span class="hero__title-main">Terraria</span>
          <span class="hero__title-sub">Expert Guide</span>
        </h1>
        <p class="hero__title-zh">泰拉瑞亞完全攻略</p>

        <!-- 副標題 -->
        <p class="hero__subtitle">
          Master Hardmode, defeat bosses, and find the best loot.
        </p>
        <p class="hero__subtitle-zh">征服困難模式，擊敗強敵，獲取最強裝備。</p>

        <!-- CTA 按鈕 -->
        <div class="hero__actions">
          <RouterLink
            :to="`/boss/${BossSlug.THE_TWINS}`"
            class="hero__cta hero__cta--primary"
          >
            <Play :size="20" />
            <span>Start Your Journey</span>
            <span class="hero__cta-zh">開始你的旅程</span>
          </RouterLink>
          <RouterLink to="/weapons" class="hero__cta hero__cta--secondary">
            <Crosshair :size="20" />
            <span>Browse Weapons</span>
          </RouterLink>
        </div>

        <!-- 統計數據 -->
        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-value">6+</span>
            <span class="hero__stat-label">武器攻略</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-value">1</span>
            <span class="hero__stat-label">Boss 指南</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-value">4</span>
            <span class="hero__stat-label">職業支援</span>
          </div>
        </div>
      </div>

      <!-- 裝飾圖片 -->
      <div class="hero__decoration">
        <img
          src="https://terraria.wiki.gg/images/5/55/Retinazer.png"
          alt="Retinazer"
          class="hero__boss-img hero__boss-img--1"
        />
        <img
          src="https://terraria.wiki.gg/images/d/d2/Spazmatism.png"
          alt="Spazmatism"
          class="hero__boss-img hero__boss-img--2"
        />
      </div>
    </section>

    <!-- ========================================
         Section 2: Game Progression Roadmap
         ======================================== -->
    <section class="roadmap-section">
      <div class="section-header">
        <h2 class="section-title">
          <Target :size="24" class="section-title__icon" />
          <span>遊戲進度路線圖</span>
        </h2>
        <p class="section-subtitle">Game Progression Roadmap</p>
      </div>

      <div class="roadmap">
        <div class="roadmap__track"></div>

        <div
          v-for="(stage, index) in progressStages"
          :key="stage.id"
          :class="['roadmap__stage', `roadmap__stage--${stage.status}`]"
        >
          <div class="roadmap__node">
            <span class="roadmap__icon">{{ stage.icon }}</span>
            <div v-if="stage.status === 'current'" class="roadmap__pulse"></div>
          </div>

          <div class="roadmap__content">
            <h3 class="roadmap__title">{{ stage.title }}</h3>
            <p class="roadmap__title-en">{{ stage.titleEn }}</p>
            <p class="roadmap__desc">{{ stage.description }}</p>

            <span v-if="stage.status === 'current'" class="roadmap__badge">
              <Zap :size="12" />
              目前進度
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         Section 3: Category Highlights
         ======================================== -->
    <section class="categories-section">
      <div class="section-header">
        <h2 class="section-title">
          <Crown :size="24" class="section-title__icon" />
          <span>攻略分類</span>
        </h2>
        <p class="section-subtitle">Explore Our Guides</p>
      </div>

      <div class="categories-grid">
        <RouterLink
          v-for="category in categories"
          :key="category.id"
          :to="category.disabled ? '#' : category.link"
          :class="[
            'category-card',
            { 'category-card--disabled': category.disabled },
          ]"
          :style="{ '--category-color': category.color }"
          @click.prevent="category.disabled ? null : undefined"
        >
          <!-- 背景漸層 -->
          <div
            :class="[
              'category-card__bg',
              `bg-gradient-to-br`,
              category.gradient,
            ]"
          ></div>

          <!-- 圖示 -->
          <div class="category-card__icon">
            <component :is="category.icon" :size="32" />
          </div>

          <!-- 內容 -->
          <div class="category-card__content">
            <h3 class="category-card__title">{{ category.title }}</h3>
            <p class="category-card__title-en">{{ category.titleEn }}</p>
            <p class="category-card__desc">{{ category.description }}</p>
          </div>

          <!-- 連結 -->
          <div class="category-card__link">
            <span>{{ category.linkText }}</span>
            <ChevronRight :size="18" />
          </div>

          <!-- 即將推出標籤 -->
          <div v-if="category.disabled" class="category-card__coming-soon">
            <Star :size="14" />
            <span>Coming Soon</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ========================================
         Section 4: Featured Guide
         ======================================== -->
    <section class="featured-section">
      <div class="section-header">
        <h2 class="section-title">
          <Sparkles :size="24" class="section-title__icon" />
          <span>精選指南</span>
        </h2>
        <p class="section-subtitle">Featured Guide</p>
      </div>

      <div class="featured-card">
        <!-- 左側：內容 -->
        <div class="featured-card__content">
          <div class="featured-card__badge">
            <Zap :size="14" />
            <span>最新攻略</span>
          </div>

          <h3 class="featured-card__title">{{ featuredGuide.title }}</h3>
          <p class="featured-card__title-en">{{ featuredGuide.titleEn }}</p>

          <p class="featured-card__desc">{{ featuredGuide.description }}</p>

          <ul class="featured-card__highlights">
            <li
              v-for="(highlight, index) in featuredGuide.highlights"
              :key="index"
            >
              <ChevronRight :size="16" class="featured-card__highlight-icon" />
              <span>{{ highlight }}</span>
            </li>
          </ul>

          <RouterLink :to="featuredGuide.link" class="featured-card__cta">
            <span>閱讀完整攻略</span>
            <ArrowRight :size="20" />
          </RouterLink>
        </div>

        <!-- 右側：圖片 -->
        <div class="featured-card__visual">
          <div class="featured-card__bosses">
            <div class="featured-card__boss featured-card__boss--1">
              <img :src="featuredGuide.image" alt="Retinazer" />
              <span class="featured-card__boss-name">雷光眼</span>
            </div>
            <div class="featured-card__vs">VS</div>
            <div class="featured-card__boss featured-card__boss--2">
              <img :src="featuredGuide.image2" alt="Spazmatism" />
              <span class="featured-card__boss-name">魔燄眼</span>
            </div>
          </div>
          <div class="featured-card__glow"></div>
        </div>
      </div>
    </section>

    <!-- ========================================
         Footer CTA
         ======================================== -->
    <section class="footer-cta">
      <div class="footer-cta__content">
        <h2 class="footer-cta__title">準備好征服困難模式了嗎？</h2>
        <p class="footer-cta__subtitle">選擇你的職業，開始挑戰機械三王！</p>
        <RouterLink to="/weapons" class="footer-cta__button">
          <span>查看推薦武器</span>
          <ArrowRight :size="20" />
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* ==========================================
   Section Header (共用)
   ========================================== */
.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.section-title__icon {
  color: var(--color-primary);
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0.25rem 0 0;
  font-style: italic;
}

/* ==========================================
   Hero Section
   ========================================== */
.hero {
  position: relative;
  min-height: 480px;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
  border-radius: 1.5rem;
  overflow: hidden;
  padding: 3rem;
  display: flex;
  align-items: center;
}

.hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero__bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(99, 102, 241, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.hero__bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.hero__bg-glow--1 {
  top: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  background: #6366f1;
}

.hero__bg-glow--2 {
  bottom: -150px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: #ec4899;
}

.hero__bg-stars {
  position: absolute;
  inset: 0;
}

.hero__star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #a5b4fc;
  margin-bottom: 1.5rem;
}

.hero__title {
  margin: 0;
  line-height: 1.1;
}

.hero__title-main {
  display: block;
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
}

.hero__title-sub {
  display: block;
  font-size: 2.5rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.1em;
}

.hero__title-zh {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0.5rem 0 1.5rem;
  font-weight: 500;
}

.hero__subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.6;
}

.hero__subtitle-zh {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0.25rem 0 2rem;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.hero__cta--primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 20px -4px rgba(99, 102, 241, 0.5);
}

.hero__cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px -4px rgba(99, 102, 241, 0.6);
  color: white;
}

.hero__cta-zh {
  font-size: 0.75rem;
  opacity: 0.8;
  font-weight: 400;
}

.hero__cta--secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.hero__cta--secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.hero__stats {
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.hero__stat {
  display: flex;
  flex-direction: column;
}

.hero__stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
}

.hero__stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero__decoration {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 1rem;
}

.hero__boss-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.5));
  animation: float 4s ease-in-out infinite;
}

.hero__boss-img--1 {
  animation-delay: 0s;
}

.hero__boss-img--2 {
  animation-delay: -2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* ==========================================
   Roadmap Section
   ========================================== */
.roadmap-section {
  background: var(--color-bg-card);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .roadmap-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.roadmap {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  overflow-x: auto;
}

.roadmap__track {
  position: absolute;
  top: 50%;
  left: 2rem;
  right: 2rem;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  transform: translateY(-50%);
}

.roadmap__stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 140px;
  z-index: 1;
}

.roadmap__node {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 3px solid var(--color-border);
  border-radius: 50%;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.roadmap__stage--completed .roadmap__node {
  background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
  border-color: #10b981;
}

.roadmap__stage--current .roadmap__node {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-color: #6366f1;
  transform: scale(1.15);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
}

.roadmap__stage--upcoming .roadmap__node {
  background: var(--color-bg-main);
  opacity: 0.6;
}

.roadmap__pulse {
  position: absolute;
  inset: -8px;
  border: 2px solid #6366f1;
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.roadmap__icon {
  font-size: 1.5rem;
}

.roadmap__stage--current .roadmap__icon,
.roadmap__stage--completed .roadmap__icon {
  filter: brightness(0) invert(1);
}

.roadmap__content {
  text-align: center;
  max-width: 140px;
}

.roadmap__title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.roadmap__stage--upcoming .roadmap__title {
  color: var(--color-text-muted);
}

.roadmap__title-en {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  margin: 0.125rem 0 0.375rem;
  font-style: italic;
}

.roadmap__desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.4;
}

.roadmap__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
  color: white;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ==========================================
   Categories Section
   ========================================== */
.categories-section {
  padding: 0 0.5rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  background: var(--color-bg-card);
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: var(--category-color);
  box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.15);
}

.category-card--disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.category-card--disabled:hover {
  transform: none;
  box-shadow: none;
}

.category-card__bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  opacity: 0.1;
  transform: translate(30%, -30%);
  transition: all 0.3s ease;
}

.category-card:hover .category-card__bg {
  opacity: 0.2;
  transform: translate(20%, -20%) scale(1.2);
}

.category-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(
    135deg,
    var(--category-color),
    var(--category-color)
  );
  border-radius: 0.75rem;
  color: white;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 12px -2px color-mix(in srgb, var(--category-color) 40%, transparent);
}

.category-card__content {
  flex: 1;
}

.category-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.category-card__title-en {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0.125rem 0 0.75rem;
  font-style: italic;
}

.category-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.category-card__link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--category-color);
  transition: gap 0.2s ease;
}

.category-card:hover .category-card__link {
  gap: 0.625rem;
}

.category-card__coming-soon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-main);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ==========================================
   Featured Section
   ========================================== */
.featured-section {
  padding: 0 0.5rem;
}

.featured-card {
  display: flex;
  gap: 2rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
}

.featured-card__content {
  flex: 1;
  color: white;
}

.featured-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(251, 191, 36, 0.2);
  border: 1px solid rgba(251, 191, 36, 0.4);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #fcd34d;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.featured-card__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.featured-card__title-en {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0.25rem 0 1rem;
  font-style: italic;
}

.featured-card__desc {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1.25rem;
  line-height: 1.6;
  max-width: 500px;
}

.featured-card__highlights {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1rem;
}

.featured-card__highlights li {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.75);
}

.featured-card__highlight-icon {
  color: #a5b4fc;
  flex-shrink: 0;
}

.featured-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #312e81;
  text-decoration: none;
  transition: all 0.2s ease;
}

.featured-card__cta:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.2);
  color: #312e81;
}

.featured-card__visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
}

.featured-card__bosses {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.featured-card__boss {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.featured-card__boss img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  image-rendering: pixelated;
  animation: float 3s ease-in-out infinite;
}

.featured-card__boss--1 img {
  animation-delay: 0s;
  filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.6));
}

.featured-card__boss--2 img {
  animation-delay: -1.5s;
  filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.6));
}

.featured-card__boss-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.featured-card__vs {
  font-size: 1.25rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
}

.featured-card__glow {
  position: absolute;
  inset: -50px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.3) 0%,
    transparent 70%
  );
  filter: blur(40px);
}

/* ==========================================
   Footer CTA
   ========================================== */
.footer-cta {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
}

.footer-cta__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.footer-cta__subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 1.5rem;
}

.footer-cta__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: white;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #6366f1;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-cta__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.2);
  color: #6366f1;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 1024px) {
  .hero__decoration {
    display: none;
  }

  .hero__content {
    max-width: 100%;
  }

  .featured-card {
    flex-direction: column;
  }

  .featured-card__visual {
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .home-page {
    gap: 2rem;
  }

  .hero {
    padding: 2rem;
    min-height: auto;
  }

  .hero__title-main {
    font-size: 2.5rem;
  }

  .hero__title-sub {
    font-size: 1.5rem;
  }

  .hero__stats {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .roadmap {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
  }

  .roadmap__track {
    display: none;
  }

  .roadmap__stage {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }

  .roadmap__node {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .roadmap__content {
    text-align: left;
    max-width: none;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .featured-card__highlights {
    grid-template-columns: 1fr;
  }

  .featured-card__bosses {
    transform: scale(0.8);
  }

  .footer-cta {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .hero__actions {
    flex-direction: column;
  }

  .hero__cta {
    justify-content: center;
    width: 100%;
  }
}
</style>
