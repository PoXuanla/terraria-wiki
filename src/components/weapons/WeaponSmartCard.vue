<script setup lang="ts">
import { computed } from "vue";
import {
  Swords,
  Target,
  Clock,
  Wind,
  Repeat,
  Crosshair,
  Heart,
  ArrowRight,
  Ghost,
  Zap,
} from "lucide-vue-next";
import { WeaponClass, type WeaponData } from "@/data/weapons/types";

/**
 * WeaponSmartCard - 武器數據整合卡片
 *
 * 根據職業動態顯示不同內容：
 * - 魔法/遠程：彈道物理
 * - 召喚：召喚物特性 + 欄位消耗
 * - 近戰：攻擊特性
 */

interface Props {
  weapon: WeaponData;
}

const props = defineProps<Props>();

// 判斷武器類型
const isMage = computed(() => props.weapon.class === WeaponClass.Mage);
const isRanger = computed(() => props.weapon.class === WeaponClass.Ranger);
const isSummoner = computed(() => props.weapon.class === WeaponClass.Summoner);
const isMelee = computed(() => props.weapon.class === WeaponClass.Melee);

// 是否有投射物（魔法/遠程）
const hasProjectile = computed(() => isMage.value || isRanger.value);

// Header 右側資源顯示
const resourceDisplay = computed(() => {
  const m = props.weapon.mechanics;
  if (!m) return null;

  // 召喚武器優先顯示欄位
  if (isSummoner.value && m.summon?.slots) {
    return { type: "slots", value: m.summon.slots, label: "欄位" };
  }
  // 魔力消耗
  if (m.resource?.manaCost) {
    return { type: "mana", value: m.resource.manaCost, label: "Mana" };
  }
  // 彈藥
  if (m.resource?.ammo) {
    return {
      type: "ammo",
      value: m.resource.ammo.type,
      infinite: m.resource.ammo.saveChance === 100,
    };
  }
  // 近戰無消耗
  if (isMelee.value) {
    return { type: "none", label: "無消耗" };
  }
  return null;
});

// AI 類型中文對照
const aiTypeLabel = computed(() => {
  const ai = props.weapon.mechanics?.summon?.aiType;
  const labels: Record<string, string> = {
    melee: "近戰型",
    ranged: "遠程型",
    flying: "飛行型",
    stationary: "固定型",
    whip: "鞭子",
  };
  return labels[ai || ""] || ai;
});

// 追蹤能力中文對照
const trackingLabel = computed(() => {
  const t = props.weapon.mechanics?.summon?.tracking;
  if (t === true) return "追蹤";
  if (t === "weak") return "弱追蹤";
  if (t === "strong") return "強追蹤";
  if (t === "perfect") return "完美追蹤";
  return null;
});
</script>

