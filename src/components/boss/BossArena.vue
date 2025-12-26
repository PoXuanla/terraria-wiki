<script setup>
import { ChevronRight, Target } from "lucide-vue-next";

defineProps({
  arenaData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="section-card">
    <h2 id="arena" class="section-heading">
      <span class="section-heading__accent-line"></span>
      <Target :size="20" class="section-heading__icon" />
      <span class="section-heading__text">{{ arenaData.title }}</span>
    </h2>

    <div class="arena-container">
      <!-- 左側：建築規格 -->
      <div class="arena-section arena-architecture">
        <h3 class="arena-section__title">
          <span class="arena-section__icon">{{
            arenaData.architecture.icon
          }}</span>
          <span>{{ arenaData.architecture.subtitle }}</span>
        </h3>

        <ul class="architecture-list">
          <li
            v-for="(spec, index) in arenaData.architecture.specs"
            :key="index"
            class="architecture-item"
          >
            <ChevronRight :size="16" class="architecture-item__icon" />
            <div class="architecture-item__content">
              <span class="architecture-item__text">{{ spec.text }}</span>
              <span
                v-if="spec.highlight"
                class="architecture-highlight"
                :class="`architecture-highlight--${spec.highlight.type}`"
              >
                {{ spec.highlight.value }}
              </span>
              <span v-if="spec.detail" class="architecture-item__detail">
                {{ spec.detail }}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 右側：必備設施 -->
      <div class="arena-section arena-facilities">
        <h3 class="arena-section__title">
          <span class="arena-section__icon">{{
            arenaData.facilities.icon
          }}</span>
          <span>{{ arenaData.facilities.subtitle }}</span>
        </h3>

        <div class="facilities-grid">
          <div
            v-for="(facility, index) in arenaData.facilities.items"
            :key="index"
            class="facility-card"
          >
            <div class="facility-card__icon-wrapper">
              <img
                :src="facility.icon"
                :alt="facility.name"
                class="facility-card__icon"
              />
            </div>
            <div class="facility-card__content">
              <h4 class="facility-card__name">{{ facility.name }}</h4>
              <p class="facility-card__effect">
                <span class="facility-card__effect-icon">{{
                  facility.effectIcon
                }}</span>
                <span>{{ facility.effect }}</span>
              </p>
              <p class="facility-card__buff">{{ facility.buff }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   Section Heading - 標題樣式
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
   Arena Section - 場地準備
   ========================================== */
.arena-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .arena-container {
    grid-template-columns: 1fr;
  }
}

.arena-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.arena-section:hover {
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.05);
}

.arena-section__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(96, 165, 250, 0.2);
}

.arena-section__icon {
  font-size: 1.25rem;
}

/* 建築規格列表 */
.architecture-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.architecture-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.architecture-item:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateX(4px);
}

.architecture-item__icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: #60a5fa;
}

.architecture-item__content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  line-height: 1.5;
}

.architecture-item__text {
  color: rgba(255, 255, 255, 0.9);
}

.architecture-highlight {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1.05em;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: white;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
}

.architecture-highlight--layers {
  background: linear-gradient(135deg, #10b981, #047857);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
}

.architecture-highlight--length {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}

.architecture-highlight--height {
  background: linear-gradient(135deg, #a855f7, #7e22ce);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
}

.architecture-item__detail {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9em;
}

/* 必備設施網格 */
.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.facility-card {
  /* 深色底座效果 */
  background: linear-gradient(
    145deg,
    rgba(10, 15, 30, 0.9),
    rgba(20, 25, 40, 0.85)
  );
  border: 2px solid rgba(96, 165, 250, 0.15);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  
  /* 内凹陰影效果（底座感） */
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.6),
    inset 0 -1px 2px rgba(255, 255, 255, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.3);
  
  /* 激活状态的能量辉光 */
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(
      135deg,
      rgba(59, 130, 246, 0.6),
      rgba(147, 51, 234, 0.6),
      rgba(236, 72, 153, 0.6)
    );
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: glow-rotate 3s linear infinite;
  }
  
  /* 裝備插槽角落裝飾 */
  &::after {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(96, 165, 250, 0.1);
    border-radius: 8px;
    pointer-events: none;
  }
}

@keyframes glow-rotate {
  0% {
    filter: hue-rotate(0deg) brightness(1);
  }
  50% {
    filter: hue-rotate(30deg) brightness(1.2);
  }
  100% {
    filter: hue-rotate(0deg) brightness(1);
  }
}

.facility-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(59, 130, 246, 0.6);
  
  /* 激活時的外發光 */
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.6),
    inset 0 -1px 2px rgba(59, 130, 246, 0.15),
    0 0 20px rgba(59, 130, 246, 0.4),
    0 0 40px rgba(59, 130, 246, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.4);
  
  background: linear-gradient(
    145deg,
    rgba(15, 30, 60, 0.95),
    rgba(25, 40, 70, 0.9)
  );
  
  /* 顯示能量輝光邊框 */
  &::before {
    opacity: 1;
  }
}

.facility-card__icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-bottom: 0.75rem;
  position: relative;
  
  /* 裝備插槽的內框 */
  &::before {
    content: '';
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 8px;
    background: radial-gradient(
      circle at center,
      rgba(59, 130, 246, 0.08),
      transparent 70%
    );
    border: 1px solid rgba(59, 130, 246, 0.15);
    box-shadow: 
      inset 0 2px 4px rgba(0, 0, 0, 0.4),
      0 1px 2px rgba(59, 130, 246, 0.1);
  }
}

.facility-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  position: relative;
  z-index: 1;
  filter: 
    drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))
    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.facility-card:hover .facility-card__icon {
  filter: 
    drop-shadow(0 0 16px rgba(59, 130, 246, 0.8))
    drop-shadow(0 0 24px rgba(147, 51, 234, 0.4))
    drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8));
  transform: scale(1.15) translateY(-2px);
  animation: icon-pulse 1.5s ease-in-out infinite;
}

@keyframes icon-pulse {
  0%, 100% {
    filter: 
      drop-shadow(0 0 16px rgba(59, 130, 246, 0.8))
      drop-shadow(0 0 24px rgba(147, 51, 234, 0.4))
      drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8));
  }
  50% {
    filter: 
      drop-shadow(0 0 20px rgba(59, 130, 246, 1))
      drop-shadow(0 0 32px rgba(147, 51, 234, 0.6))
      drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8));
  }
}

.facility-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  position: relative;
  z-index: 1;
}

.facility-card__name {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
}

.facility-card:hover .facility-card__name {
  color: #60a5fa;
  text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
}

.facility-card__effect {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.facility-card__effect-icon {
  font-size: 1rem;
}

.facility-card__buff {
  font-size: 0.75rem;
  color: #10b981;
  font-weight: 700;
  margin: 0;
  padding: 0.25rem 0.5rem;
  background: rgba(16, 185, 129, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  box-shadow: 
    inset 0 1px 2px rgba(16, 185, 129, 0.2),
    0 0 8px rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;
}

.facility-card:hover .facility-card__buff {
  background: rgba(16, 185, 129, 0.25);
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 
    inset 0 1px 2px rgba(16, 185, 129, 0.3),
    0 0 12px rgba(16, 185, 129, 0.4);
}
</style>

