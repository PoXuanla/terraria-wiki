<script setup lang="ts">
import { ref, computed } from "vue";
import { Search, X } from "lucide-vue-next";
import { useWeaponStore } from "@/stores/weapon";
import { WeaponClass } from "@/data/weapons/types";
import { SourceType } from "@/data/weapons/source";
import type { ClassOption, RarityOption, SourceOption } from "./types";
import { CLASS_CONFIG, SOURCE_CONFIG } from "./types";

/**
 * 武器篩選器組件
 * 負責處理所有篩選條件的 UI 交互
 */

// ==========================================
// Store
// ==========================================

const weaponStore = useWeaponStore();

// ==========================================
// 選項配置
// ==========================================

// 職業選項（基於 enum 動態生成）
const classOptions = computed<ClassOption[]>(() => {
  return [
    { key: "", ...CLASS_CONFIG[""] },
    ...Object.values(WeaponClass).map((classKey) => ({
      key: classKey,
      ...CLASS_CONFIG[classKey],
    })),
  ];
});

// 稀有度選項（動態生成）
const rarityOptions = ref<RarityOption[]>([
  { key: "", label: "全部" },
  ...weaponStore.rarityLevels.map((level: number) => ({
    key: level,
    label: `${level}`,
  })),
]);

// 取得方式選項（基於 enum 和實際資料動態生成）
const sourceOptions = computed<SourceOption[]>(() => {
  // 從所有武器中提取實際使用的取得方式類型
  const usedTypes = [
    ...new Set(
      weaponStore.weapons.flatMap((w: any) =>
        w.sources.map((s: any) => s.type as string)
      )
    ),
  ].sort() as string[];

  return [
    { key: "", ...SOURCE_CONFIG[""] },
    ...usedTypes.map((sourceType: string) => ({
      key: sourceType,
      ...SOURCE_CONFIG[sourceType],
    })),
  ];
});

// ==========================================
// 搜尋框本地狀態（用於即時輸入回饋）
// ==========================================

const localSearchQuery = ref(weaponStore.searchQuery);

// 監聽輸入並使用 debounce 更新 store
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  localSearchQuery.value = target.value;
  weaponStore.setSearchQuery(target.value);
};

// 清除搜尋
const clearSearch = () => {
  localSearchQuery.value = "";
  weaponStore.setSearchQueryImmediate("");
};
</script>

<template>
  <section class="filter-section">
    <!-- 搜尋框 -->
    <div class="search-box">
      <Search :size="18" class="search-box__icon" />
      <input
        :value="localSearchQuery"
        @input="handleSearchInput"
        type="text"
        placeholder="搜尋武器名稱..."
        class="search-box__input"
      />
      <button
        v-if="localSearchQuery"
        @click="clearSearch"
        class="search-box__clear"
      >
        <X :size="16" />
      </button>
    </div>

    <!-- 篩選器群組 -->
    <div class="filter-groups">
      <!-- 職業篩選 -->
      <div class="filter-group">
        <span class="filter-group__label">職業</span>
        <div class="filter-pills">
          <button
            v-for="option in classOptions"
            :key="option.key"
            @click="weaponStore.setClass(option.key)"
            class="filter-pill"
            :class="{
              'filter-pill--active': weaponStore.selectedClass === option.key,
            }"
            :style="
              option.key && weaponStore.selectedClass === option.key
                ? {
                    '--pill-color': weaponStore.getClassColor(option.key),
                    backgroundColor: weaponStore.getClassColor(option.key),
                    borderColor: weaponStore.getClassColor(option.key),
                  }
                : {}
            "
          >
            <span class="filter-pill__icon">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>

      <!-- 稀有度篩選 -->
      <div class="filter-group">
        <span class="filter-group__label">稀有度</span>
        <div class="filter-pills">
          <button
            v-for="option in rarityOptions"
            :key="option.key"
            @click="weaponStore.setRarity(option.key)"
            class="filter-pill filter-pill--rarity"
            :class="{
              'filter-pill--active': weaponStore.selectedRarity === option.key,
            }"
            :style="
              option.key && weaponStore.selectedRarity === option.key
                ? {
                    backgroundColor: weaponStore.getRarityColor(option.key),
                    borderColor: weaponStore.getRarityColor(option.key),
                    boxShadow: `0 4px 12px -2px ${weaponStore.getRarityColor(
                      option.key
                    )}`,
                  }
                : option.key
                ? {
                    '--pill-border': weaponStore.getRarityColor(option.key),
                  }
                : {}
            "
          >
            <!-- 改用顏色方塊替代星星 -->
            <span
              v-if="option.key"
              class="rarity-color-block"
              :style="{
                backgroundColor: weaponStore.getRarityColor(option.key),
                boxShadow:
                  weaponStore.selectedRarity === option.key
                    ? `0 0 8px ${weaponStore.getRarityColor(option.key)}`
                    : 'none',
              }"
            />
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>

      <!-- 取得方式篩選 -->
      <div class="filter-group">
        <span class="filter-group__label">取得方式</span>
        <div class="filter-pills">
          <button
            v-for="option in sourceOptions"
            :key="option.key"
            @click="weaponStore.setSource(option.key)"
            class="filter-pill"
            :class="{
              'filter-pill--active': weaponStore.selectedSource === option.key,
            }"
          >
            <span class="filter-pill__icon">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 結果統計與清除按鈕 -->
    <div class="filter-footer">
      <span class="result-count">
        顯示 <strong>{{ weaponStore.weaponCount }}</strong> 件武器
      </span>
      <button
        v-if="weaponStore.hasFilters"
        @click="
          weaponStore.clearFilters();
          localSearchQuery = '';
        "
        class="clear-btn"
      >
        <X :size="14" />
        <span>清除篩選</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   篩選區塊
   ========================================== */
.filter-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:global(.dark) .filter-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

/* 搜尋框 */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box__icon {
  position: absolute;
  left: 1rem;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-box__input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg-main);
  color: var(--color-text-primary);
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.search-box__input::placeholder {
  color: var(--color-text-muted);
}

.search-box__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-box__clear {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: var(--color-bg-card);
  border-radius: 50%;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-box__clear:hover {
  background: var(--color-border);
  color: var(--color-text-primary);
}

/* 篩選器群組 */
.filter-groups {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-group__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 60px;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* 膠囊按鈕 */
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background: var(--color-bg-main);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  border-color: var(--color-primary-light);
  color: var(--color-text-primary);
}

.filter-pill--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.filter-pill--rarity {
  border-width: 2px;
  border-color: var(--pill-border, var(--color-border));
  transition: all 0.2s ease;
}

.filter-pill--rarity.filter-pill--active {
  color: white;
  font-weight: 600;
}

.rarity-color-block {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.filter-pill__icon {
  font-size: 0.875rem;
}

/* 篩選底部 */
.filter-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.result-count {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.result-count strong {
  color: var(--color-primary);
  font-weight: 600;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 0.375rem;
  background: #fee2e2;
  color: #dc2626;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(.dark) .clear-btn {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.clear-btn:hover {
  background: #fecaca;
}

:global(.dark) .clear-btn:hover {
  background: rgba(239, 68, 68, 0.25);
}
</style>
