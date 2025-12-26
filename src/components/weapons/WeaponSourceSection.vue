<script setup lang="ts">
import { Package } from 'lucide-vue-next'
import WeaponSourceItem from './WeaponSourceItem.vue'
import type { WeaponSource } from '@/data/weapons/types'

/**
 * WeaponSourceSection - 取得方式區塊
 * 
 * 包含標題、容器與多個來源卡片
 */

interface ResultInfo {
  icon: string
  name: string
}

interface Props {
  /** 取得方式陣列 */
  sources: WeaponSource[]
  /** 成品資訊 { icon, name } */
  result: ResultInfo
}

defineProps<Props>()
</script>

<template>
  <section class="section-card">
    <h2 id="source" class="section-heading">
      <Package :size="20" class="section-heading__icon" />
      <span>取得方式</span>
    </h2>
    
    <div class="source-list">
      <template v-for="(source, index) in sources" :key="index">
        <WeaponSourceItem :source="source" :result="result" />
        
        <!-- 分隔線（非最後一個時顯示） -->
        <div v-if="index < sources.length - 1" class="source-divider">
          <span>或</span>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
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
  scroll-margin-top: 6rem;
}

.section-heading__icon {
  color: var(--color-primary);
}

.source-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.source-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0;
  position: relative;
}

.source-divider::before,
.source-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.source-divider span {
  padding: 0 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>

