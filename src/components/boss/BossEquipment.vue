<script setup>
import { ref } from "vue";
import { Crosshair, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  equipment: {
    type: Object,
    required: true,
  },
});

// 當前選中的職業 Tab
const activeClassTab = ref("ranger");
</script>

<template>
  <section class="section-card">
    <h2 id="equipment" class="section-heading">
      <span class="section-heading__accent-line"></span>
      <Crosshair :size="20" class="section-heading__icon" />
      <span class="section-heading__text">推薦裝備</span>
    </h2>

    <!-- 職業 Tabs -->
    <h3 class="subsection-title">🗡️ 職業武器推薦</h3>

    <div class="class-tabs">
      <button
        v-for="tab in equipment.classTabs"
        :key="tab.id"
        :class="[
          'class-tab',
          { 'class-tab--active': activeClassTab === tab.id },
        ]"
        :style="{ '--tab-color': tab.color }"
        @click="activeClassTab = tab.id"
      >
        <span class="class-tab__icon">{{ tab.icon }}</span>
        <span class="class-tab__name">{{ tab.name }}</span>
        <span class="class-tab__name-en">{{ tab.nameEn }}</span>
      </button>
    </div>

    <!-- 職業武器列表 -->
    <div :key="activeClassTab" class="equipment-grid">
      <RouterLink
        v-for="(weapon, index) in equipment.classWeapons[activeClassTab]"
        :key="weapon.name"
        :to="weapon.route"
        :class="[
          'equipment-card',
          'equipment-card--clickable',
          'equipment-card--stagger-in',
          { 'equipment-card--has-page': weapon.hasPage },
          { 'equipment-card--highlight': weapon.highlight },
        ]"
        :style="{ '--stagger-index': index }"
      >
        <img
          :src="weapon.icon"
          :alt="weapon.name"
          class="equipment-card__icon"
        />
        <div class="equipment-card__content">
          <span class="equipment-card__name">
            {{ weapon.name }}
            <small>({{ weapon.nameEn }})</small>
            <span v-if="weapon.highlight" class="equipment-card__star"
              >⭐ 推薦</span
            >
          </span>
          <span class="equipment-card__ammo">{{
            weapon.ammo === "無" ? "無消耗" : `消耗：${weapon.ammo}`
          }}</span>
          <p class="equipment-card__desc">{{ weapon.description }}</p>
        </div>
        <div class="equipment-card__link-indicator">
          <span v-if="weapon.hasPage" class="equipment-card__view-link">
            查看詳情
            <ChevronRight :size="14" />
          </span>
          <span v-else class="equipment-card__coming-soon">即將推出</span>
        </div>
      </RouterLink>
    </div>

    <!-- 飾品推薦 -->
    <h3 class="subsection-title subsection-title--stagger">💍 飾品</h3>
    <div class="equipment-grid equipment-grid--accessories">
      <div
        v-for="(accessory, index) in equipment.accessories"
        :key="accessory.name"
        class="equipment-card equipment-card--compact equipment-card--stagger-in"
        :style="{ '--stagger-index': index }"
      >
        <img
          :src="accessory.icon"
          :alt="accessory.name"
          class="equipment-card__icon"
        />
        <div class="equipment-card__content">
          <span class="equipment-card__name">{{ accessory.name }}</span>
          <p class="equipment-card__desc">{{ accessory.description }}</p>
        </div>
      </div>
    </div>

    <!-- 護甲 -->
    <h3 class="subsection-title subsection-title--stagger">🛡️ 護甲</h3>
    <div class="armor-card armor-card--stagger-in">
      <img
        :src="equipment.armor.icon"
        :alt="equipment.armor.name"
        class="armor-card__icon"
      />
      <div class="armor-card__content">
        <span class="armor-card__name">
          {{ equipment.armor.name }}
          <small>({{ equipment.armor.nameEn }})</small>
        </span>
        <p class="armor-card__desc">
          {{ equipment.armor.description }}
        </p>
      </div>
    </div>

    <!-- Buff 藥水 -->
    <h3 class="subsection-title subsection-title--stagger">🧪 推薦 Buff</h3>
    <div class="buffs-list">
      <span
        v-for="(buff, index) in equipment.buffs"
        :key="buff"
        class="buff-tag buff-tag--stagger-in"
        :style="{ '--stagger-index': index }"
      >
        {{ buff }}
      </span>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   通用區塊樣式 - 深度空間設計
   ========================================== */
