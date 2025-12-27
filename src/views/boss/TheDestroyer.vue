<script setup>
import { Bug } from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import BossDetail from "@/components/boss/BossDetail.vue";
import { theDestroyer as bossData, getBossSeriesConfig } from "@/data/boss";
import { BossSlug } from "@/data/boss/boss-slug.enum";
import { useDestroyerStats } from "@/components/boss/composables/useBossStats";

// 取得當前 Boss 所屬系列配置
const seriesConfig = getBossSeriesConfig(BossSlug.THE_DESTROYER);

// 屬性數據
const statsCards = useDestroyerStats(bossData);
</script>

<template>
  <DocLayout title="目錄">
    <BossDetail
      :boss-data="bossData"
      :current-slug="BossSlug.THE_DESTROYER"
      :series-config="seriesConfig"
      :stats-cards="statsCards"
      stats-title="屬性數據"
      :stats-icon="Bug"
      :stats-grid-cols="2"
      :glow-variants="['red']"
      :watermark-horizontal="true"
    >
      <template #extra-badges>
        <span class="badge badge--easy">✅ 最易擊敗</span>
      </template>
    </BossDetail>
  </DocLayout>
</template>

<style scoped>
/* ==========================================
   Badge Styles (for extra-badges slot)
   ========================================== */
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

.badge--easy {
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
  color: white;
}
</style>