<template>
  <section class="smart-card">
    <!-- Header: 身份與代價 -->
    <header class="smart-card__header">
      <div class="smart-card__identity">
        <img :src="weapon.icon" :alt="weapon.name" class="smart-card__icon" />
        <div class="smart-card__name-group">
          <span
            class="smart-card__name"
            :style="{ color: weapon.rarity.color }"
          >
            {{ weapon.name }}
          </span>
          <span class="smart-card__name-en">{{ weapon.nameEn }}</span>
        </div>
      </div>
      <div v-if="resourceDisplay" class="smart-card__cost">
        <span
          v-if="resourceDisplay.type === 'mana'"
          class="cost-pill cost-pill--mana"
        >
          💧 {{ resourceDisplay.value }} {{ resourceDisplay.label }}
        </span>
        <span
          v-else-if="resourceDisplay.type === 'slots'"
          class="cost-pill cost-pill--slots"
        >
          👻 {{ resourceDisplay.value }} {{ resourceDisplay.label }}
        </span>
        <span
          v-else-if="resourceDisplay.type === 'ammo'"
          class="cost-pill cost-pill--ammo"
        >
          🎯 {{ resourceDisplay.value }}
          <template v-if="resourceDisplay.infinite"> ∞</template>
        </span>
        <span
          v-else-if="resourceDisplay.type === 'none'"
          class="cost-pill cost-pill--none"
        >
          ⚡ {{ resourceDisplay.label }}
        </span>
      </div>
    </header>

    <!-- Body: 2x2 Smart Grid -->
    <div class="smart-grid">
      <!-- ===== 左上：輸出能力（通用） ===== -->
      <div class="smart-module smart-module--damage">
        <div class="smart-module__header">
          <Swords :size="16" class="smart-module__icon" />
          <span class="smart-module__title">輸出能力</span>
        </div>
        <div class="smart-module__main">
          <span class="smart-module__value">{{
            weapon.stats.damage.value
          }}</span>
          <span class="smart-module__label">{{ weapon.classLabel }}傷害</span>
        </div>
        <div class="smart-module__sub">
          <span class="smart-module__stat">
            <Target :size="12" />
            暴擊 {{ weapon.stats.critChance.value }}%
          </span>
        </div>
        <!-- 減益效果 -->
        <div
          v-if="weapon.mechanics?.combat?.debuffs?.length"
          class="smart-module__tags"
        >
          <span
            v-for="debuff in weapon.mechanics.combat.debuffs"
            :key="debuff.nameEn"
            class="smart-tag smart-tag--debuff"
          >
            <img
              v-if="debuff.icon"
              :src="debuff.icon"
              :alt="debuff.name"
              class="smart-tag__icon"
            />
            {{ debuff.name }}
            <small v-if="debuff.duration">({{ debuff.duration }}s)</small>
          </span>
        </div>
      </div>

      <!-- ===== 右上：操作手感（通用） ===== -->
      <div class="smart-module smart-module--handling">
        <div class="smart-module__header">
          <Clock :size="16" class="smart-module__icon" />
          <span class="smart-module__title">操作手感</span>
        </div>
        <div class="smart-module__main">
          <span class="smart-module__value">{{
            weapon.stats.useTime.value
          }}</span>
          <span class="smart-module__label">{{
            weapon.stats.useTime.description || "使用時間"
          }}</span>
        </div>
        <div class="smart-module__tags">
          <span
            v-if="weapon.mechanics?.input?.autoReuse"
            class="smart-tag smart-tag--positive"
          >
            <Repeat :size="12" />
            自動連發
          </span>
          <span v-else class="smart-tag smart-tag--neutral">單次攻擊</span>
          <span
            v-if="weapon.mechanics?.input?.useTurn"
            class="smart-tag smart-tag--neutral"
          >
            可轉向
          </span>
          <span
            v-if="weapon.mechanics?.input?.channeling"
            class="smart-tag smart-tag--info"
          >
            持續引導
          </span>
        </div>
      </div>

      <!-- ===== 左下：根據職業動態顯示 ===== -->

      <!-- 魔法/遠程：彈道物理 -->
      <div v-if="hasProjectile" class="smart-module smart-module--projectile">
        <div class="smart-module__header">
          <ArrowRight :size="16" class="smart-module__icon" />
          <span class="smart-module__title">彈道物理</span>
        </div>
        <div class="smart-module__main">
          <span class="smart-module__value">{{
            weapon.mechanics?.projectile?.velocity || "-"
          }}</span>
          <span class="smart-module__label">飛行速度</span>
        </div>
        <div class="smart-module__tags">
          <span
            v-if="weapon.mechanics?.projectile?.piercing === -1"
            class="smart-tag smart-tag--positive"
          >
            <Crosshair :size="12" />
            無限穿透
          </span>
          <span
            v-else-if="
              weapon.mechanics?.projectile?.piercing &&
              weapon.mechanics.projectile.piercing > 0
            "
            class="smart-tag smart-tag--info"
          >
            穿透 {{ weapon.mechanics.projectile.piercing }}
          </span>
          <span
            v-if="weapon.mechanics?.projectile?.homing"
            class="smart-tag smart-tag--positive"
          >
            <Target :size="12" />
            追蹤
          </span>
          <span
            v-if="weapon.mechanics?.projectile?.tileIgnore"
            class="smart-tag smart-tag--positive"
          >
            穿牆
          </span>
          <span
            v-if="weapon.mechanics?.projectile?.bounces"
            class="smart-tag smart-tag--info"
          >
            反彈 {{ weapon.mechanics.projectile.bounces }}
          </span>
        </div>
      </div>

      <!-- 召喚：召喚物特性 -->
      <div v-else-if="isSummoner" class="smart-module smart-module--summon">
        <div class="smart-module__header">
          <Ghost :size="16" class="smart-module__icon" />
          <span class="smart-module__title">召喚物特性</span>
        </div>
        <div class="smart-module__main">
          <span class="smart-module__value">{{ aiTypeLabel || "-" }}</span>
          <span class="smart-module__label">AI 類型</span>
        </div>
        <div class="smart-module__tags">
          <span v-if="trackingLabel" class="smart-tag smart-tag--positive">
            <Target :size="12" />
            {{ trackingLabel }}
          </span>
          <span
            v-if="weapon.mechanics?.summon?.attackSpeed"
            class="smart-tag smart-tag--info"
          >
            {{ weapon.mechanics.summon.attackSpeed }}
          </span>
          <span
            v-if="weapon.mechanics?.summon?.requiresWhip"
            class="smart-tag smart-tag--neutral"
          >
            需鞭子標記
          </span>
        </div>
      </div>

      <!-- 近戰：攻擊特性 -->
      <div v-else-if="isMelee" class="smart-module smart-module--melee">
        <div class="smart-module__header">
          <Zap :size="16" class="smart-module__icon" />
          <span class="smart-module__title">攻擊特性</span>
        </div>
        <div class="smart-module__main">
          <span class="smart-module__value">{{
            weapon.mechanics?.melee?.range || "-"
          }}</span>
          <span class="smart-module__label">攻擊範圍</span>
        </div>
        <div class="smart-module__tags">
          <span
            v-if="weapon.mechanics?.combat?.trueMelee"
            class="smart-tag smart-tag--melee"
          >
            <Swords :size="12" />
            真近戰
          </span>
          <span
            v-if="weapon.mechanics?.melee?.projectile"
            class="smart-tag smart-tag--info"
          >
            發射劍氣
          </span>
          <span
            v-if="weapon.mechanics?.melee?.armorPenetration"
            class="smart-tag smart-tag--positive"
          >
            無視
            {{ Math.round(weapon.mechanics.melee.armorPenetration * 100) }}%
            防禦
          </span>
        </div>
      </div>

      <!-- ===== 右下：控制能力（通用）===== -->
      <div
        class="smart-module smart-module--control"
        :class="{ 'smart-module--dimmed': weapon.stats.knockback.value === 0 }"
      >
        <div class="smart-module__header">
          <Wind :size="16" class="smart-module__icon" />
          <span class="smart-module__title">控制能力</span>
        </div>
        <div class="smart-module__main">
          <span class="smart-module__value">{{
            weapon.stats.knockback.value
          }}</span>
          <span class="smart-module__label">{{
            weapon.stats.knockback.description || "擊退"
          }}</span>
        </div>
        <div
          v-if="weapon.mechanics?.combat?.lifeSteal"
          class="smart-module__tags"
        >
          <span class="smart-tag smart-tag--lifesteal">
            <Heart :size="12" />
            吸血 {{ weapon.mechanics.combat.lifeSteal * 100 }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Footer: 特殊效果 -->
    <footer
      v-if="
        weapon.mechanics?.combat?.specialEffects?.length ||
        weapon.mechanics?.summon?.specialAbility
      "
      class="smart-card__footer"
    >
      <span
        v-for="effect in weapon.mechanics?.combat?.specialEffects || []"
        :key="effect"
        class="smart-card__special"
      >
        ✦ {{ effect }}
      </span>
      <span
        v-if="weapon.mechanics?.summon?.specialAbility"
        class="smart-card__special"
      >
        ✦ {{ weapon.mechanics.summon.specialAbility }}
      </span>
    </footer>
  </section>
</template>

<style scoped>
/* ==========================================
   Smart Card - 整合數據卡片
   ========================================== */
.smart-card {
  background: var(--color-bg-card);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.12);
}