.section-card {
  background: rgba(22, 24, 29, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.section-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(168, 85, 247, 0.3) 50%,
    transparent
  );
}

:global(.dark) .section-card {
  background: rgba(10, 11, 16, 0.8);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 2rem;
}

.section-heading__accent-line {
  width: 3px;
  height: 1.75rem;
  background: linear-gradient(
    180deg,
    rgba(168, 85, 247, 0.8) 0%,
    rgba(59, 130, 246, 0.6) 100%
  );
  border-radius: 2px;
  box-shadow: 
    0 0 12px rgba(168, 85, 247, 0.4),
    0 0 24px rgba(168, 85, 247, 0.2);
  animation: accent-pulse 3s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes accent-pulse {
  0%, 100% {
    opacity: 0.8;
    box-shadow: 
      0 0 12px rgba(168, 85, 247, 0.4),
      0 0 24px rgba(168, 85, 247, 0.2);
  }
  50% {
    opacity: 1;
    box-shadow: 
      0 0 16px rgba(168, 85, 247, 0.6),
      0 0 32px rgba(168, 85, 247, 0.3);
  }
}

.section-heading__icon {
  color: rgba(168, 85, 247, 0.9);
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
}

.section-heading__text {
  font-size: 1.375rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.03em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin: 2rem 0 1rem;
  padding-left: 0.5rem;
  border-left: 2px solid rgba(168, 85, 247, 0.3);
}

.subsection-title:first-of-type {
  margin-top: 0;
}

.subsection-title--stagger {
  animation: title-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.1s;
}

@keyframes title-fade-in {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ==========================================
   職業選擇器 - 儀表板互動設計
   ========================================== */
.class-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.class-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 90px;
  position: relative;
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.02),
    0 2px 8px rgba(0, 0, 0, 0.3);
  filter: grayscale(0.7) opacity(0.6);
}

.class-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--tab-color);
  box-shadow: 0 0 12px var(--tab-color);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.class-tab:hover {
  transform: translateY(-3px);
  filter: grayscale(0) opacity(0.9);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.4),
    0 0 20px color-mix(in srgb, var(--tab-color) 20%, transparent);
}

.class-tab--active {
  filter: grayscale(0) opacity(1);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 
    inset 0 0 30px color-mix(in srgb, var(--tab-color) 8%, transparent),
    0 4px 20px rgba(0, 0, 0, 0.5),
    0 0 30px color-mix(in srgb, var(--tab-color) 25%, transparent);
}

.class-tab--active::after {
  width: 80%;
}

.class-tab__icon {
  font-size: 1.5rem;
  margin-bottom: 0.375rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
}

.class-tab--active .class-tab__icon {
  filter: drop-shadow(0 0 8px var(--tab-color));
}

.class-tab__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

.class-tab__name-en {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.class-tab--active .class-tab__name-en {
  color: rgba(255, 255, 255, 0.7);
}

.equipment-grid {
  display: grid;
  gap: 1rem;
}

/* 錯落上浮動畫 (Staggered Fade Up) */
.equipment-card--stagger-in {
  animation: stagger-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--stagger-index, 0) * 60ms);
}

@keyframes stagger-fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.equipment-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 0.75rem;
  text-decoration: none;
  position: relative;
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.02),
    0 4px 16px rgba(0, 0, 0, 0.3);
}


.equipment-card--clickable {
  cursor: pointer;
}

.equipment-card--highlight {
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  animation: glow-pulse-highlight 3s ease-in-out infinite;
}

.equipment-card--highlight::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  padding: 0.5px;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.5),
    rgba(255, 215, 0, 0.15)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

@keyframes glow-pulse-highlight {
  0%, 100% {
    box-shadow: 
      inset 0 0 40px rgba(255, 215, 0, 0.1),
      0 4px 20px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(255, 215, 0, 0.35),
      0 0 50px rgba(255, 215, 0, 0.2);
  }
  50% {
    box-shadow: 
      inset 0 0 50px rgba(255, 215, 0, 0.15),
      0 6px 24px rgba(0, 0, 0, 0.5),
      0 0 45px rgba(255, 215, 0, 0.5),
      0 0 70px rgba(255, 215, 0, 0.3);
  }
}

.equipment-card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
}

.equipment-card--highlight .equipment-card__icon {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))
         drop-shadow(0 0 12px rgba(255, 215, 0, 0.4));
}

.equipment-card__content {
  flex: 1;
  min-width: 0;
}

