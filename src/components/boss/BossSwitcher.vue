<script setup lang="ts">
import { useRouter } from "vue-router";

/**
 * Boss 切换器配置项
 */
interface BossSwitcherItem {
  /** Boss 识别码 */
  slug: string;
  /** Boss 名称 */
  name: string;
  /** Boss 英文名 */
  nameEn: string;
  /** Boss 图标 URL */
  icon: string;
  /** 路由路径 */
  route: string;
  /** Glow 颜色 */
  glowColor: string;
}

interface Props {
  /** 当前激活的 Boss slug */
  currentSlug: string;
  /** Boss 切换器配置列表 */
  bosses: BossSwitcherItem[];
  /** 切换器标签文字（可选，不提供则不显示标签） */
  label?: string;
}

const props = defineProps<Props>();
const router = useRouter();

/**
 * 跳转到指定 Boss 页面
 */
const navigateToBoss = (route: string) => {
  router.push(route);
};

/**
 * 判断是否为当前激活的 Boss
 */
const isActive = (slug: string) => {
  return props.currentSlug === slug;
};
</script>

<template>
  <div class="boss-switcher">
    <div v-if="label" class="boss-switcher__label">{{ label }}</div>
    <div class="boss-switcher__icons">
      <button
        v-for="boss in bosses"
        :key="boss.slug"
        :class="[
          'boss-switcher__icon',
          { 'boss-switcher__icon--active': isActive(boss.slug) },
        ]"
        :title="`前往 ${boss.name}`"
        @click="navigateToBoss(boss.route)"
      >
        <!-- Glow 效果 -->
        <div
          v-if="isActive(boss.slug)"
          class="boss-switcher__icon-glow"
          :style="{ background: boss.glowColor }"
        ></div>

        <!-- Boss 图标 -->
        <img
          :src="boss.icon"
          :alt="boss.nameEn"
          class="boss-switcher__icon-img"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.boss-switcher {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.boss-switcher__label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.boss-switcher__icons {
  display: flex;
  gap: 0.5rem;
}

.boss-switcher__icon {
  position: relative;
  width: 48px;
  height: 48px;
  padding: 0;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

/* 非激活状态：变暗 + 灰阶 */
.boss-switcher__icon:not(.boss-switcher__icon--active) {
  opacity: 0.5;
  filter: grayscale(100%);
}

.boss-switcher__icon:not(.boss-switcher__icon--active):hover {
  opacity: 1;
  filter: grayscale(0%);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* 激活状态：彩色 + 发光边框 */
.boss-switcher__icon--active {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(244, 114, 182, 0.4);
}

.boss-switcher__icon-glow {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0.6;
  animation: icon-pulse 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes icon-pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.boss-switcher__icon-img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  padding: 4px;
}

/* 响应式：小屏幕下隐藏文字标签 */
@media (max-width: 640px) {
  .boss-switcher__label {
    display: none;
  }

  .boss-switcher__icon {
    width: 40px;
    height: 40px;
  }
}
</style>