:global(.dark) .smart-card {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

/* Header */
.smart-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    135deg,
    var(--color-bg-main) 0%,
    var(--color-bg-card) 100%
  );
  border-bottom: 1px solid var(--color-border);
}

.smart-card__identity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.smart-card__icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.smart-card__name-group {
  display: flex;
  flex-direction: column;
}

.smart-card__name {
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.2;
}

.smart-card__name-en {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.smart-card__cost {
  display: flex;
  gap: 0.5rem;
}

.cost-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.cost-pill--mana {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
}

:global(.dark) .cost-pill--mana {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.cost-pill--slots {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  color: #4338ca;
}

:global(.dark) .cost-pill--slots {
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
}

.cost-pill--ammo {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
}

:global(.dark) .cost-pill--ammo {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.cost-pill--none {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
}

:global(.dark) .cost-pill--none {
  background: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

/* Smart Grid */
.smart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--color-border);
}

.smart-module {
  background: var(--color-bg-card);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.smart-module--dimmed {
  opacity: 0.5;
}

.smart-module__header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--color-text-muted);
}

.smart-module__icon {
  opacity: 0.7;
}

.smart-module__title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.smart-module__main {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.smart-module__value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1;
}

.smart-module__label {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.smart-module__sub {
  display: flex;
  gap: 0.75rem;
}

.smart-module__stat {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.smart-module__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.25rem;
}

/* Smart Tags */
.smart-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 600;
}

.smart-tag__icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  image-rendering: pixelated;
}

.smart-tag--positive {
  background: #d1fae5;
  color: #065f46;
}

:global(.dark) .smart-tag--positive {
  background: rgba(16, 185, 129, 0.15);
  color: #6ee7b7;
}

.smart-tag--neutral {
  background: var(--color-bg-main);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.smart-tag--info {
  background: #dbeafe;
  color: #1e40af;
}

:global(.dark) .smart-tag--info {
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
}

.smart-tag--debuff {
  background: #fee2e2;
  color: #991b1b;
}

:global(.dark) .smart-tag--debuff {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.smart-tag--lifesteal {
  background: #fce7f3;
  color: #be123c;
}

:global(.dark) .smart-tag--lifesteal {
  background: rgba(244, 63, 94, 0.15);
  color: #fb7185;
}

.smart-tag--melee {
  background: #ffedd5;
  color: #9a3412;
}

:global(.dark) .smart-tag--melee {
  background: rgba(249, 115, 22, 0.15);
  color: #fdba74;
}

.smart-tag small {
  opacity: 0.7;
  font-weight: 500;
}

/* Footer */
.smart-card__footer {
  padding: 0.75rem 1.25rem;
  background: var(--color-bg-main);
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.smart-card__special {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 640px) {
  .smart-card__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .smart-card__cost {
    width: 100%;
    justify-content: flex-start;
  }

  .smart-grid {
    grid-template-columns: 1fr;
  }

  .smart-module__value {
    font-size: 1.5rem;
  }
}
</style>