.equipment-card__name {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.equipment-card__name small {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
}

.equipment-card__star {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.2) 100%);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: rgba(255, 215, 0, 1);
  box-shadow: 
    0 0 12px rgba(255, 215, 0, 0.3),
    inset 0 0 8px rgba(255, 215, 0, 0.2);
  animation: star-pulse 2s ease-in-out infinite;
}

@keyframes star-pulse {
  0%, 100% {
    box-shadow: 
      0 0 12px rgba(255, 215, 0, 0.3),
      inset 0 0 8px rgba(255, 215, 0, 0.2);
  }
  50% {
    box-shadow: 
      0 0 18px rgba(255, 215, 0, 0.5),
      inset 0 0 12px rgba(255, 215, 0, 0.3);
  }
}

.equipment-card__ammo {
  display: block;
  font-size: 0.75rem;
  color: rgba(168, 85, 247, 0.8);
  margin-top: 0.25rem;
}

.equipment-card__desc {
  font-size: 0.875rem;
  color: rgba(148, 163, 184, 0.9);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}

.equipment-card__link-indicator {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.equipment-card__view-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: rgba(168, 85, 247, 0.9);
  font-weight: 500;
  background: rgba(168, 85, 247, 0.08);
  border-radius: 0.375rem;
  box-shadow: inset 0 0 12px rgba(168, 85, 247, 0.1);
}

.equipment-card__coming-soon {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.35);
  padding: 0.375rem 0.625rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.375rem;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
}

.equipment-card--compact {
  padding: 1rem;
}

.equipment-grid--accessories {
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

/* Armor Card - 聚光燈展示 */
.armor-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 0.75rem;
  position: relative;
  box-shadow: 
    inset 0 0 40px rgba(59, 130, 246, 0.06),
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(59, 130, 246, 0.12);
}

.armor-card--stagger-in {
  animation: stagger-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.15s;
}

.armor-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.4),
    rgba(59, 130, 246, 0.1)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.armor-card__icon {
  width: 56px;
  height: 56px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))
         drop-shadow(0 8px 24px rgba(0, 0, 0, 0.5));
}

.armor-card__content {
  flex: 1;
}

.armor-card__name {
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.armor-card__name small {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
}

.armor-card__desc {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}

/* Buffs List - 玻璃通透感 & 藥水發光 */
.buffs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.buff-tag {
  padding: 0.625rem 1.125rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.625rem;
  font-size: 0.875rem;
  color: rgba(203, 213, 225, 0.95);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  will-change: transform;
}

.buff-tag::before {
  content: '';
  position: absolute;
  inset: -100%;
  background: conic-gradient(
    from 0deg at 50% 50%,
    transparent,
    rgba(168, 85, 247, 0.4),
    transparent 120deg
  );
  opacity: 0;
  transition: all 0.6s ease;
  animation: rotate 4s linear infinite paused;
}

.buff-tag::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  background: radial-gradient(
    circle at center,
    rgba(168, 85, 247, 0.15),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.buff-tag:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(168, 85, 247, 0.4);
  color: rgba(255, 255, 255, 1);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 0 30px rgba(168, 85, 247, 0.12),
    0 8px 20px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(168, 85, 247, 0.4),
    0 0 50px rgba(168, 85, 247, 0.2);
}

.buff-tag:hover::before {
  opacity: 1;
  animation-play-state: running;
}

.buff-tag:hover::after {
  opacity: 1;
}

.buff-tag--stagger-in {
  animation: stagger-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--stagger-index, 0) * 50ms + 0.2s);
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 768px) {
  .section-card {
    padding: 1.5rem;
  }

  .class-tabs {
    justify-content: center;
  }

  .class-tab {
    min-width: 75px;
    padding: 0.875rem 1rem;
  }

  .equipment-card {
    padding: 1rem;
  }

  .equipment-card__icon {
    width: 40px;
    height: 40px;
  }

  .equipment-grid--accessories {
    grid-template-columns: 1fr;
  }

  .armor-card {
    padding: 1.25rem;
  }

  .armor-card__icon {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 640px) {
  .section-card {
    padding: 1.25rem;
    border-radius: 0.75rem;
  }

  .section-heading__text {
    font-size: 1.125rem;
  }

  .class-tab__icon {
    font-size: 1.25rem;
  }

  .class-tab__name {
    font-size: 0.8125rem;
  }

  .equipment-card__name {
    font-size: 0.9375rem;
  }
}
</style>

