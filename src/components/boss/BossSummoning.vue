<script setup lang="ts">
import { Moon } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import type { BossSummoning, SummoningRecipeItem } from "@/data/boss/types";

interface Props {
  summoning: BossSummoning;
}

const props = defineProps<Props>();

// 追踪哪些素材需要切换显示替代图标
const showAlternativeMap = ref<Map<number, boolean>>(new Map());

// 初始化并启动切换定时器
onMounted(() => {
  props.summoning.recipe.forEach((ingredient, index) => {
    if (ingredient.alternativeIcon) {
      showAlternativeMap.value.set(index, false);

      // 每个有替代图标的素材独立切换，错开时间
      setInterval(() => {
        showAlternativeMap.value.set(
          index,
          !showAlternativeMap.value.get(index)
        );
      }, 2000 + index * 500); // 错开 500ms
    }
  });
});

// 获取当前应显示的图标
const getDisplayIcon = (
  ingredient: SummoningRecipeItem,
  index: number
): string => {
  if (!ingredient.alternativeIcon) {
    return ingredient.icon;
  }
  return showAlternativeMap.value.get(index)
    ? ingredient.alternativeIcon
    : ingredient.icon;
};
</script>

<template>
  <section class="section-card section-card--ambient">
    <!-- 极光/烟雾背景层 -->
    <div class="ambient-mesh">
      <div class="ambient-mesh__blob ambient-mesh__blob--1"></div>
      <div class="ambient-mesh__blob ambient-mesh__blob--2"></div>
    </div>
    
    <!-- 噪点材质层 -->
    <div class="noise-overlay"></div>

    <h2 id="summoning" class="section-heading">
      <span class="section-heading__accent-line"></span>
      <Moon :size="20" class="section-heading__icon" />
      <span class="section-heading__text">召喚方式</span>
    </h2>

    <!-- 制作流程图：横向布局 -->
    <div class="crafting-flow">
      <!-- 左侧：素材槽区 -->
      <div class="crafting-flow__materials">
        <div class="materials-label">所需素材</div>
        <div class="materials-grid">
          <div
            v-for="(ingredient, index) in summoning.recipe"
            :key="ingredient.name"
            class="material-slot"
          >
            <div class="material-slot__icon-wrapper">
              <!-- 淡入淡出切换动画 -->
              <Transition name="fade" mode="out-in">
                <img
                  :key="getDisplayIcon(ingredient, index)"
                  :src="getDisplayIcon(ingredient, index)"
                  :alt="ingredient.name"
                  class="material-slot__icon"
                />
              </Transition>
              <span class="material-slot__amount">{{ ingredient.amount }}</span>
            </div>

            <!-- 名称 + "或"标记 -->
            <div class="material-slot__name-wrapper">
              <template
                v-if="
                  ingredient.alternativeIcon && ingredient.name.includes('/')
                "
              >
                <!-- 分割名称并在中间插入"或"徽章 -->
                <span class="material-slot__name">{{
                  ingredient.name.split("/")[0]
                }}</span>
                <span class="material-slot__or-badge">或</span>
                <span class="material-slot__name">{{
                  ingredient.name.split("/")[1]
                }}</span>
              </template>
              <template v-else>
                <span class="material-slot__name">{{ ingredient.name }}</span>
              </template>
            </div>

            <!-- Tooltip 说明 -->
            <div v-if="ingredient.tooltip" class="material-slot__tooltip">
              {{ ingredient.tooltip }}
            </div>
          </div>
        </div>
      </div>

      <!-- 连接符：素材 + 工作台 -->
      <div class="crafting-flow__connector">
        <span class="connector-plus">+</span>
      </div>

      <!-- 中央：制作站能量枢纽 -->
      <div class="crafting-flow__station">
        <!-- 深色金属容器 + 蓝紫色发光边框 -->
        <div class="station-container">
          <div class="station-container__icon-wrapper">
            <img
              v-if="summoning.craftStationIcon"
              :src="summoning.craftStationIcon"
              :alt="summoning.craftStation"
              class="station-container__icon"
            />
            <span v-else class="station-container__emoji">🔨</span>
          </div>
          <span class="station-container__name">{{
            summoning.craftStation
          }}</span>

          <!-- 从容器右侧流出的能量箭头 -->
          <div class="energy-arrow">
            <div class="energy-arrow__glow"></div>
            <div class="energy-arrow__head"></div>
          </div>
        </div>
      </div>

      <!-- 右侧：成品 + 使用条件 -->
      <div class="crafting-flow__result">
        <div class="result-card">
          <div class="result-card__icon-wrapper">
            <img
              :src="summoning.itemIcon"
              :alt="summoning.item"
              class="result-card__icon"
            />
          </div>
          <div class="result-card__info">
            <span class="result-card__name">{{ summoning.item }}</span>
            <span class="result-card__name-en">{{ summoning.itemEn }}</span>
            <!-- 使用条件标签 -->
            <div class="result-card__condition">
              <Moon :size="14" />
              <span>{{ summoning.timeRestriction }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   Section Card with Ambient Background
   ========================================== */
.section-card--ambient {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* 极光/烟雾背景 - Ambient Mesh Gradient */
.ambient-mesh {
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: 0.15;
  pointer-events: none;
}

.ambient-mesh__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  mix-blend-mode: screen;
}

.ambient-mesh__blob--1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -150px;
  background: radial-gradient(
    circle,
    rgba(220, 38, 38, 0.4) 0%,
    rgba(185, 28, 28, 0.2) 50%,
    transparent 70%
  );
  animation: ambient-float-1 20s ease-in-out infinite;
}

