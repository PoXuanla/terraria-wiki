<script setup>
import { Skull } from "lucide-vue-next";
import DocLayout from "@/layouts/DocLayout.vue";
import BossDetail from "@/components/boss/BossDetail.vue";
import { skeletronPrime as bossData, getBossSeriesConfig } from "@/data/boss";
import { BossSlug } from "@/data/boss/boss-slug.enum";
import { useSkeletronPrimeStats } from "@/components/boss/composables/useBossStats";

// 取得當前 Boss 所屬系列配置
const seriesConfig = getBossSeriesConfig(BossSlug.SKELETRON_PRIME);

// 屬性數據
const statsCards = useSkeletronPrimeStats(bossData);
</script>

<template>
  <DocLayout title="目錄">
    <BossDetail
      :boss-data="bossData"
      :current-slug="BossSlug.SKELETRON_PRIME"
      :series-config="seriesConfig"
      :stats-cards="statsCards"
      stats-title="各部位屬性"
      :stats-icon="Skull"
      :stats-grid-cols="3"
    >
      <template #extra-badges>
        <span class="badge badge--danger">⚠️ 高難度</span>
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

.badge--danger {
  background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
  color: white;
}
</style>
