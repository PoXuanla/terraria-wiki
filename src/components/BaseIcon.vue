<script setup>
import { computed } from 'vue'

/**
 * 通用 Icon 組件
 * 能夠智能判斷並渲染 Lucide 圖示或圖片 URL
 */
const props = defineProps({
  /**
   * Icon 來源
   * - 字串：圖片 URL (包含 http 或 .png/.jpg/.gif/.webp)
   * - 物件：Vue Component (如 Lucide icon)
   */
  icon: {
    type: [String, Object, Function],
    default: null,
  },
  /**
   * Icon 尺寸 (px)
   */
  size: {
    type: [Number, String],
    default: 18,
  },
  /**
   * 替代文字 (用於圖片)
   */
  alt: {
    type: String,
    default: 'icon',
  },
})

// 判斷是否為圖片 URL
const isImageUrl = computed(() => {
  if (typeof props.icon !== 'string') return false
  return (
    props.icon.includes('http') ||
    props.icon.endsWith('.png') ||
    props.icon.endsWith('.jpg') ||
    props.icon.endsWith('.jpeg') ||
    props.icon.endsWith('.gif') ||
    props.icon.endsWith('.webp') ||
    props.icon.endsWith('.svg')
  )
})

// 判斷是否為 Vue Component
const isComponent = computed(() => {
  return typeof props.icon === 'object' || typeof props.icon === 'function'
})

// 計算尺寸樣式
const sizeValue = computed(() => {
  const size = typeof props.size === 'number' ? props.size : parseInt(props.size, 10)
  return `${size}px`
})
</script>

<template>
  <span 
    v-if="icon"
    class="base-icon"
    :style="{ width: sizeValue, height: sizeValue }"
  >
    <!-- 圖片 URL -->
    <img
      v-if="isImageUrl"
      :src="icon"
      :alt="alt"
      class="base-icon__image"
      :style="{ width: sizeValue, height: sizeValue }"
    />
    
    <!-- Vue Component (Lucide Icon) -->
    <component
      v-else-if="isComponent"
      :is="icon"
      :size="size"
      class="base-icon__svg"
    />
  </span>
</template>

<style scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.base-icon__image {
  object-fit: contain;
  image-rendering: pixelated; /* 保持 Pixel Art 的清晰度 */
}

.base-icon__svg {
  display: block;
}
</style>

