<script setup>
import { computed } from "vue";
import BossHero from "@/components/boss/BossHero.vue";
import BossSummoning from "@/components/boss/BossSummoning.vue";
import BossArena from "@/components/boss/BossArena.vue";
import BossSwitcher from "@/components/boss/BossSwitcher.vue";
import BossStatsSection from "@/components/boss/BossStatsSection.vue";
import BossBehavior from "@/components/boss/BossBehavior.vue";
import StrategyHighlight from "@/components/boss/StrategyHighlight.vue";
import BossEquipment from "@/components/boss/BossEquipment.vue";
import BossDrops from "@/components/boss/BossDrops.vue";

const props = defineProps({
  // ==================== 必需數據 ====================
  // Boss 數據
  bossData: {
    type: Object,
    required: true,
  },
  // 當前 Boss slug
  currentSlug: {
    type: String,
    required: true,
  },

  // ==================== 可選配置 ====================
  // 系列配置
  seriesConfig: {
    type: Object,
    default: null,
  },

  // ==================== Stats Section ====================
  // 屬性卡片數據
  statsCards: {
    type: Array,
    default: () => [],
  },
  // Stats Section 標題
  statsTitle: {
    type: String,
    default: "屬性數據",
  },
  // Stats Section Icon
  statsIcon: {
    type: Object,
    default: null,
  },
  // Stats Section Grid Columns
  statsGridCols: {
    type: Number,
    default: 2,
  },

  // ==================== Hero Section ====================
  // Hero 發光顏色變體
  glowVariants: {
    type: Array,
    default: undefined,
  },

  // ==================== Strategy Section ====================
  // 水印圖示（用於 StrategyHighlight）
  watermarkIcon: {
    type: String,
    default: undefined,
  },
  // 水印是否橫向
  watermarkHorizontal: {
    type: Boolean,
    default: false,
  },

  // ==================== 區塊顯示控制 ====================
  // 是否顯示 Summoning Section
  showSummoning: {
    type: Boolean,
    default: true,
  },
  // 是否顯示 Arena Section
  showArena: {
    type: Boolean,
    default: true,
  },
  // 是否顯示 Stats Section
  showStats: {
    type: Boolean,
    default: true,
  },
  // 是否顯示 Behavior Section
  showBehavior: {
    type: Boolean,
    default: true,
  },
  // 是否顯示 Strategy Section
  showStrategy: {
    type: Boolean,
    default: true,
  },
  // 是否顯示 Equipment Section
  showEquipment: {
    type: Boolean,
    default: true,
  },
  // 是否顯示 Drops Section
  showDrops: {
    type: Boolean,
    default: true,
  },
});

// 計算水印圖示，優先使用 prop，否則使用 bossData.icon
const computedWatermarkIcon = computed(() => {
  return props.watermarkIcon !== undefined
    ? props.watermarkIcon
    : props.bossData.icon;
});
</script>

<template>
  <div class="boss-page">
    <!-- ========================================
         Hero Section - 頂部展示區
         支援 slots: icon, extra-badges
         ======================================== -->
    <slot name="custom-hero">
      <BossHero :boss-data="bossData" :glow-variants="glowVariants">
        <!-- 自定義圖示 slot（如 TheTwins 的雙圖示） -->
        <template v-if="$slots.icon" #icon>
          <slot name="icon" />
        </template>

        <!-- 額外徽章 slot -->
        <template v-if="$slots['extra-badges']" #extra-badges>
          <slot name="extra-badges" />
        </template>

        <!-- 右上角切換器 -->
        <template v-if="seriesConfig" #switcher>
          <BossSwitcher
            :current-slug="currentSlug"
            :bosses="seriesConfig.bosses"
            :label="seriesConfig.label"
          />
        </template>
      </BossHero>
    </slot>

    <!-- 在 Hero 後插入自定義內容 -->
    <slot name="after-hero" />

    <!-- ========================================
         Summoning Section - 召喚方式
         ======================================== -->
    <slot name="custom-summoning">
      <BossSummoning v-if="showSummoning" :summoning="bossData.summoning" />
    </slot>

    <!-- 在 Summoning 後插入自定義內容 -->
    <slot name="after-summoning" />

    <!-- ========================================
         Arena Section - 場地準備
         ======================================== -->
    <slot name="custom-arena">
      <BossArena v-if="showArena" :arena-data="bossData.combat.arena" />
    </slot>

    <!-- 在 Arena 後插入自定義內容 -->
    <slot name="after-arena" />

    <!-- ========================================
         Stats Section - 屬性數據
         ======================================== -->
    <slot name="custom-stats">
      <BossStatsSection
        v-if="showStats && statsCards.length > 0"
        :title="statsTitle"
        :icon="statsIcon"
        :cards="statsCards"
        :grid-cols="statsGridCols"
        :warning="bossData.statsWarning"
      />
    </slot>

    <!-- 在 Stats 後插入自定義內容（推薦用於特殊區塊如 phases） -->
    <slot name="after-stats" />

    <!-- ========================================
         自定義內容區域（向後兼容，推薦使用 after-stats）
         ======================================== -->
    <slot name="custom-sections" />

    <!-- ========================================
         Behavior Section - 行為模式
         ======================================== -->
    <slot name="custom-behavior">
      <BossBehavior
        v-if="showBehavior && bossData.combat.behavior"
        :behaviors="bossData.combat.behavior"
      />
    </slot>

    <!-- 在 Behavior 後插入自定義內容 -->
    <slot name="after-behavior" />

    <!-- ========================================
         Core Strategy - 核心戰術
         ======================================== -->
    <slot name="custom-strategy">
      <StrategyHighlight
        v-if="showStrategy"
        :core-strategy="bossData.combat.coreStrategy"
        :watermark-icon="computedWatermarkIcon"
        :watermark-horizontal="watermarkHorizontal"
      />
    </slot>

    <!-- 在 Strategy 後插入自定義內容 -->
    <slot name="after-strategy" />

    <!-- ========================================
         Equipment Section - 推薦裝備
         ======================================== -->
    <slot name="custom-equipment">
      <BossEquipment v-if="showEquipment" :equipment="bossData.equipment" />
    </slot>

    <!-- 在 Equipment 後插入自定義內容 -->
    <slot name="after-equipment" />

    <!-- ========================================
         Drops Section - 掉落物
         ======================================== -->
    <slot name="custom-drops">
      <BossDrops v-if="showDrops" :drops="bossData.drops" />
    </slot>

    <!-- 在 Drops 後插入自定義內容 -->
    <slot name="after-drops" />
  </div>
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
:deep(#summoning),
:deep(#arena),
:deep(#stats),
:deep(#behavior),
:deep(#phases),
:deep(#strategy),
:deep(#equipment),
:deep(#drops) {
  scroll-margin-top: 6rem;
}
</style>