.ambient-mesh__blob--2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  left: -100px;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.3) 0%,
    rgba(22, 163, 74, 0.15) 50%,
    transparent 70%
  );
  animation: ambient-float-2 25s ease-in-out infinite;
}

@keyframes ambient-float-1 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.15;
  }
  33% {
    transform: translate(-30px, 40px) rotate(120deg);
    opacity: 0.12;
  }
  66% {
    transform: translate(40px, -30px) rotate(240deg);
    opacity: 0.18;
  }
}

@keyframes ambient-float-2 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.12;
  }
  40% {
    transform: translate(50px, -40px) rotate(-140deg);
    opacity: 0.15;
  }
  80% {
    transform: translate(-40px, 30px) rotate(-280deg);
    opacity: 0.1;
  }
}

/* 噪点材质层 - Noise Texture */
.noise-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  background-repeat: repeat;
  mix-blend-mode: overlay;
}

/* ==========================================
   Section Heading - 区块标题
   ========================================== */
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

/* ==========================================
   Crafting Flow - 制作流程图
   ========================================== */
.crafting-flow {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-main);
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
}

/* 左侧：素材槽区 */
.crafting-flow__materials {
  flex: 1;
  min-width: 0;
}

.materials-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.material-slot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.material-slot:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.material-slot__icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
  border-radius: 0.375rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.material-slot__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
}

.material-slot__amount {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: var(--color-primary);
  color: white;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 名称 + "或"标记 */
.material-slot__name-wrapper {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  justify-content: center;
}

.material-slot__name {
  font-size: 0.75rem;
  color: var(--color-text-primary);
  text-align: center;
  line-height: 1.2;
}

.material-slot__or-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 0.25rem;
  
  /* 幽灵样式 - 更透明的背景 + 有色边框，融入科技感 */
  background: rgba(245, 158, 11, 0.08);
  color: #fbbf24;
  border: 1.5px solid rgba(245, 158, 11, 0.5);
  
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: 0.25rem;
  
  /* 极柔和的光晕，不抢戏 */
  box-shadow: 
    0 0 6px rgba(245, 158, 11, 0.12),
    inset 0 0 6px rgba(245, 158, 11, 0.06);
}

/* Tooltip */
.material-slot__tooltip {
  position: absolute;
  bottom: calc(100% + 0.75rem);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  font-size: 0.6875rem;
  line-height: 1.4;
  border-radius: 0.375rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.material-slot__tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.95);
}

.material-slot:hover .material-slot__tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Fade 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 连接符：素材 + 工作台 */
.crafting-flow__connector {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 0.5rem;
}

.connector-plus {
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--color-text-secondary);
  opacity: 0.3;
  user-select: none;
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
}

/* 中央：制作站能量枢纽 */
.crafting-flow__station {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 1.5rem;
}

/* 深色金属容器 + 发光边框 - 配角定位，克制的光晕 */
.station-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;

  /* 深色金属质感背景 */
  background: linear-gradient(135deg, #1e1b2e 0%, #2d2640 50%, #1a1a2e 100%);

  /* 发光的蓝紫色边框 - 更弱的光晕，配角定位 */
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 0.75rem;
  box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.15),
    0 0 6px rgba(139, 92, 246, 0.08), 0 8px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);

  /* 细微金属纹理 */
  position: relative;
  overflow: visible;
}

/* 脉冲发光动画 - 配角级别，更低调 */
.station-container::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 0.75rem;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.2),
    rgba(59, 130, 246, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: pulse-border 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse-border {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

.station-container__icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
}

.station-container__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.4));
}

.station-container__emoji {
  font-size: 1.75rem;
  filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.4));
}

.station-container__name {
  font-size: 0.75rem;
  font-weight: 700;
  color: #e9d5ff;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(139, 92, 246, 0.6);
}

/* 从容器右侧流出的能量箭头 - 进阶能量流 */
.energy-arrow {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 6px;
  display: flex;
  align-items: center;
}

.energy-arrow__glow {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  
  /* 多层次渐层 - 从素材色到成品色 */
  background: linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.6) 0%,
    rgba(139, 92, 246, 0.8) 30%,
    rgba(168, 85, 247, 0.95) 70%,
    rgba(220, 38, 38, 1) 100%
  );
  
  /* 多重光晕 */
  box-shadow: 
    0 0 8px rgba(139, 92, 246, 0.8),
    0 0 16px rgba(139, 92, 246, 0.5),
    0 0 24px rgba(168, 85, 247, 0.3);
  
  /* 让整条线有呼吸感 */
  animation: energy-pulse 2s ease-in-out infinite;
}

