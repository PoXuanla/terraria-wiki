<script setup>
import { Swords, Eye } from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import BossDetail from "@/components/boss/BossDetail.vue";
import { theTwins as bossData, getBossSeriesConfig } from "@/data/boss";
import { BossSlug } from "@/data/boss/boss-slug.enum";
import { useTwinsStats } from "@/components/boss/composables/useBossStats";

// 取得當前 Boss 所屬系列配置
const seriesConfig = getBossSeriesConfig(BossSlug.THE_TWINS);

// 屬性數據
const statsCards = useTwinsStats(bossData);
</script>

<template>
  <DocLayout title="目錄">
    <BossDetail
      :boss-data="bossData"
      :current-slug="BossSlug.THE_TWINS"
      :series-config="seriesConfig"
      :stats-cards="statsCards"
      stats-title="雙眼屬性比較"
      :stats-icon="Eye"
      :stats-grid-cols="2"
      :glow-variants="['red', 'green']"
      :watermark-icon="bossData.icons.spazmatism"
      :show-behavior="false"
    >
      <!-- 自定义双图标 -->
      <template #icon>
        <div class="hero__icons">
          <div class="hero__icon-wrapper hero__icon-wrapper--red">
            <div class="hero__icon-glow hero__icon-glow--red"></div>
            <div class="hero__icon-frame">
              <img
                :src="bossData.icons.retinazer"
                alt="Retinazer"
                class="hero__icon-img"
              />
            </div>
          </div>
          <div class="hero__icon-wrapper hero__icon-wrapper--green">
            <div class="hero__icon-glow hero__icon-glow--green"></div>
            <div class="hero__icon-frame">
              <img
                :src="bossData.icons.spazmatism"
                alt="Spazmatism"
                class="hero__icon-img"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- 戰鬥階段自定義區塊（在 Stats 後插入） -->
      <template #after-stats>
        <section class="section-card">
          <h2 id="phases" class="section-heading">
            <span class="section-heading__accent-line"></span>
            <Swords :size="20" class="section-heading__icon" />
            <span class="section-heading__text">戰鬥階段</span>
          </h2>

          <div class="phases-grid">
            <div
              v-for="phaseInfo in bossData.combat.phases"
              :key="phaseInfo.phase"
              :class="['phase-card', `phase-card--${phaseInfo.danger}`]"
            >
              <div class="phase-card__header">
                <span class="phase-card__phase">{{ phaseInfo.phase }}</span>
                <span
                  :class="[
                    'phase-card__danger',
                    `phase-card__danger--${phaseInfo.danger}`,
                  ]"
                >
                  {{ phaseInfo.danger === "high" ? "高危險" : "中等難度" }}
                </span>
              </div>
              <p class="phase-card__desc">{{ phaseInfo.description }}</p>
            </div>
          </div>
        </section>
      </template>
    </BossDetail>
  </DocLayout>
</template>

<style scoped>
/* ==========================================
   Custom Hero Styles for TheTwins
   ========================================== */
/* BOSS 雙圖示 */
.hero__icons {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.hero__icon-wrapper {
  position: relative;
}

.hero__icon-glow {
  position: absolute;
  inset: -15px;
  border-radius: 50%;
  filter: blur(15px);
  animation: icon-glow 3s ease-in-out infinite;
}

.hero__icon-glow--red {
  background: rgba(239, 68, 68, 0.4);
}

.hero__icon-glow--green {
  background: rgba(34, 197, 94, 0.4);
  animation-delay: 1.5s;
}

@keyframes icon-glow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.hero__icon-frame {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
}

.hero__icon-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  image-rendering: pixelated;
}

/* ==========================================
   Combat Phases - 戰鬥階段
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
  gap: 0.625rem;
  margin: 0 0 1.5rem;
}

.section-heading__accent-line {
  width: 3px;
  height: 1.5rem;
  background: linear-gradient(
    180deg,
    rgba(168, 85, 247, 1) 0%,
    rgba(59, 130, 246, 1) 100%
  );
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.6), 0 0 16px rgba(168, 85, 247, 0.3);
  animation: accent-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes accent-pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.6),
      0 0 16px rgba(168, 85, 247, 0.3);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.8),
      0 0 24px rgba(168, 85, 247, 0.4);
  }
}

.section-heading__icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.section-heading__text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
}

.phases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.phase-card {
  padding: 1.25rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-main);
}

.phase-card--medium {
  border-left: 4px solid #f59e0b;
}

.phase-card--high {
  border-left: 4px solid #ef4444;
}

.phase-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.phase-card__phase {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.phase-card__danger {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
}

.phase-card__danger--medium {
  background: #fef3c7;
  color: #92400e;
}

.phase-card__danger--high {
  background: #fee2e2;
  color: #b91c1c;
}

.phase-card__desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 640px) {
  .hero__icons {
    justify-content: center;
  }

  .hero__icon-frame {
    width: 64px;
    height: 64px;
  }

  .hero__icon-img {
    width: 44px;
    height: 44px;
  }

  .phases-grid {
    grid-template-columns: 1fr;
  }
}
</style>