@keyframes energy-pulse {
  0%, 100% {
    opacity: 0.8;
    box-shadow: 
      0 0 8px rgba(139, 92, 246, 0.8),
      0 0 16px rgba(139, 92, 246, 0.5),
      0 0 24px rgba(168, 85, 247, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 
      0 0 12px rgba(139, 92, 246, 1),
      0 0 24px rgba(139, 92, 246, 0.7),
      0 0 36px rgba(168, 85, 247, 0.5);
  }
}

/* 能量流动动画 - 更明显的粒子流 */
.energy-arrow__glow::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 30%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.4) 70%,
    transparent 100%
  );
  animation: energy-flow 2s ease-in-out infinite;
}

@keyframes energy-flow {
  to {
    left: 140%;
  }
}

/* 渐层色箭头头部 */
.energy-arrow__head {
  width: 0;
  height: 0;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-left: 16px solid rgba(220, 38, 38, 0.95);
  margin-left: -1px;
  filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.9)) 
          drop-shadow(0 0 20px rgba(168, 85, 247, 0.5));
  animation: arrow-glow 2s ease-in-out infinite;
}

@keyframes arrow-glow {
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.9)) 
            drop-shadow(0 0 20px rgba(168, 85, 247, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 14px rgba(220, 38, 38, 1)) 
            drop-shadow(0 0 28px rgba(168, 85, 247, 0.7));
  }
}

/* 右侧：成品区 - 稀有度光环 */
.crafting-flow__result {
  flex: 1;
  min-width: 0;
  position: relative;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  position: relative;
  
  /* 深色金属质感背景 */
  background: linear-gradient(
    135deg,
    rgba(30, 27, 46, 0.9) 0%,
    rgba(45, 38, 64, 0.8) 50%,
    rgba(26, 26, 46, 0.9) 100%
  );
  
  border: 2px solid transparent;
  border-radius: 0.75rem;
  
  /* 多层次阴影 - 营造深度 + 强化内发光（主角定位） */
  box-shadow: 
    0 0 0 1px rgba(168, 85, 247, 0.4),
    0 4px 16px rgba(0, 0, 0, 0.4),
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    /* 内发光 - 凹槽透出的能量感（加强） */
    inset 0 0 24px rgba(168, 85, 247, 0.25),
    inset 0 0 48px rgba(220, 38, 38, 0.15),
    inset 0 0 80px rgba(220, 38, 38, 0.08);
}

/* 呼吸光晕效果 */
.result-card::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 0.75rem;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.6),
    rgba(220, 38, 38, 0.7),
    rgba(34, 197, 94, 0.5),
    rgba(168, 85, 247, 0.6)
  );
  background-size: 200% 200%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: breathing-glow 4s ease-in-out infinite, gradient-shift 8s linear infinite;
  pointer-events: none;
  z-index: -1;
}

/* 外部光晕 - 呼吸阴影 */
.result-card::after {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 1rem;
  background: radial-gradient(
    circle at center,
    rgba(168, 85, 247, 0.25) 0%,
    rgba(220, 38, 38, 0.15) 50%,
    transparent 70%
  );
  filter: blur(12px);
  animation: breathing-shadow 4s ease-in-out infinite;
  pointer-events: none;
  z-index: -2;
}

@keyframes breathing-glow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes breathing-shadow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.result-card__icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border-radius: 0.5rem;
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 16px rgba(168, 85, 247, 0.15);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.result-card__icon {
  width: 56px;
  height: 56px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 8px rgba(168, 85, 247, 0.3));
}

.result-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.result-card__name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.result-card__name-en {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.result-card__condition {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.5rem;
  padding: 0.375rem 0.625rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 0.375rem;
  color: #c4b5fd;
  font-size: 0.75rem;
  font-weight: 500;
  width: fit-content;
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 768px) {
  .crafting-flow {
    flex-direction: column;
    gap: 1.5rem;
  }

  .materials-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .crafting-flow__connector {
    padding: 0;
  }

  .connector-plus {
    transform: rotate(90deg);
  }

  .crafting-flow__station {
    padding: 0;
    width: 100%;
    justify-content: center;
  }

  .station-container {
    margin: 0 auto;
  }

  .energy-arrow {
    right: auto;
    left: 50%;
    top: auto;
    bottom: -40px;
    transform: translateX(-50%) rotate(90deg);
  }
}

@media (max-width: 480px) {
  .materials-grid {
    grid-template-columns: 1fr;
  }

  .result-card {
    flex-direction: column;
    text-align: center;
  }

  .result-card__info {
    align-items: center;
  }

  .result-card__condition {
    margin-top: 0.75rem;
  }
}
</style>
